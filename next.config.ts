import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  remotePatterns: [
    {
      protocol: "https",
      hostname: "www.koda.dk",
      port: "",
      pathname: "/media/**",
    },
  ],
  async headers() {
    return [
        {
            source: '/:path*',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ];
  },
};

export default nextConfig;
