import { config as radixCfg } from '@radixdlt/connector-extension/src/config'

import packageJson from '../package.json'

const { version } = packageJson

export type ConfigType = typeof radixCfg & {
	isDevlopmentMode: boolean
	isProductionMode: boolean
	popup: typeof radixCfg.popup & {
		pages: {
			app: string
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
			app: 'src/pages/app/index.html#/accounts/all',
		},
	},
	version,
	isDevlopmentMode: import.meta.env.MODE === 'development',
	isProductionMode: import.meta.env.MODE === 'production' || import.meta.env.MODE === 'rcnet',
}
