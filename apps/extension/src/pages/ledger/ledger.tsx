import {
	Message as RadixMessage,
	Messages as RadixMessages,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import { MessagingContext } from '@radixdlt/connector-extension/src/ledger/contexts/messaging-context'
import {
	LedgerResponse,
	isDeviceIdRequest,
	isImportOlympiaDeviceRequest,
	isPublicKeyRequest,
	isSignChallengeRequest,
	isSignTransactionRequest,
} from '@radixdlt/connector-extension/src/ledger/schemas'
import { ApplyLedgerFactor } from '@radixdlt/connector-extension/src/ledger/views/apply-ledger-factor'
import { ImportOlympiaDevice } from '@radixdlt/connector-extension/src/ledger/views/import-olympia-device'
import { NewHardwareWallet } from '@radixdlt/connector-extension/src/ledger/views/new-hardware-wallet'
import { SignChallenge } from '@radixdlt/connector-extension/src/ledger/views/sign-challenge'
import { SignTransaction } from '@radixdlt/connector-extension/src/ledger/views/sign-transaction'
import React, { useEffect, useMemo, useState } from 'react'

import { Box } from 'ui/src/components-v2/box'

import { MessageSource } from '@src/browser/messages/types'
import { useMessageClient } from '@src/hooks/use-message-client'

const Ledger: React.FC = () => {
	const { port, radix } = useMessageClient()
	const [currentMessage, setCurrentMessage] = useState<RadixMessages['walletToLedger']>()

	const messagingContext = useMemo(() => {
		const respond = async (response: LedgerResponse) => {
			await radix(createMessage.ledgerResponse(response))
			await radix(createMessage.confirmationSuccess('offScreen', currentMessage!.messageId))
			// await chrome.runtime.sendMessage(createMessage.ledgerResponse(response))
			// await chrome.runtime.sendMessage(createMessage.confirmationSuccess('offScreen', currentMessage!.messageId))
			// window.close()
		}

		const switchToFullWindow = async () => {
			//   await chrome.runtime.sendMessage(
			// 	createMessage.convertPopupToTab(currentMessage!)
			//   )
			//   window.close()
		}

		return {
			respond,
			switchToFullWindow,
		}
	}, [currentMessage])

	useEffect(() => {
		const readMessage = (message: any) => {
			if (message?.target !== MessageSource.POPUP) {
				return
			}
			if (!message.messageId) {
				return
			}
			console.debug(message)

			const radixMsg = message.payload as RadixMessage
			if (radixMsg.discriminator === 'walletToLedger' && radixMsg.source === 'background') {
				setCurrentMessage(message)
			}
		}

		port.onMessage.addListener(readMessage)

		return () => {
			port.disconnect()
		}
	}, [])

	const renderLedgerView = (message?: RadixMessages['walletToLedger']): JSX.Element => {
		if (!message) return null

		if (isDeviceIdRequest(message.data)) {
			return <NewHardwareWallet message={message.data} />
		}
		if (isPublicKeyRequest(message.data)) {
			return <ApplyLedgerFactor message={message.data} />
		}
		if (isSignTransactionRequest(message.data)) {
			return <SignTransaction message={message.data} />
		}
		if (isSignChallengeRequest(message.data)) {
			return <SignChallenge message={message.data} />
		}
		if (isImportOlympiaDeviceRequest(message.data)) {
			return <ImportOlympiaDevice message={message.data} />
		}
		return null
	}

	return (
		<div>
			<MessagingContext.Provider value={messagingContext}>
				<Box>
					<h1>Ledger container @TODO: handle ledger messages and display appropriet screen with action</h1>
					<p>{JSON.stringify(currentMessage)}</p>
				</Box>
				<Box maxWidth="medium">{renderLedgerView(currentMessage)}</Box>
			</MessagingContext.Provider>
		</div>
	)
}

export default Ledger
