import { crx } from '@crxjs/vite-plugin'
import rollupInject from '@rollup/plugin-inject'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifest from './manifest'

const isProd = process.env.NODE_ENV === 'production'

const isDevToolsActive = !!process.env.DEV_TOOLS
const isLedgerActive = !!process.env.LEDGER
const isPairingActive = !!process.env.PAIRING

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
	plugins: [
		react({
			include: '**/*.tsx',
		}),
		crx({ manifest }),
		tsconfigPaths({
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
				offscreen: 'src/browser/offscreen/index.html',
				dashboard: 'src/pages/dashboard/index.html',
				dashboard_dark: 'src/pages/dashboard/popup-theme-dark.html',
				dashboard_light: 'src/pages/dashboard/popup-theme-light.html',
				dashboard_system: 'src/pages/dashboard/popup-theme-system.html',
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

if (isLedgerActive) {
	;(config.build.rollupOptions.input as any).ledger = 'src/pages/ledger/index.html'
}
if (isPairingActive) {
	;(config.build.rollupOptions.input as any).pairing = 'src/pages/pairing/index.html'
}
if (isDevToolsActive) {
	;(config.build.rollupOptions.input as any).dev_tools = 'src/pages/dev-tools/index.html'
}

export default defineConfig(config)
