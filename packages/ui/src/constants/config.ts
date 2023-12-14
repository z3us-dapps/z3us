import { CURRENCY } from '../store/types'

export const config = {
	defaultNetworkId: 1,
	defaultGatewayBaseUrl: 'https://mainnet.radixdlt.com',
	defaultCurrency: CURRENCY.USD,
	defaultExplorerURL: 'https://dashboard.radixdlt.com',
}

export type ConfigType = typeof config
