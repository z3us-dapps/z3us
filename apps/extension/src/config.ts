import { config as radixCfg } from '@radixdlt/connector-extension/src/config'

import packageJson from '../package.json'

const { version } = packageJson

export type ConfigType = typeof radixCfg & {
	isDevlopmentMode: boolean
	isProductionMode: boolean
	popup: typeof radixCfg.popup & {
		pages: {
			dashboard: string
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
			pairing: 'src/pages/pairing/index.html',
			ledger: 'src/pages/ledger/index.html',
			dashboard: 'src/pages/dashboard/index.html',
		},
	},
	version,
	isDevlopmentMode: import.meta.env.MODE === 'development',
	isProductionMode: import.meta.env.MODE === 'production',
}
