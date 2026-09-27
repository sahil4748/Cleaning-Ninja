const readiness = require('./content/release-readiness.json')
if (process.env.VERCEL_ENV === 'production' && (readiness.status !== 'APPROVED' || readiness.blockers.length)) {
  throw new Error('Production release blocked: ' + readiness.blockers.join('; '))
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] }]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'media.giphy.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
}

module.exports = nextConfig
