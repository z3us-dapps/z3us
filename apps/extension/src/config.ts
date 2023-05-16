import { config as radixCfg } from '@radixdlt/connector-extension/src/config'

export const config = {
	...radixCfg,
	offscreen: {
		...radixCfg.offscreen,
		url: 'src/browser/offscreen/index.html',
	},
	devTools: {
		...radixCfg.devTools,
		url: 'src/pages/dev-tools/index.html',
	},
	pairing: {
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
	version: process.env.APP_VERSION,
	isDevlopmentMode: import.meta.env.MODE === 'development',
	isProductionMode: import.meta.env.MODE === 'production',
}
