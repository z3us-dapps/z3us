const withTM = require('next-transpile-modules')(['ui'])
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = withTM({
	reactStrictMode: true,
	/**
	 * Tell Next.js where the `public` folder is.
	 */
	assetPrefix: isProd ? '/z3us/' : '',
	exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
		return {
			'/': { page: '/' },
		}
	},
	images: {
		loader: 'akamai',
		path: '',
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		config.resolve = {
			...config.resolve,
			fallback: {
				...config.resolve.fallback,
				fs: false,
				stream: require.resolve('stream-browserify'),
				buffer: require.resolve('buffer'),
				crypto: require.resolve('crypto-browserify'),
				assert: require.resolve('assert'),
				http: require.resolve('stream-http'),
				https: require.resolve('https-browserify'),
				os: require.resolve('os-browserify'),
				path: require.resolve('path-browserify'),
			},
		}

		config.plugins = [
			...config.plugins,
			new webpack.ProvidePlugin({
				Buffer: ['buffer', 'Buffer'],
				process: 'process/browser',
			}),
		]

		return config
	},
})

module.exports = nextConfig
