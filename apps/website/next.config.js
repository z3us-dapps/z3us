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
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: false,
	},
	output: 'export',
	images: {
		unoptimized: true,
		// loader: 'custom',
	},

	/**
	 * If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
	 * out.
	 *
	 * @see https://github.com/vercel/next.js/issues/41980
	 */
	// i18n: {
	// 	locales: ['en'],
	// 	defaultLocale: 'en',
	// },
	// Rewrite everything else to use `pages/index`
	// async rewrites() {
	//   return [
	//     {
	//       source: '/:path*',
	//       destination: '/',
	//     },
	//   ];
	// },
}

const nextConfig = withVanillaExtract(config)

module.exports = withContentlayer(nextConfig)
