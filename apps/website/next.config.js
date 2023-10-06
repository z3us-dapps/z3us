const withTM = require('next-transpile-modules')(['ui'])

const nextConfig = withTM({
	reactStrictMode: true,
	images: {
		unoptimized: true,
	},
	trailingSlash: true,
	async headers() {
		return [
			{
				source: '/fonts/:font*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, immutable, max-age=31536000',
					},
				],
			},
		]
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
