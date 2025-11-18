// next.config.mjs

const nextConfig = {
  output: "export",
  distDir: "out",

  // Required for export mode in Next.js 16 App Router
  images: {
    unoptimized: true
  }
};

export default nextConfig;
