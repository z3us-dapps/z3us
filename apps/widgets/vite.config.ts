import react from '@vitejs/plugin-react'
import { glob } from 'glob'
import { fileURLToPath } from 'node:url'
import { extname, relative, resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

const isProd = process.env.NODE_ENV === 'production'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dts({ include: ['lib'] })],
	build: {
		copyPublicDir: false,
		minify: isProd,
		sourcemap: !isProd,
		lib: {
			entry: resolve(__dirname, 'lib/main.ts'),
			formats: ['es'],
		},
		rollupOptions: {
			treeshake: true,
			input: Object.fromEntries(
				// https://rollupjs.org/configuration-options/#input
				glob.sync('lib/**/*.{ts,tsx}').map(file => [
					// 1. The name of the entry point
					// lib/nested/foo.js becomes nested/foo
					relative('lib', file.slice(0, file.length - extname(file).length)),
					// 2. The absolute path to the entry file
					// lib/nested/foo.ts becomes /project/lib/nested/foo.ts
					fileURLToPath(new URL(file, import.meta.url)),
				]),
			),
			output: {
				assetFileNames: 'assets/[name][extname]',
				entryFileNames: '[name].js',
			},
		},
	},
})
