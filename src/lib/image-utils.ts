// Image utility functions for handling fallbacks and validation

export const DEFAULT_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80', // Modern office space
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80', // Professional headshot
  placeholder: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Tech background
} as const;

/**
 * Returns a valid image URL or falls back to the default
 * @param imageUrl - The image URL to validate
 * @param fallbackType - The type of fallback image to use
 */
export function getImageWithFallback(
  imageUrl: string | undefined | null,
  fallbackType: keyof typeof DEFAULT_IMAGES = 'placeholder'
): string {
  if (!imageUrl || imageUrl.trim() === '') {
    return DEFAULT_IMAGES[fallbackType];
  }

  // Basic URL validation
  try {
    new URL(imageUrl);
    return imageUrl;
  } catch {
    return DEFAULT_IMAGES[fallbackType];
  }
}

/**
 * Creates an onError handler for Next.js Image components
 * @param fallbackType - The type of fallback image to use
 */
export function createImageErrorHandler(
  fallbackType: keyof typeof DEFAULT_IMAGES = 'placeholder'
) {
  return (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const fallbackSrc = DEFAULT_IMAGES[fallbackType];
    
    if (target.src !== fallbackSrc) {
      target.src = fallbackSrc;
    }
  };
}