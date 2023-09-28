import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type { WalletInteraction } from '@radixdlt/radix-dapp-toolkit'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Input } from 'ui/src/components/input'

import { getInteraction, removeInteraction } from '@src/radix/interaction'

const messages = defineMessages({
	authorize: {
		id: 'interaction.button_authorize',
		defaultMessage: 'Authorize',
	},
})

export const Home: React.FC = () => {
	const { interactionId } = useParams()
	const intl = useIntl()

	const [interaction, setInteraction] = useState<WalletInteraction | undefined>()

	useEffect(() => {
		if (!interactionId) return
		getInteraction(interactionId)
			.then(i => setInteraction(i))
			.then(() =>
				browser.runtime.sendMessage(
					createRadixMessage.sendMessageEventToDapp(radixMessageSource.offScreen, 'receivedByWallet', interactionId),
				),
			)
			.then(() => removeInteraction(interactionId))
	}, [interactionId])

	const handleAuthorize = () => {
		// https://github.com/radixdlt/wallet-sdk/blob/c4a8433a2b2357c4d28dcf36fe2810f0d5fe158e/lib/__tests__/wallet-sdk.spec.ts#L93
		browser.runtime.sendMessage(
			createRadixMessage.walletResponse(radixMessageSource.offScreen, {
				discriminator: 'success',
				items: {
					discriminator: 'authorizedRequest',
					auth: {
						discriminator: 'loginWithoutChallenge',
						persona: {},
					},
					ongoingAccounts: {
						accounts: [],
					},
				},
				interactionId,
			}),
		)
	}

	return (
		<Box>
			<Input value={JSON.stringify(interaction)} elementType="textarea" type="text" disabled />

			<Button onClick={handleAuthorize} styleVariant="tertiary" sizeVariant="xlarge" fullWidth>
				{intl.formatMessage(messages.authorize)}
			</Button>
		</Box>
	)
}

export default Home
