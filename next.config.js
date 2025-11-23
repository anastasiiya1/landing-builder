/** @type {import('next').NextConfig} */
const nextConfig = {
  // Empty Turbopack config to silence warnings
  turbopack: {},

  // Environment variables to suppress React DevTools warnings
  env: {
    REACT_EDITOR: "none",
  },

  // Experimental: optimize package imports
  experimental: {
    optimizePackageImports: ["@react-three/fiber", "@react-three/drei"],
  },
};

export default nextConfig;