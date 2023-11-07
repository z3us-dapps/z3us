import { messageLifeCycleEvent } from '@radixdlt/connector-extension/src/chrome/dapp/_types'
import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Close2Icon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'

import { MessageAction, type WalletInteractionWithTabId } from '@src/browser/app/types'
import type { Z3USEvent } from '@src/browser/messages/types'
import { getInteraction, removeInteraction } from '@src/radix/interaction'

import { DappDetails } from './components/dapp-details'
import { Interaction } from './components/interaction'
import { NetworkAlert } from './components/network-alert'
import * as styles from './styles.css'

const messages = defineMessages({
	close_interaction_popup: {
		defaultMessage: 'Cancel and close',
		id: 'USNAc7',
	},
	canceled: {
		id: '3JFSJ0',
		defaultMessage: 'Request canceled',
	},
	close_window_button: {
		defaultMessage: 'Close',
		id: 'rbrahO',
	},
})

export const Home: React.FC = () => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const [interaction, setInteraction] = useState<WalletInteractionWithTabId | undefined>()

	const [isCanceled, setIsCanceled] = useState<boolean>(false)

	const handleCloseWindow = () => {
		window.close()
	}

	const handleCancelAndClose = () => {
		browser.tabs
			.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					walletResponse: {
						discriminator: 'failure',
						error: 'Canceled',
						interactionId,
					},
					metadata: interaction.metadata,
				}),
			)
			.finally(() => window.close())
	}

	useEffect(() => {
		if (!interaction) return () => {}

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
						{ interactionId, metadata: interaction.metadata },
					),
				)
			} else {
				browser.tabs.sendMessage(
					interaction.fromTabId,
					createRadixMessage.sendMessageEventToDapp(
						radixMessageSource.offScreen,
						messageLifeCycleEvent.requestCancelFail,
						{ interactionId, metadata: interaction?.metadata },
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
		if (interaction) return

		getInteraction(interactionId)
			.then(i => {
				setInteraction(i)
				return browser.tabs.sendMessage(
					i.fromTabId,
					createRadixMessage.sendMessageEventToDapp(
						radixMessageSource.offScreen,
						messageLifeCycleEvent.receivedByWallet,
						{ interactionId, metadata: interaction?.metadata },
					),
				)
			})
			.then(() => removeInteraction(interactionId))
	}, [interactionId])

	return (
		<Box className={styles.interactionWrapper}>
			<Box className={styles.interactionInnerWrapper}>
				{!isCanceled && <Interaction interaction={interaction} />}
				{isCanceled && (
					<Box>
						<DappDetails {...interaction?.metadata} />
						<NetworkAlert {...interaction?.metadata} />
						<Box className={styles.interactionCancelledWrapper}>
							<Box>
								<Text size="small">{intl.formatMessage(messages.canceled)}</Text>
							</Box>
							<Box className={styles.interactionCancelledButtonWrapper}>
								<Button fullWidth styleVariant="secondary" sizeVariant="xlarge" onClick={handleCloseWindow}>
									{intl.formatMessage(messages.close_window_button)}
								</Button>
							</Box>
						</Box>
					</Box>
				)}
			</Box>
			<Box className={styles.interactionCloseButtonWrapper}>
				<ToolTip message={intl.formatMessage(messages.close_interaction_popup)}>
					<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={handleCancelAndClose}>
						<Close2Icon />
					</Button>
				</ToolTip>
			</Box>
		</Box>
	)
}

export default Home
