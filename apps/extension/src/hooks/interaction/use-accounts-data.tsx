import type { AccountProof, AccountsRequestItem } from '@radixdlt/radix-dapp-toolkit'
import { defineMessages, useIntl } from 'react-intl'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { getDAppDataToSign, proofCurve, signatureWithPublicKeyToJSON } from '@src/crypto/signature'
import { useMessageClient } from '@src/hooks/use-message-client'
import { useSignModal } from '@src/hooks/use-sign-modal'

const messages = defineMessages({
	account_challenge: {
		id: 'hooks.interaction.accounts_data.account_challenge',
		defaultMessage: 'To confirm ownership, sign challenge with account {label}',
	},
	unknown_account: {
		id: 'hooks.interaction.accounts_data.unknown_account',
		defaultMessage: 'Selected account: {appearanceId}',
	},
})

export const useAccountsData = () => {
	const intl = useIntl()
	const client = useMessageClient()
	const networkId = useNetworkId()
	const confirm = useSignModal()

	const { accountIndexes, addressBook } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
	}))

	const buildAccounts = async (selectedAccounts: number[], req?: AccountsRequestItem, metadata?: any) => {
		if (!req) return undefined

		const { challenge } = req
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
						getDAppDataToSign(challenge, metadata.origin, metadata.dAppDefinitionAddress),
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

	return buildAccounts
}
