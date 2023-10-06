import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin'
import { defineConfig } from 'tsup'

import { dependencies, peerDependencies } from './package.json'

export default defineConfig({
	entry: ['./src/**/*!(index).ts?(x)'],
	outDir: 'dist',
	splitting: false,
	bundle: true,
	minify: true,
	sourcemap: true,
	format: ['cjs', 'esm'],
	// @NOTE: breaks build
	// dts: true,
	target: 'node18',
	platform: 'browser',
	esbuildPlugins: [vanillaExtractPlugin()],
	external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
	clean: true,
})
