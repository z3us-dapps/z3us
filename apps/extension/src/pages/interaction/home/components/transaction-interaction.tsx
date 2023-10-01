import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import { Box } from 'packages/ui/src/components/box'
import { Button } from 'packages/ui/src/components/button'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Text } from 'ui/src/components/typography'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { useSendTransaction } from '@src/hooks/use-send-transaction'

interface IProps {
	interaction: WalletInteractionWithTabId
}

const messages = defineMessages({
	submit: {
		id: 'interaction.home.transaction.submit',
		defaultMessage: 'Submit',
	},
})

export const TransactionInteraction: React.FC<IProps> = ({ interaction }) => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const sendTransaction = useSendTransaction()

	const handleSubmit = async () => {
		sendTransaction((interaction.items as any).send)
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

	if (interaction.items.discriminator !== 'transaction') return null

	return (
		<Box>
			<Text>{JSON.stringify((interaction.items as any).send)}</Text>
			<Button onClick={handleSubmit} styleVariant="tertiary" sizeVariant="xlarge" fullWidth>
				{intl.formatMessage(messages.submit)}
			</Button>
		</Box>
	)
}
