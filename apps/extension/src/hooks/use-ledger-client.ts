import {
	type Message as RadixMessage,
	messageDiscriminator,
	messageSource as radixMessageSource,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type {
	KeyParameters,
	LedgerDevice,
	LedgerPublicKeyResponse,
	LedgerSignChallengeResponse,
	LedgerSignTransactionResponse,
} from '@radixdlt/connector-extension/src/ledger/schemas'
import { Convert } from '@radixdlt/radix-engine-toolkit'
import { useContext, useEffect, useMemo } from 'react'
import browser from 'webextension-polyfill'

import { useSharedStore } from 'ui/src/hooks/use-store'
import type { Account, Persona } from 'ui/src/store/types'

import {
	getDerivePublicKeyPayload,
	getDeviceInfoPayload,
	getSignChallengePayload,
	getSignTxPayload,
	keyParametersFromSingers,
} from '@src/browser/ledger/messages'
import { ClientContext } from '@src/context/ledger-client-provider'

import { useMessageClient } from './use-message-client'

function processLedgerResponse(message: RadixMessage) {
	if (message?.discriminator === messageDiscriminator.ledgerResponse) {
		if (!message?.data) {
			throw Error(`Invalid ledger response: ${JSON.stringify(message)}`)
		}
		const { success, error } = message.data
		if (error) {
			throw Error(error.message)
		}
		if (!success) {
			throw Error('Ledger Action failed')
		}
		return success
	}
	throw Error(`Invalid ledger response: ${JSON.stringify(message)}`)
}

export const useLedgerClient = () => {
	const client = useContext(ClientContext)
	const messageClient = useMessageClient()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	useEffect(() => {
		browser.runtime.onMessage.addListener(client.onMessage)
		return () => browser.runtime.onMessage.removeListener(client.onMessage)
	}, [client])

	return useMemo(
		() => ({
			getDeviceInfo: async (): Promise<LedgerDevice> =>
				client
					.sendMessage(createRadixMessage.walletToLedger(radixMessageSource.offScreen, getDeviceInfoPayload()))
					.then(processLedgerResponse),

			derivePublicKeys: async (
				singers: Array<Account | Persona | KeyParameters>,
			): Promise<LedgerPublicKeyResponse['success']> => {
				const device = { ...keystore.ledgerDevice, name: keystore.name } as LedgerDevice
				const keysParameters = keyParametersFromSingers(singers)
				const payload = getDerivePublicKeyPayload(device, keysParameters)

				return client
					.sendMessage(createRadixMessage.walletToLedger(radixMessageSource.offScreen, payload))
					.then(processLedgerResponse)
			},

			signChallenge: async (
				singers: Array<Account | Persona>,
				challenge: string,
				metadata: { origin: string; dAppDefinitionAddress: string },
			): Promise<LedgerSignChallengeResponse['success']> => {
				const device = { ...keystore.ledgerDevice, name: keystore.name } as LedgerDevice
				const keysParameters = keyParametersFromSingers(singers)
				const payload = getSignChallengePayload(device, keysParameters, challenge, metadata)

				return client
					.sendMessage(createRadixMessage.walletToLedger(radixMessageSource.offScreen, payload))
					.then(processLedgerResponse)
			},

			signTx: async (
				singers: Array<Account | Persona>,
				intent: Uint8Array,
			): Promise<LedgerSignTransactionResponse['success']> => {
				const device = { ...keystore.ledgerDevice, name: keystore.name } as LedgerDevice
				const keysParameters = keyParametersFromSingers(singers)
				const payload = getSignTxPayload(device, keysParameters, Convert.Uint8Array.toHexString(intent))

				return client
					.sendMessage(createRadixMessage.walletToLedger(radixMessageSource.offScreen, payload))
					.then(processLedgerResponse)
			},
		}),
		[client, messageClient, keystore],
	)
}
