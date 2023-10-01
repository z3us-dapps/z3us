import { messageSource as radixMessageSource } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import { createMessage as createRadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/create-message'
import type {
	AccountProof,
	AccountsRequestItem,
	PersonaDataRequestItem,
	PersonaDataRequestResponseItem,
	WalletUnauthorizedRequestItems,
} from '@radixdlt/radix-dapp-toolkit'
import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import type { WalletInteractionWithTabId } from '@src/browser/app/types'
import { getDAppDataToSign, proofCurve, signatureWithPublicKeyToJSON } from '@src/crypto/signature'
import { useMessageClient } from '@src/hooks/use-message-client'
import { useSelectAccountsModal } from '@src/hooks/use-select-accounts-modal'
import { useSignModal } from '@src/hooks/use-sign-modal'

const messages = defineMessages({
	select: {
		id: 'interaction.home.unauthorized_request_interaction.select',
		defaultMessage: 'Select accounts',
	},
	share: {
		id: 'interaction.home.unauthorized_request_interaction.share',
		defaultMessage: 'Share',
	},
	account_challenge: {
		id: 'interaction.home.unauthorized_request_interaction.account_challenge',
		defaultMessage: 'To confirm ownership, sign challenge with account {label}',
	},
	unknown_account: {
		id: 'interaction.home.unauthorized_request_interaction.unknown_account',
		defaultMessage: 'Selected account: {appearanceId}',
	},
})

interface IProps {
	interaction: WalletInteractionWithTabId
}

export const UnauthorizedRequestInteraction: React.FC<IProps> = ({ interaction }) => {
	const { interactionId } = useParams()
	const intl = useIntl()
	const client = useMessageClient()
	const networkId = useNetworkId()
	const confirm = useSignModal()
	const selectAccounts = useSelectAccountsModal()

	const { accountIndexes, addressBook } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
	}))

	const request = interaction.items as WalletUnauthorizedRequestItems

	const [selectedAccounts, setSelectedAccounts] = useState<number[]>([])

	const handleSelectAccounts = async () => {
		if (!request.oneTimeAccounts) return
		const { numberOfAccounts } = request.oneTimeAccounts as AccountsRequestItem
		const indexes = await selectAccounts(numberOfAccounts.quantity, numberOfAccounts.quantifier === 'exactly')
		if (indexes?.length > 0) {
			setSelectedAccounts(indexes)
		}
	}

	const buildAccounts = async (req: AccountsRequestItem) => {
		if (!req) return undefined

		const { challenge } = req as AccountsRequestItem
		let proofs: AccountProof[]
		if (challenge) {
			proofs = await Promise.all<AccountProof>(
				selectedAccounts.map(async (idx, appearanceId) => {
					const label =
						addressBook[accountIndexes[idx].address]?.name ||
						intl.formatMessage(messages.unknown_account, { appearanceId })
					const password = await confirm(intl.formatMessage(messages.account_challenge, { label }))
					const signatureWithPublicKey = await client.signToSignatureWithPublicKey(
						'account',
						password,
						getDAppDataToSign(
							challenge,
							(interaction.metadata as any).origin,
							interaction.metadata.dAppDefinitionAddress,
						),
						idx,
					)
					const signature = signatureWithPublicKeyToJSON(signatureWithPublicKey)

					return {
						accountAddress: accountIndexes[idx].address,
						proof: {
							signature: signature.signature,
							publicKey: signature.publicKey,
							curve: proofCurve(signature.curve),
						},
					}
				}),
			)
			proofs = proofs.filter(proof => proof !== null)
		}

		const accounts = selectedAccounts.map((idx, appearanceId) => ({
			address: accountIndexes[idx].address,
			label:
				addressBook[accountIndexes[idx].address]?.name ||
				intl.formatMessage(messages.unknown_account, { appearanceId }),
			appearanceId,
		}))

		return { accounts, challenge, proofs }
	}

	const buildPersonaData = async (
		req?: PersonaDataRequestItem,
	): Promise<PersonaDataRequestResponseItem | undefined> => {
		if (!req) {
			return undefined
		}
		throw new Error('Not implemented reset')
	}

	const handleShare = async () => {
		browser.tabs
			.sendMessage(
				interaction.fromTabId,
				createRadixMessage.walletResponse(radixMessageSource.offScreen, {
					discriminator: 'success',
					items: {
						discriminator: 'unauthorizedRequest',
						oneTimeAccounts: await buildAccounts(request.oneTimeAccounts),
						oneTimePersonaData: await buildPersonaData(request.oneTimePersonaData),
					},
					interactionId,
				}),
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

	if (interaction.items.discriminator !== 'unauthorizedRequest') {
		return null
	}

	return (
		<Box>
			<Button onClick={handleSelectAccounts} styleVariant="tertiary" sizeVariant="xlarge" fullWidth>
				{intl.formatMessage(messages.select)}
			</Button>
			<Text>{`Selected: ${selectedAccounts.length} accounts`}</Text>
			<Button
				onClick={handleShare}
				styleVariant="tertiary"
				sizeVariant="xlarge"
				fullWidth
				disabled={selectedAccounts.length === 0}
			>
				{intl.formatMessage(messages.share)}
			</Button>
		</Box>
	)
}
