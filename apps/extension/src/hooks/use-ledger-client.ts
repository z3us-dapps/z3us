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
	LedgerRequest,
	LedgerSignChallengeResponse,
	LedgerSignTransactionResponse,
} from '@radixdlt/connector-extension/src/ledger/schemas'
import { Convert } from '@radixdlt/radix-engine-toolkit'
import { useCallback, useContext, useMemo } from 'react'

import { useSharedStore } from 'ui/src/hooks/use-store'
import type { Account, HardwareKeySource, Persona } from 'ui/src/store/types'

import {
	getDerivePublicKeyPayload,
	getDeviceInfoPayload,
	getSignChallengePayload,
	getSignTxPayload,
	keyParametersFromSingers,
} from '@src/browser/ledger/messages'
import { ClientContext } from '@src/context/ledger-client-provider'

import { useLedgerConfirmModal } from './modal/use-ledger-confirm-modal'

function processLedgerResponse(message: RadixMessage) {
	if (message?.discriminator === messageDiscriminator.ledgerResponse) {
		if (!message?.data) {
			throw Error(`Invalid ledger response: ${JSON.stringify(message)}`)
		}
		const { success, error } = message.data
		if (error) {
			// see for error code details
			// https://github.com/radixdlt/babylon-ledger-app/blob/main/src/app_error.rs#L11
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
	const showModalAndWait = useLedgerConfirmModal()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const sendMessageToLedger = useCallback(
		(request: LedgerRequest) =>
			showModalAndWait(() =>
				client
					.sendMessage(createRadixMessage.walletToLedger(radixMessageSource.offScreen, request))
					.then(processLedgerResponse),
			),
		[client, showModalAndWait],
	)

	return useMemo(
		() => ({
			getDeviceInfo: (): Promise<LedgerDevice> => sendMessageToLedger(getDeviceInfoPayload()),

			derivePublicKeys: (
				keySource: HardwareKeySource,
				singers: Array<Account | Persona | KeyParameters>,
			): Promise<LedgerPublicKeyResponse['success']> => {
				const device = { ...keySource.ledgerDevice, name: keystore.name } as LedgerDevice
				const keysParameters = keyParametersFromSingers(singers)
				const payload = getDerivePublicKeyPayload(device, keysParameters)

				return sendMessageToLedger(payload)
			},

			signChallenge: (
				keySource: HardwareKeySource,
				singers: Array<Account | Persona>,
				challenge: string,
				metadata: { origin: string; dAppDefinitionAddress: string },
			): Promise<LedgerSignChallengeResponse['success']> => {
				const device = { ...keySource.ledgerDevice, name: keystore.name } as LedgerDevice
				const keysParameters = keyParametersFromSingers(singers)
				const payload = getSignChallengePayload(device, keysParameters, challenge, metadata)

				return sendMessageToLedger(payload)
			},

			signTx: (
				keySource: HardwareKeySource,
				singers: Array<Account | Persona>,
				intent: Uint8Array,
			): Promise<LedgerSignTransactionResponse['success']> => {
				const device = { ...keySource.ledgerDevice, name: keystore.name } as LedgerDevice
				const keysParameters = keyParametersFromSingers(singers)
				const payload = getSignTxPayload(device, keysParameters, Convert.Uint8Array.toHexString(intent))

				return sendMessageToLedger(payload)
			},
		}),
		[keystore, sendMessageToLedger],
	)
}
