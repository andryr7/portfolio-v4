/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // compiler: {
  //   styledComponents: true,
  // },
  compiler: {
    styledComponents: { displayName: true, ssr: true }
  },
  images: {
		domains: ['cdn.sanity.io'],
    unoptimized: true,
	},
  // i18n: {
  //   locales: ['fr'],
  //   defaultLocale: 'fr',
  // },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: false,
})

module.exports = withBundleAnalyzer(nextConfig)
