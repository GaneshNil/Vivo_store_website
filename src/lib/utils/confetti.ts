import type { Options } from 'canvas-confetti';

/**
 * Safely trigger canvas-confetti in client components without SSR or Babel export mismatch errors.
 */
export async function fireConfetti(options?: Options) {
  if (typeof window === 'undefined') return;
  try {
    const confettiModule = await import('canvas-confetti');
    const confettiFn = (confettiModule.default || confettiModule) as (opts?: Options) => Promise<unknown> | null;
    if (typeof confettiFn === 'function') {
      confettiFn(options);
    }
  } catch {
    // Gracefully handle any canvas-confetti issues
  }
}
