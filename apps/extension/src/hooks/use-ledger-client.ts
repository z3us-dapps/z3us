import {
	type Message as RadixMessage,
	messageSource as radixMessageSource,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import { useContext, useEffect, useMemo } from 'react'
import browser from 'webextension-polyfill'

import {
	getDeriveAndDisplayPayload,
	getDerivePublicKeyPayload,
	getDeviceInfoPayload,
} from '@src/browser/ledger/messages'
import { ClientContext } from '@src/context/ledger-client-provider'

export const useLedgerClient = () => {
	const client = useContext(ClientContext)

	useEffect(() => {
		browser.runtime.onMessage.addListener(client.onMessage)
		return () => browser.runtime.onMessage.removeListener(client.onMessage)
	}, [client])

	return useMemo(
		() => ({
			getDeviceInfo: async (): Promise<RadixMessage> =>
				client.sendMessage(createRadixMessage.walletToLedger(radixMessageSource.offScreen, getDeviceInfoPayload())),
			derive: async (): Promise<RadixMessage> =>
				client.sendMessage(
					createRadixMessage.walletToLedger(radixMessageSource.offScreen, getDeriveAndDisplayPayload()),
				),
			derivePublicKey: async (): Promise<RadixMessage> =>
				client.sendMessage(
					createRadixMessage.walletToLedger(radixMessageSource.offScreen, getDerivePublicKeyPayload()),
				),
		}),
		[client],
	)
}
