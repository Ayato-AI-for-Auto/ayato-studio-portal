import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  /* Static export mode for maximum DoS protection */
};

export default nextConfig;
