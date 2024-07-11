import { RadixNetworkConfigById } from '@radixdlt/babylon-gateway-api-sdk'
import { GatewayModule } from '@radixdlt/radix-dapp-toolkit'
import 'neverthrow'

import { DAPP_ADDRESS, DAPP_NAME } from 'ui/src/constants/dapp'

import { config } from '@src/config'

// import createGatewayModule from '@radixdlt/connector-extension/src/chrome/background/create-gateway-module'

export const createGatewayModule = (networkId: number): GatewayModule =>
	GatewayModule({
		clientConfig: {
			basePath: RadixNetworkConfigById[networkId].gatewayUrl,
			applicationName: DAPP_NAME,
			applicationVersion: config.version,
			applicationDappDefinitionAddress: DAPP_ADDRESS,
		},
	})
