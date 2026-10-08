const readiness = require('./content/release-readiness.json')
if (process.env.VERCEL_ENV === 'production' && (readiness.status !== 'APPROVED' || readiness.blockers.length)) {
  throw new Error('Production release blocked: ' + readiness.blockers.join('; '))
}

/** @type {import('next').NextConfig} */
const retiredRoutes = ['about', 'book', 'careers', 'contact', 'gallery', 'journal', 'our-standard', 'pricing', 'reviews', 'service-areas', 'services', 'team', 'legal/insurance']
const nextConfig = {
  // The previous website is retired; its URLs lead to the new homepage.
  async redirects() {
    return retiredRoutes.flatMap(route => [
      { source: `/${route}`, destination: '/', permanent: true },
      {
        // This service now has its own page; other retired service URLs still redirect.
        source: route === 'services' ? '/services/:path((?!carpet-cleaning/?$).*)' : `/${route}/:path*`,
        destination: '/',
        permanent: true,
      },
    ])
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
