import { crx } from '@crxjs/vite-plugin'
// import rollupInject from '@rollup/plugin-inject'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifest from './manifest'
import { version } from './package.json'

const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
	server: {
		port: 8003,
	},
	resolve: {
		alias: {
			// os: 'os-browserify',
			// path: 'path-browserify',
			// http: 'stream-http',
			// https: 'https-browserify',
			// process: 'process/browser',
			// crypto: 'crypto-browserify',
			// 'readable-stream': 'vite-compatible-readable-stream',
			stream: 'vite-compatible-readable-stream',
		},
	},
	define: {
		APP_VERSION: JSON.stringify(version),
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
				popup_dark: 'popup-theme-dark.html',
				popup_light: 'popup-theme-light.html',
				popup_system: 'popup-theme-system.html',
			},
			plugins: [
				// rollupInject({
				// 	global: ['src/helpers/shim.ts', 'global'],
				// 	process: ['src/helpers/shim.ts', 'process'],
				// 	Buffer: ['src/helpers/shim.ts', 'Buffer'],
				// }),
			],
		},
		commonjsOptions: {
			transformMixedEsModules: true,
		},
	},
})
