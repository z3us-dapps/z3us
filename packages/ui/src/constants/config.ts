import { CURRENCY } from '../store/types'

export const config = {
	defaultNetworkId: 14,
	defaultGatewayBaseUrl: 'https://rcnet-v3.radixdlt.com',
	defaultCurrency: CURRENCY.USD,
	defaultExplorerURL: 'https://rcnet-v3-dashboard.radixdlt.com',
}

export type ConfigType = typeof config
