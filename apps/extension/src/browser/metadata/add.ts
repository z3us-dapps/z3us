import { addMetadata as addRadixMetadata } from '@radixdlt/connector-extension/src/chrome/helpers/add-metadata'
import type { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import browser from 'webextension-polyfill'

import { DAPP_ORIGIN } from 'ui/src/constants/dapp'

const popupURL = new URL(browser.runtime.getURL(''))

export const overrideOrigin = (message: RadixMessage): RadixMessage => {
	const metadata = message.metadata || {}
	return {
		...message,
		metadata: {
			...metadata,
			origin: metadata?.origin === popupURL.origin ? DAPP_ORIGIN : metadata?.origin,
		},
	} as RadixMessage
}

export const addMetadata = (message: RadixMessage) => overrideOrigin(addRadixMetadata(message))
