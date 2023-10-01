import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { useSendTransaction } from '@src/hooks/use-send-transaction'

interface IProps {
	interaction: WalletInteractionWithTabId
}

export const TransactionInteraction: React.FC<IProps> = ({ interaction }) => {
	const { interactionId } = useParams()
	const sendTransaction = useSendTransaction()

	useEffect(() => {
		if (interaction.items.discriminator === 'transaction') {
			sendTransaction(interaction.items.send)
				.then(transactionIntentHash =>
					browser.tabs.sendMessage(
						interaction.fromTabId,
						createRadixMessage.walletResponse(radixMessageSource.offScreen, {
							discriminator: 'success',
							items: {
								discriminator: 'transaction',
								send: {
									transactionIntentHash,
								},
							},
							interactionId,
						}),
					),
				)
				.catch(error =>
					browser.tabs.sendMessage(
						interaction.fromTabId,
						createRadixMessage.walletResponse(radixMessageSource.offScreen, {
							discriminator: 'failure',
							error: error?.message,
							interactionId,
						}),
					),
				)
				.finally(() => window.close())
		}
	}, [interaction, sendTransaction])

	return null
}
