import { messageLifeCycleEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import { MessageAction, type WalletInteractionWithTabId } from '@src/browser/app/types'
import type { Z3USEvent } from '@src/browser/messages/types'
import { getInteraction, removeInteraction } from '@src/radix/interaction'

import { DappDetails } from './components/dapp-details'
import { Interaction } from './components/interaction'
import { NetworkAlert } from './components/network-alert'

const messages = defineMessages({
	canceled: {
		id: '3JFSJ0',
		defaultMessage: 'Request canceled',
	},
})

export const Home: React.FC = () => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const [interaction, setInteraction] = useState<WalletInteractionWithTabId | undefined>()

	const [isCanceled, setIsCanceled] = useState<boolean>(false)

	useEffect(() => {
		const listener = (event: Z3USEvent) => {
			const { detail } = event
			const { data: message } = detail

			if (interaction && message?.interactionId === interaction.interactionId) {
				setIsCanceled(true)
				browser.tabs.sendMessage(
					interaction.fromTabId,
					createRadixMessage.sendMessageEventToDapp(
						radixMessageSource.offScreen,
						messageLifeCycleEvent.requestCancelSuccess,
						interactionId,
					),
				)
			} else {
				browser.tabs.sendMessage(
					interaction.fromTabId,
					createRadixMessage.sendMessageEventToDapp(
						radixMessageSource.offScreen,
						messageLifeCycleEvent.requestCancelFail,
						interactionId,
					),
				)
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
			.then(i => {
				setInteraction(i)
				return browser.tabs.sendMessage(
					i.fromTabId,
					createRadixMessage.sendMessageEventToDapp(
						radixMessageSource.offScreen,
						messageLifeCycleEvent.receivedByWallet,
						interactionId,
					),
				)
			})
			.then(() => removeInteraction(interactionId))
	}, [interactionId])

	return (
		<Box display="flex" flexDirection="column" gap="large">
			<DappDetails {...interaction?.metadata} />
			<NetworkAlert {...interaction?.metadata} />

			{!isCanceled && <Interaction interaction={interaction} />}
			{isCanceled && <Text>{intl.formatMessage(messages.canceled)}</Text>}
		</Box>
	)
}

export default Home
