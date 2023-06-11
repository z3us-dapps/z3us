import { addMetadata as addRadixMetadata } from '@radixdlt/connector-extension/src/chrome/helpers/add-metadata'

import { DAPP_ORIGIN } from '@src/constants'

const overideOrigin = (message: Record<string, any>): Record<string, any> => ({
	...message,
	metadata: {
		...(message.metadata || {}),
		origin: DAPP_ORIGIN,
	},
})

export const addMetadata = (message: Record<string, any>): Record<string, any> =>
	overideOrigin(addRadixMetadata(message))
