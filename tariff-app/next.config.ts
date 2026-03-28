import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/tariffs',
        destination: 'https://t-core.fit-hub.pro/Test/GetTariffs',
      },
    ]
  },
};

export default nextConfig;
