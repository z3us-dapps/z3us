import { config as radixCfg } from '@radixdlt/connector-extension/src/config'

import packageJson from '../package.json'

const { version } = packageJson

export const config: typeof radixCfg & {
	isDevlopmentMode: boolean
	isProductionMode: boolean
} = {
	...radixCfg,
	offscreen: {
		...radixCfg.offscreen,
		url: 'src/browser/offscreen/index.html',
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
		},
	},
	version,
	isDevlopmentMode: import.meta.env.MODE === 'development',
	isProductionMode: import.meta.env.MODE === 'production',
}
