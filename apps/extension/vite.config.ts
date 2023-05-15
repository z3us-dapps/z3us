import { crx } from '@crxjs/vite-plugin'
import rollupInject from '@rollup/plugin-inject'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifest from './manifest'
import { version } from './package.json'

const isProd = process.env.NODE_ENV === 'production'
const isDev = process.env.NODE_ENV === 'development'

const config = {
	server: {
		port: 8003,
	},
	resolve: {
		alias: {
			// process: 'process/browser',
			// os: 'os-browserify',
			// path: 'path-browserify',
			// http: 'stream-http',
			// https: 'https-browserify',
			// crypto: 'crypto-browserify',
			// 'readable-stream': 'vite-compatible-readable-stream',
			stream: 'vite-compatible-readable-stream',
			config: 'src/config.ts',
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
		tsconfigPaths({
			// ignoreConfigErrors: true,
			projects: [
				path.resolve(__dirname, 'tsconfig.json'),
				'../../node_modules/@radixdlt/connector-extension/tsconfig.json',
			],
		}), 
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
				index: 'index.html',
				popup_dark: 'popup-theme-dark.html',
				popup_light: 'popup-theme-light.html',
				popup_system: 'popup-theme-system.html',
				offscreen: 'src/browser/offscreen/index.html',
				// pairing: 'src/browser/pairing/index.html',
				// ledger: 'src/browser/ledger/index.html',
			},
			plugins: [
				rollupInject({
					global: ['src/helpers/shim.ts', 'global'],
					// process: ['src/helpers/shim.ts', 'process'],
					// Buffer: ['src/helpers/shim.ts', 'Buffer'],
				}),
			],
		},
		// commonjsOptions: {
		// 	transformMixedEsModules: true,
		// },
	},
}

if (isDev) {
	// @ts-ignore
	config.build.rollupOptions.input.dev_tools = 'src/browser/dev-tools/index.html'
}

export default defineConfig(config)
