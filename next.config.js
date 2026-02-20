/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Disable x-powered-by header for security
    poweredByHeader: false,

    // Security headers for all routes (complements middleware)
    headers: async () => [
        {
            source: '/(.*)',
            headers: [
                { key: 'X-DNS-Prefetch-Control', value: 'on' },
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'X-Frame-Options', value: 'DENY' },
                { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
            ],
        },
        {
            // Cache static topojson for 1 year (immutable asset)
            source: '/topojson/:path*',
            headers: [
                { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
            ],
        },
        {
            // Cache fonts for 1 year (immutable asset)
            source: '/fonts/:path*',
            headers: [
                { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
            ],
        },
    ],
}

module.exports = nextConfig
