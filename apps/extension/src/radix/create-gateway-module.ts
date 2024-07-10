import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'
import { __VERSION__ } from '@radixdlt/connector-extension/src/version'
import { GatewayModule } from '@radixdlt/radix-dapp-toolkit'

// import createGatewayModule from '@radixdlt/connector-extension/src/chrome/background/create-gateway-module'

export const createGatewayModule = (networkId: number): GatewayModule =>
	GatewayModule({
		clientConfig: {
			basePath: RadixNetworkConfigById[networkId].gatewayUrl,
			applicationName: 'Radix Connector Extension',
			applicationVersion: __VERSION__,
			applicationDappDefinitionAddress: '',
		},
	})
