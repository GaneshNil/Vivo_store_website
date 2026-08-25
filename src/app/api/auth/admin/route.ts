import { NextRequest, NextResponse } from 'next/server';
import { 
  validateAdminCredentials, 
  createAdminSessionToken, 
  isRequestAdminAuthenticated,
  COOKIE_NAME,
  ADMIN_USERNAME 
} from '@/lib/auth/admin';

export const dynamic = 'force-dynamic';

// GET: Check if current session is authenticated as admin
export async function GET(request: NextRequest) {
  const authenticated = isRequestAdminAuthenticated(request);
  return NextResponse.json({
    authenticated,
    username: authenticated ? ADMIN_USERNAME : null,
  });
}

// POST: Login or Logout
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, id, password } = body || {};

    if (action === 'logout') {
      const response = NextResponse.json({
        success: true,
        message: 'Logged out successfully',
      });

      response.cookies.set({
        name: COOKIE_NAME,
        value: '',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
      });

      return response;
    }

    if (action === 'login') {
      if (!id || !password) {
        return NextResponse.json(
          { error: 'Admin ID and Password are required' },
          { status: 400 }
        );
      }

      const isValid = validateAdminCredentials(id, password);

      if (!isValid) {
        // Sleep a short random duration (200-400ms) to mitigate timing attacks & brute force
        await new Promise((r) => setTimeout(r, 300));
        return NextResponse.json(
          { error: 'Invalid Admin ID or Password. Access denied.' },
          { status: 401 }
        );
      }

      const token = createAdminSessionToken();

      const response = NextResponse.json({
        success: true,
        message: 'Admin authentication successful',
        username: ADMIN_USERNAME,
        token, // provided for clients if needed in Authorization header
      });

      response.cookies.set({
        name: COOKIE_NAME,
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Authentication error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
