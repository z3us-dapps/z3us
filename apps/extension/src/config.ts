import {
	defaultConnectionConfig as defaultConnectionConfigFromRadix,
	defaultRadixConnectConfig as defaultRadixConnectConfigFromRadix,
	mode as modeFromRadix,
	config as radixCfg,
	radixConnectConfig as radixConnectConfigFromRadix,
} from '@radixdlt/connector-extension/src/config'

import packageJson from '../package.json'

const { version } = packageJson

export const isPublicRelease = true //import.meta.env.MODE === 'production'
export const radixConnectConfig: typeof radixConnectConfigFromRadix = radixConnectConfigFromRadix
export const mode = modeFromRadix
export const defaultRadixConnectConfig = defaultRadixConnectConfigFromRadix
export const defaultConnectionConfig: typeof defaultConnectionConfigFromRadix = defaultConnectionConfigFromRadix

export type ConfigType = typeof radixCfg & {
	isDevelopmentMode: boolean
	isProductionMode: boolean
	popup: typeof radixCfg.popup & {
		dir: string
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
			pairing: 'src/pages/app/system.html#/keystore/new',
		},
		dir: 'src/pages/app',
	},
	version,
	isDevelopmentMode: import.meta.env.MODE !== 'production',
	isProductionMode: import.meta.env.MODE === 'production',
}
