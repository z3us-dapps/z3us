import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { WalletTransactionResponseItems } from '@radixdlt/radix-dapp-toolkit'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Input } from 'ui/src/components/input'

import { MessageAction, WalletInteractionWithTabId } from '@src/browser/app/types'
import { Z3USEvent } from '@src/browser/messages/types'
import { useAccounts } from '@src/hooks/use-accounts'
import { usePersonas } from '@src/hooks/use-personas'
import { useSendTransaction } from '@src/hooks/use-send-transaction'
import { getInteraction, removeInteraction } from '@src/radix/interaction'

const messages = defineMessages({
	interact: {
		id: 'interaction.button_interact',
		defaultMessage: 'Interact',
	},
	canceled: {
		id: 'interaction.canceled',
		defaultMessage: 'Canceled by dApp',
	},
})

export const Home: React.FC = () => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const personas = usePersonas()
	const accounts = useAccounts()
	const sendTransaction = useSendTransaction()

	const [isCanceled, setIsCanceled] = useState<boolean>(false)
	const [interaction, setInteraction] = useState<WalletInteractionWithTabId | undefined>()

	useEffect(() => {
		const listener = (event: Z3USEvent) => {
			const { detail: message } = event
			const { data, error } = message
			if (!error && data.interactionId === interaction.interactionId) {
				setIsCanceled(true)
			}
		}

		window.addEventListener(`z3us.${MessageAction.APP_INTERACTION_CANCEL}`, listener)
		return () => {
			window.removeEventListener(`z3us.${MessageAction.APP_INTERACTION_CANCEL}`, listener)
		}
	}, [interaction])

	useEffect(() => {
		if (!interactionId) return
		getInteraction(interactionId)
			.then(i => setInteraction(i))
			.then(() =>
				browser.tabs.sendMessage(
					interaction.fromTabId,
					createRadixMessage.sendMessageEventToDapp(radixMessageSource.offScreen, 'receivedByWallet', interactionId),
				),
			)
			.then(() => removeInteraction(interactionId))
	}, [interactionId])

	const handleInteraction = () => {
		switch (interaction.items.discriminator) {
			case 'authorizedRequest':
				// https://github.com/radixdlt/wallet-sdk/blob/c4a8433a2b2357c4d28dcf36fe2810f0d5fe158e/lib/__tests__/wallet-sdk.spec.ts#L93
				browser.tabs.sendMessage(
					interaction.fromTabId,
					createRadixMessage.walletResponse(radixMessageSource.offScreen, {
						discriminator: 'success',
						items: {
							discriminator: 'authorizedRequest',
							auth: {
								discriminator: 'loginWithoutChallenge',
								persona: personas?.[0] || {
									identityAddress: 'account_tdx_b_1qlu8fdyj77jpmu2mqe4rgh3738jcva4nfd2y2vp675zqgdg72y',
									label: 'Test',
								},
							},
							ongoingAccounts: {
								accounts: accounts,
							},
						},
						interactionId,
					}),
				)
				break
			case 'unauthorizedRequest':
				break
			case 'transaction':
				sendTransaction(interaction.items.send).then(transactionIntentHash =>
					browser.tabs.sendMessage(
						interaction.fromTabId,
						createRadixMessage.walletResponse(radixMessageSource.offScreen, {
							discriminator: 'success',
							items: {
								discriminator: 'transaction',
								send: {
									transactionIntentHash,
								},
							} as WalletTransactionResponseItems,
							interactionId,
						}),
					),
				)
				break
			default:
				console.error(`Unhandled wallet interaction: ${interaction.items.discriminator}`)
		}
	}

	return (
		<Box>
			<Input value={JSON.stringify(interaction)} elementType="textarea" type="text" disabled />
			<Button onClick={handleInteraction} styleVariant="tertiary" sizeVariant="xlarge" fullWidth disabled={isCanceled}>
				{isCanceled ? intl.formatMessage(messages.canceled) : intl.formatMessage(messages.interact)}
			</Button>
		</Box>
	)
}

export default Home
