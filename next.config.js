/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  }
]

module.exports = {
  async headers(){
    return [
      {
        source:'/:path*',
        headers: securityHeaders
      }
    ]
  }
}

module.exports = nextConfig
