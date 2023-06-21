import { addMetadata as addRadixMetadata } from '@radixdlt/connector-extension/src/chrome/helpers/add-metadata'
import browser from 'webextension-polyfill'

import { DAPP_ORIGIN } from 'ui/src/containers/accounts/constants'

const popupURL = new URL(browser.runtime.getURL(''))

const overrideOrigin = (message: Record<string, any>): Record<string, any> => {
	const metadata = message.metadata || {}
	return {
		...message,
		metadata: {
			...metadata,
			origin: metadata?.origin === popupURL.origin ? DAPP_ORIGIN : metadata?.origin,
		},
	}
}

export const addMetadata = (message: Record<string, any>): Record<string, any> =>
	overrideOrigin(addRadixMetadata(message))
