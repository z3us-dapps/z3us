import rollupInject from '@rollup/plugin-inject'
import webExtension from '@samrum/vite-plugin-web-extension'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

import chrome from './chrome'
import firefox from './firefox'

// eslint-disable-next-line
console.info(`building for env: ${process.env.NODE_ENV}`)
// eslint-disable-next-line
console.info(`building for target: ${process.env.APP_TARGET}`)

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
		visualizer(),
		vanillaExtractPlugin(),
	],
	build: {
		minify: process.env.NODE_ENV === 'production',
		outDir: path.resolve(__dirname, `dist/${process.env.APP_TARGET}`),
		sourcemap: true,
		rollupOptions: {
			treeshake: true,
			input: {
				inpage: path.resolve(__dirname, './src/lib/inpage.ts'),
			},
			output: {
				entryFileNames: `assets/[name].js`,
				chunkFileNames: `assets/[name].js`,
			},
			plugins: [
				webExtension({
					manifest: (process.env.APP_TARGET === 'chrome' ? chrome : firefox) as chrome.runtime.Manifest,
				}),
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
