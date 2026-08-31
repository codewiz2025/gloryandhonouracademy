// Simplified preview auth storage: Lovable preview broker removed.
// Return localStorage in browser; undefined during SSR.
export function brokeredPreviewStorage() {
  if (typeof window === 'undefined') return undefined;
  return localStorage;
}
