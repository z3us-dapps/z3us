import {
	defaultConnectionConfig as defaultConnectionConfigFromRadix,
	defaultRadixConnectConfig as defaultRadixConnectConfigFromRadix,
	mode as modeFromRadix,
	config as radixCfg,
	radixConnectConfig as radixConnectConfigFromRadix,
} from '@radixdlt/connector-extension/src/config'

import packageJson from '../package.json'

const { version } = packageJson

export const radixConnectConfig = radixConnectConfigFromRadix
export const mode = modeFromRadix
export const defaultRadixConnectConfig = defaultRadixConnectConfigFromRadix
export const defaultConnectionConfig = defaultConnectionConfigFromRadix

export type ConfigType = typeof radixCfg & {
	isDevelopmentMode: boolean
	isProductionMode: boolean
	isExtensionContext: boolean
	popup: typeof radixCfg.popup & {
		pages: {
			app: string
		}
	}
	radix: {
		extension: {
			id: string
		}
	}
}

export const config: ConfigType = {
	...radixCfg,
	offscreen: {
		...radixCfg.offscreen,
		url: 'src/pages/offscreen/index.html',
	},
	devTools: {
		...radixCfg.devTools,
		url: 'src/pages/dev-tools/index.html',
	},
	popup: {
		...radixCfg.popup,
		pages: {
			...radixCfg.popup.pages,
			ledger: 'src/pages/ledger/index.html',
			pairing: 'src/pages/app/index.html#/keystore/new/radix',
			app: 'src/pages/app/index.html#/',
		},
	},
	version,
	radix: {
		extension: {
			id: 'knnddnciondgghmgcmjjebigcehhkeoi',
		},
	},
	isDevelopmentMode: import.meta.env.MODE !== 'production',
	isProductionMode: import.meta.env.MODE === 'production',
	isExtensionContext: Boolean(globalThis.chrome?.runtime?.id || globalThis.browser?.runtime?.id),
}
