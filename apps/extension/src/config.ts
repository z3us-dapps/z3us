import { config as radixCfg } from '@radixdlt/connector-extension/src/config'

export const config = {
	...radixCfg,
	offscreen: {
		...radixCfg.offscreen,
		url: 'src/browser/offscreen/index.html',
	},
	devTools: {
		...radixCfg.devTools,
		url: 'src/browser/dev-tools/index.html',
	},
	version: process.env.APP_VERSION,
	isDevlopmentMode: import.meta.env.MODE === 'development',
	isProductionMode: import.meta.env.MODE === 'production',
}
