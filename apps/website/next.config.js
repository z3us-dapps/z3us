const { withContentlayer } = require('next-contentlayer')
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')

const withVanillaExtract = createVanillaExtractPlugin()

/**
 * @type {import('next').NextConfig}
 **/
const config = {
	experimental: {
		appDir: false,
	},
	reactStrictMode: true,
	swcMinify: true,
	transpilePackages: ['ui'],
	output: 'export',
	images: {
		unoptimized: true,
	},
}

const nextConfig = withVanillaExtract(config)

module.exports = withContentlayer(nextConfig)
