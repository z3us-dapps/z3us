import {
	Message as RadixMessage,
	Messages as RadixMessages,
} from '@radixdlt/connector-extension/src/chrome/messages/_types'
import React, { useEffect, useState } from 'react'

import { MessageSource } from '@src/browser/messages/types'
import { useMessageClient } from '@src/hooks/use-message-client'

const Ledger: React.FC = () => {
	const { port } = useMessageClient()
	const [currentMessage, setCurrentMessage] = useState<RadixMessages['walletToLedger']>()

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

	return (
		<div>
			<h1>Ledger container @TODO: handle ledger messages and display appropriet screen with action</h1>
			<p>{JSON.stringify(currentMessage)}</p>
		</div>
	)
}

export default Ledger
