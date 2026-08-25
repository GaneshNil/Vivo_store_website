import { NextRequest } from 'next/server';
import crypto from 'crypto';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'Admin@9067228008';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin#9067228008';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'galaxy-mobile-gallery-secure-session-key-2026';
const COOKIE_NAME = 'galaxy_admin_session';

/**
 * Generate HMAC-SHA256 signed session token for admin
 */
export function createAdminSessionToken(): string {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days
  const payload = JSON.stringify({
    role: 'admin',
    user: ADMIN_USERNAME,
    exp: expiresAt,
  });
  
  const payloadBase64 = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadBase64)
    .digest('base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verify HMAC-SHA256 signed session token
 */
export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token || typeof token !== 'string') return false;

  const parts = token.split('.');
  if (parts.length !== 2) return false;

  const [payloadBase64, signature] = parts;

  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payloadBase64)
    .digest('base64url');

  if (signature !== expectedSignature) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf-8'));
    if (payload.role !== 'admin' || !payload.exp || Date.now() > payload.exp) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Helper to verify request admin authentication from Cookie or Authorization header
 */
export function isRequestAdminAuthenticated(request: NextRequest): boolean {
  // 1. Check httpOnly cookie
  const cookie = request.cookies.get(COOKIE_NAME);
  if (cookie?.value && verifyAdminSessionToken(cookie.value)) {
    return true;
  }

  // 2. Check Authorization Bearer header (for API client compatibility)
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const bearerToken = authHeader.substring(7).trim();
    if (verifyAdminSessionToken(bearerToken)) {
      return true;
    }
  }

  return false;
}

/**
 * Validate admin credentials safely with timing-safe comparison
 */
export function validateAdminCredentials(id: string, pass: string): boolean {
  if (!id || !pass) return false;

  const userMatch = crypto.timingSafeEqual(
    Buffer.from(id.trim().padEnd(64, ' ')),
    Buffer.from(ADMIN_USERNAME.padEnd(64, ' '))
  );

  const passMatch = crypto.timingSafeEqual(
    Buffer.from(pass.padEnd(64, ' ')),
    Buffer.from(ADMIN_PASSWORD.padEnd(64, ' '))
  );

  return userMatch && passMatch;
}

export { COOKIE_NAME, ADMIN_USERNAME };
