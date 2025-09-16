/**
 * Safely get environment variable with fallback
 */
export function getEnvVar(key: string, fallback?: string): string | undefined {
  if (typeof window !== 'undefined') {
    // Client-side: environment variables are not available
    return fallback;
  }
  
  const value = process.env[key];
  return value?.trim() ? value : fallback;
}

/**
 * Get Google Search Console verification code
 */
export function getGoogleVerificationCode(): string | undefined {
  return getEnvVar('NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION');
}
