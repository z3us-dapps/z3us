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
			config: resolve(__dirname, 'src/config'),
			version: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/version'),
			options: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/options'),
			utils: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/utils'),
			chrome:  resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/chrome'),
			// have to replace each crypto/[path] otherwise it will error out due to default crypto import
			'crypto/blake2b': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/crypto/blake2b'),
			'crypto/curve25519': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/crypto/curve25519'),
			'crypto/encryption': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/crypto/encryption'),
			'crypto/sealbox': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/crypto/sealbox'),
			'crypto/secp256k1': resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/crypto/secp256k1'),
			'crypto/secure-random': resolve(__dirname,'../../node_modules/@radixdlt/connector-extension/src/crypto/secure-random'),
			'crypto/get-linking-message': resolve(__dirname,'../../node_modules/@radixdlt/connector-extension/src/crypto/get-linking-message'),
			pairing: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/pairing'),
			components: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/components'),
			ledger: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/ledger'),
			queues: resolve(__dirname, '../../node_modules/@radixdlt/connector-extension/src/queues'),
			'chrome/helpers/add-origin-to-wallet-interaction': resolve(__dirname, 'src/radix/add-origin-to-wallet-interaction'),
			'chrome/helpers/chrome-storage-sync': resolve(__dirname, 'src/radix/storage-sync'),
			'chrome/helpers/chrome-local-store': resolve(__dirname, 'src/radix/storage-local'),
			'chrome/background/create-gateway-module': resolve(__dirname, 'src/radix/create-gateway-module'),
			'./create-gateway-module': resolve(__dirname, 'src/radix/create-gateway-module'),
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
				dark: resolve(__dirname, 'src/pages/app/dark.html'),
				light: resolve(__dirname, 'src/pages/app/light.html'),
				system: resolve(__dirname, 'src/pages/app/system.html'),
			},
		},
	},
}

if (withRadix) (config.build.rollupOptions.input as any).offscreen = resolve(__dirname, 'src/pages/offscreen/index.html')
if (withRadix) (config.build.rollupOptions.input as any).ledger = resolve(__dirname, 'src/pages/ledger/index.html')
if (isDevToolsActive) (config.build.rollupOptions.input as any).dev_tools = resolve(__dirname, 'src/pages/dev-tools/index.html')

export default defineConfig(config as UserConfig)
