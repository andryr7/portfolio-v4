/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  compiler: {
    styledComponents: { displayName: false, ssr: true }
  },
  images: {
		domains: ['cdn.sanity.io'],
	},
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
})

module.exports = withBundleAnalyzer(nextConfig)
