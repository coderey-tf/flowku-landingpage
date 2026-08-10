/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // Disabled: switching to server mode for API routes
  // trailingSlash: true,  // Not needed in server mode
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
