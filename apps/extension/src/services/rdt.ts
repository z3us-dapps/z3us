import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit'

import { DAPP_ADDRESS, DAPP_NAME, DAPP_NETWORK_ID } from '@src/constants'

const rdt = RadixDappToolkit(
	{
		dAppName: DAPP_NAME,
		dAppDefinitionAddress: DAPP_ADDRESS,
	},
	requestData => {
		requestData({
			accounts: { quantifier: 'atLeast', quantity: 1 },
		})
	},
	{
		networkId: DAPP_NETWORK_ID,
	},
)

export default rdt
