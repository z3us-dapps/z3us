import type { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import browser from 'webextension-polyfill'

import { DAPP_ORIGIN } from 'ui/src/constants/dapp'

const popupURL = new URL(browser.runtime.getURL(''))

export const addOriginToMetadata = (message: RadixMessage): RadixMessage => {
	const { data = {} } = message as any
	const { metadata = {} } = data as any
	return {
		...message,
		data: {
			...data,
			metadata: {
				...metadata,
				origin: metadata?.origin === popupURL.origin ? DAPP_ORIGIN : metadata?.origin,
				original_origin: metadata?.origin,
			},
		},
	} as RadixMessage
}
