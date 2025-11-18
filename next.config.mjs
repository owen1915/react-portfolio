/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true },

  // REQUIRED for GitHub Pages subfolder deployments
  basePath: "/react-portfolio",
  assetPrefix: "/react-portfolio/",

  trailingSlash: true, // prevents routing issues
};

export default nextConfig;