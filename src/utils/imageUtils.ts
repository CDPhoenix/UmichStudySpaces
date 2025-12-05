/**
 * Normalize and encode image paths for web display
 * Handles paths from data files and ensures they work correctly in the browser
 */
export function normalizeImagePath(photoPath: string): string {
  if (!photoPath) return '';
  
  // Trim whitespace
  let normalized = photoPath.trim();
  
  // Remove 'public/' prefix if present (Vite serves public directory at root)
  if (normalized.startsWith('public/')) {
    normalized = normalized.substring(7);
  }
  
  // Ensure path starts with '/' for absolute path from public directory
  // This matches the old version's behavior where paths like "photos/..." work directly
  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }
  
  // Remove double slashes (except at the start)
  normalized = normalized.replace(/([^:]\/)\/+/g, '$1');
  
  // In the old version, paths were used directly without encoding
  // But modern browsers need URL encoding for spaces and special characters
  // Use encodeURI which handles spaces as %20 but preserves path structure
  return encodeURI(normalized);
}

/**
 * Check if a file extension is supported by browsers
 * Case-insensitive check
 */
export function isSupportedImageFormat(filename: string): boolean {
  const lower = filename.toLowerCase();
  return lower.endsWith('.jpg') || 
         lower.endsWith('.jpeg') || 
         lower.endsWith('.png') || 
         lower.endsWith('.gif') || 
         lower.endsWith('.webp') ||
         lower.endsWith('.svg');
}

/**
 * Filter out unsupported image formats (like HEIC)
 */
export function filterSupportedImages(photos: string[]): string[] {
  return photos.filter(photo => {
    const filename = photo.split('/').pop() || '';
    return isSupportedImageFormat(filename);
  });
}

