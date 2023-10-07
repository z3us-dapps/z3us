import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { WalletTransactionItems } from '@radixdlt/radix-dapp-toolkit'
import type { Intent, PrivateKey } from '@radixdlt/radix-engine-toolkit'
import { useGatewayClient } from 'packages/ui/src/hooks/dapp/use-gateway-client'
import { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { useImmer } from 'use-immer'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { useIntent } from '@src/hooks/transaction/use-intent'
import { useSign } from '@src/hooks/transaction/use-sign'

import { Manifest } from './manifest'

interface IProps {
	interaction: WalletInteractionWithTabId
}

const messages = defineMessages({
	submit: {
		id: 'interaction.home.transaction.submit',
		defaultMessage: 'Submit',
	},
})

type State = { intent?: Intent; notary?: PrivateKey; needSignaturesFrom?: string[] }

export const TransactionInteraction: React.FC<IProps> = ({ interaction }) => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const { transaction } = useGatewayClient()

	const buildIntent = useIntent()
	const sign = useSign()

	const [state, setState] = useImmer<State>({})

	useEffect(() => {
		const { send: input } = interaction.items as WalletTransactionItems
		buildIntent(input).then(result => setState(result))
	}, [])

	const handleSubmit = async () => {
		try {
			const notarizedTransaction = await sign(state.notary, state.intent, state.needSignaturesFrom)
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
			{state?.intent && <Manifest intent={state.intent} />}
			<Button onClick={handleSubmit} styleVariant="tertiary" sizeVariant="xlarge" fullWidth disabled={!state?.intent}>
				{intl.formatMessage(messages.submit)}
			</Button>
		</Box>
	)
}
