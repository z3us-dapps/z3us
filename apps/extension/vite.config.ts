import { crx } from '@crxjs/vite-plugin'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { UserConfig, defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import manifest from './src/browser/manifest/manifest'

const isProd = process.env.NODE_ENV === 'production'

const withRadix = !!process.env.RADIX
const isDevToolsActive = withRadix && !!process.env.DEV_TOOLS

const config = {
	server: {
		port: 8003,
	},
	resolve: {
		alias: {
			stream: 'vite-compatible-readable-stream',
			config: resolve(__dirname, 'src/config'),
			'message-router': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/message-router'),
			chrome: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/chrome'),
			components: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/components'),
			connector: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/connector'),
			'crypto/blake2b': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/crypto/blake2b'),
			'crypto/curve25519': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/crypto/curve25519'),
			'crypto/encryption': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/crypto/encryption'),
			'crypto/sealbox': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/crypto/sealbox'),
			'crypto/secp256k1': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/crypto/secp256k1'),
			'crypto/secure-random': resolve(__dirname,'../../node_modules/@radixdlt/connector-extension/src/crypto/secure-random'),
			'io-types': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/io-types'),
			ledger: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/ledger'),
			pairing: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/pairing'),
			options: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/options'),
			queues: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/queues'),
			utils: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/utils'),
			'chrome/helpers/add-metadata': resolve(__dirname, 'src/browser/helpers/add-metadata'),
		},
	},
	define: {
		APP_RADIX: JSON.stringify(withRadix),
		APP_DEV_TOOLS: JSON.stringify(isDevToolsActive),
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
		outDir: resolve(__dirname, 'dist'),
		sourcemap: true,
		rollupOptions: {
			treeshake: true,
			input: {
				app: resolve(__dirname, 'src/pages/app/index.html'),
				app_dark: resolve(__dirname, 'src/pages/app/popup-theme-dark.html'),
				app_light: resolve(__dirname, 'src/pages/app/popup-theme-light.html'),
				app_system: resolve(__dirname, 'src/pages/app/popup-theme-system.html'),
			},
		},
	},
}

if (withRadix) (config.build.rollupOptions.input as any).offscreen = resolve(__dirname, 'src/pages/offscreen/index.html')
if (withRadix) (config.build.rollupOptions.input as any).ledger = resolve(__dirname, 'src/pages/ledger/index.html')
if (isDevToolsActive) (config.build.rollupOptions.input as any).dev_tools = resolve(__dirname, 'src/pages/dev-tools/index.html')

export default defineConfig(config as UserConfig)
