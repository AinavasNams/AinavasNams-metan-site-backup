/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  output: 'standalone',
  
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  
  images: {
    domains: ['www.metan.lv', 'metan.lv', 'assets.macaly-user-data.dev'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.macaly-user-data.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
    ],
  },
  
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://metan.lv' },
          { key: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
          { key: 'Access-Control-Max-Age', value: '86400' },
        ],
      },
    ];
  },
  async redirects() {
    const segments = ['horeca', 'industrial', 'municipal', 'social', 'logistics'];
    const locales = ['lv', 'ru', 'en', 'lt'];
    const rules = [];
    for (const seg of segments) {
      for (const loc of locales) {
        rules.push({
          source: '/' + loc + '/' + seg,
          destination: '/' + loc + '/pakalpojumi/' + seg,
          permanent: true,
        });
      }
    }
    return rules;
  },
};

module.exports = nextConfig;
