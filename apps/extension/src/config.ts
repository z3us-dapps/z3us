import { config as radixCfg } from '@radixdlt/connector-extension/src/config'

import packageJson from '../package.json'

const { version } = packageJson

export type ConfigType = typeof radixCfg & {
	isDevelopmentMode: boolean
	isProductionMode: boolean
	isExtensionContext: boolean
	popup: typeof radixCfg.popup & {
		pages: {
			options: string
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
			pairing: 'src/pages/app/index.html#/pairing',
			options: 'src/pages/app/index.html#/options',
			app: 'src/pages/app/index.html#/accounts',
		},
	},
	version,
	radix: {
		extension: {
			id: 'knnddnciondgghmgcmjjebigcehhkeoi',
		},
	},
	isDevelopmentMode: import.meta.env.MODE === 'development',
	isProductionMode: import.meta.env.MODE === 'production' || import.meta.env.MODE === 'rcnet',
	isExtensionContext: Boolean(globalThis.chrome?.runtime?.id || globalThis.browser?.runtime?.id),
}
