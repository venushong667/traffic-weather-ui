/** @type {import('next').NextConfig} */

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = async (phase) => {
    /**
     * @type {import('next').NextConfig}
     */

    // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;
    // when `next build` or `npm run build` is used
    // const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';

    const API_URL = isDev ? "http://localhost:8080" : "http://traffic-weather:8080";
    
    const nextConfig = {
        async rewrites() {
            return [
                {
                    source: "/api/v1/:path*",
                    destination: `${API_URL}/:path*`,
                },
            ]
        },
        reactStrictMode: false,
        swcMinify: true,
        output: 'standalone',
        env: {
            API_URL: API_URL
        }
    }

    return nextConfig
}
