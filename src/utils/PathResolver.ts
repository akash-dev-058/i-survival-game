/**
 * Resolve a relative asset path to the public folder.
 * Vite serves files from /public at the root.
 */
export function resolveAssetPath(relativePath: string): string {
  // Ensure no leading slash to avoid double slashes
  const sanitized = relativePath.replace(/^\//, '');
  return `${import.meta.env.BASE_URL || '/'}assets/${sanitized}`;
}
