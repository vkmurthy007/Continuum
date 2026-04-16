/** Returns true if running inside a social in-app browser (LinkedIn, Instagram, Facebook, Twitter/X) */
export function isInAppBrowser(): boolean {
  const ua = navigator.userAgent || '';
  return (
    /LinkedInApp/i.test(ua) ||
    /Instagram/i.test(ua) ||
    /FBAN|FBAV/i.test(ua) ||        // Facebook
    /Twitter/i.test(ua) ||
    /Snapchat/i.test(ua) ||
    /\bGSA\b/i.test(ua)             // Google Search App (iOS)
  );
}

/** Returns 'ios' | 'android' | 'other' */
export function getMobilePlatform(): 'ios' | 'android' | 'other' {
  const ua = navigator.userAgent || '';
  if (/iPad|iPhone|iPod/.test(ua)) return 'ios';
  if (/Android/.test(ua)) return 'android';
  return 'other';
}

/** Safe sessionStorage wrapper — in-app browsers often block storage APIs */
export const safeSession = {
  get(key: string): string | null {
    try { return sessionStorage.getItem(key); } catch { return null; }
  },
  set(key: string, value: string): void {
    try { sessionStorage.setItem(key, value); } catch { /* silent */ }
  },
};
