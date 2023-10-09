import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { WalletTransactionItems } from '@radixdlt/radix-dapp-toolkit'
import type { Intent, PrivateKey } from '@radixdlt/radix-engine-toolkit'
import { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { useImmer } from 'use-immer'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { useGatewayClient } from 'ui/src/hooks/dapp/use-gateway-client'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { useIntent } from '@src/hooks/transaction/use-intent'
import { useSign } from '@src/hooks/transaction/use-sign'
import type { TransactionSettings } from '@src/types/transaction'

import { Manifest } from './manifest'

interface IProps {
	interaction: WalletInteractionWithTabId
}

const messages = defineMessages({
	submit: {
		id: 'interaction.home.transaction.submit',
		defaultMessage: 'Submit',
	},
	error: {
		id: 'interaction.home.transaction.error',
		defaultMessage: `Failed to submit transaction{hasMessage, select,
			true {: {message}}
			other {, please try again}
		}`,
	},
})

type State = {
	intent?: Intent
	notary?: PrivateKey
	needSignaturesFrom?: string[]
} & TransactionSettings

export const TransactionInteraction: React.FC<IProps> = ({ interaction }) => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const { transaction } = useGatewayClient()

	const buildIntent = useIntent()
	const sign = useSign()

	const [state, setState] = useImmer<State>({})

	useEffect(() => {
		const { send } = interaction.items as WalletTransactionItems
		buildIntent(send).then(response => {
			setState(draft => {
				draft.intent = response.intent
				draft.notary = response.notary
				draft.needSignaturesFrom = response.needSignaturesFrom
			})
		})
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
					interactionId,
					error: intl.formatMessage(messages.error, { hasMessage: !!error?.message, message: error?.message }),
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
