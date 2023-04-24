import { crx } from '@crxjs/vite-plugin'
import rollupInject from '@rollup/plugin-inject'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifest from './manifest'

// eslint-disable-next-line
console.info(`building for env: ${process.env.NODE_ENV}`)

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
	server: {
		port: 8003,
	},
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, './src'),
			os: 'os-browserify',
			path: 'path-browserify',
			http: 'stream-http',
			https: 'https-browserify',
			process: 'process/browser',
			crypto: 'crypto-browserify',
			'readable-stream': 'vite-compatible-readable-stream',
			stream: 'vite-compatible-readable-stream',
		},
	},
	plugins: [
		react({
			include: '**/*.tsx',
		}),
		crx({ manifest }),
		tsconfigPaths(),
		visualizer(),
		vanillaExtractPlugin(),
	],
	build: {
		minify: isProd,
		outDir: path.resolve(__dirname, 'dist'),
		sourcemap: true,
		rollupOptions: {
			treeshake: true,
			input: {
				dark: path.resolve(__dirname, './popup-theme-dark.html'),
				light: path.resolve(__dirname, './popup-theme-light.html'),
				system: path.resolve(__dirname, './popup-theme-system.html'),
			},
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
			},
			plugins: [
				rollupInject({
					global: [path.resolve('src/helpers/shim.ts'), 'global'],
					process: [path.resolve('src/helpers/shim.ts'), 'process'],
					Buffer: [path.resolve('src/helpers/shim.ts'), 'Buffer'],
				}),
			],
		},
		commonjsOptions: {
			ignoreTryCatch: false,
			transformMixedEsModules: true,
			ignore: ['sodium-native'],
		},
	},
})
