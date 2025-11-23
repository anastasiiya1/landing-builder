// Color utility constants and functions for dynamic theming

export const STATIC_COLOR_VARIANTS = [
  "text-violet-400",
  "text-purple-400", 
  "text-fuchsia-400",
  "text-cyan-400",
];

export const STATIC_RING_VARIANTS = [
  "ring-violet-400/30",
  "ring-purple-400/30",
  "ring-fuchsia-400/30", 
  "ring-cyan-400/30",
];

export const STATIC_HOVER_VARIANTS = [
  "text-white group-hover:text-violet-400",
  "text-white group-hover:text-purple-400",
  "text-white group-hover:text-fuchsia-400",
  "text-white group-hover:text-cyan-400",
];

export const STATIC_GRADIENT_VARIANTS = [
  "from-violet-400/5 to-purple-400/5",
  "from-purple-400/5 to-fuchsia-400/5",
  "from-fuchsia-400/5 to-pink-400/5",
  "from-cyan-400/5 to-blue-400/5",
];

export const STATIC_ACCENT_VARIANTS = [
  "from-violet-500 to-purple-500",
  "from-purple-500 to-fuchsia-500", 
  "from-fuchsia-500 to-pink-500",
  "from-cyan-500 to-blue-500",
];

export function getStaticColorVariant(
  variants: string[],
  index: number
): string {
  return variants[index % variants.length];
}

export function getStaticColorClass(index: number): string {
  return getStaticColorVariant(STATIC_COLOR_VARIANTS, index);
}

export function getStaticRingClass(index: number): string {
  return getStaticColorVariant(STATIC_RING_VARIANTS, index);
}

export function getStaticHoverClass(index: number): string {
  return getStaticColorVariant(STATIC_HOVER_VARIANTS, index);
}

export function getStaticGradientClass(index: number): string {
  return getStaticColorVariant(STATIC_GRADIENT_VARIANTS, index);
}

export function getStaticAccentClass(index: number): string {
  return getStaticColorVariant(STATIC_ACCENT_VARIANTS, index);
}