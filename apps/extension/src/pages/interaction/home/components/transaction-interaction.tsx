import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { WalletTransactionItems } from '@radixdlt/radix-dapp-toolkit'
import { LTSRadixEngineToolkit, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import type { Intent, PrivateKey, TransactionSummary } from '@radixdlt/radix-engine-toolkit'
import { useGatewayClient } from 'packages/ui/src/hooks/dapp/use-gateway-client'
import { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { useIntent } from '@src/hooks/transaction/use-intent'
import { useSign } from '@src/hooks/transaction/use-sign'

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
	const { transaction } = useGatewayClient()

	const buildIntent = useIntent()
	const sign = useSign()

	const [intent, setIntent] = useState<{ intent: Intent; notary: PrivateKey; needSignaturesFrom: string[] }>()
	const [summary, setSummary] = useState<TransactionSummary | null>(null)

	useEffect(() => {
		const { send: input } = interaction.items as WalletTransactionItems
		buildIntent(input).then(async result => {
			setIntent(result)

			try {
				const tx = await RadixEngineToolkit.Intent.intentHash(result.intent)
				const txSummary = await LTSRadixEngineToolkit.Transaction.summarizeTransaction(tx.hash)
				setSummary(txSummary)
			} catch (error) {
				setSummary(null)
			}
		})
	}, [])

	const handleSubmit = async () => {
		try {
			const notarizedTransaction = await sign(intent.notary, intent.intent, intent.needSignaturesFrom)
			await transaction.innerClient.transactionSubmit({
				transactionSubmitRequest: { notarized_transaction_hex: notarizedTransaction.toHex() },
			})

			await browser.tabs.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					discriminator: 'success',
					items: {
						discriminator: 'transaction',
						send: {
							transactionIntentHash: notarizedTransaction.intentHashHex(),
						},
					},
					interactionId,
				}),
			)
		} catch (error) {
			browser.tabs.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					discriminator: 'failure',
					error: error?.message,
					interactionId,
				}),
			)
		} finally {
			window.close()
		}
	}

	if (interaction.items.discriminator !== 'transaction') return null

	return (
		<Box>
			<Text>{summary ? JSON.stringify(summary) : JSON.stringify((interaction.items as any).send)}</Text>
			<Button onClick={handleSubmit} styleVariant="tertiary" sizeVariant="xlarge" fullWidth>
				{intl.formatMessage(messages.submit)}
			</Button>
		</Box>
	)
}
