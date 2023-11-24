/* eslint-disable no-case-declarations */
import type { AccountProof, AccountsRequestItem } from '@radixdlt/radix-dapp-toolkit'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore, useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { getDAppDataToSign, proofCurve, signatureWithPublicKeyToJSON } from '@src/crypto/signature'
import { usePasswordModal } from '@src/hooks/modal/use-password-modal'
import { useMessageClient } from '@src/hooks/use-message-client'

import { useLedgerClient } from '../use-ledger-client'

const messages = defineMessages({
	account_challenge: {
		id: 'A4qogS',
		defaultMessage: 'To confirm ownership of selected accounts, signature is required',
	},
	unknown_account: {
		id: '+pIb7B',
		defaultMessage: 'Selected account: {appearanceId}',
	},
})

export const useAccountsData = () => {
	const intl = useIntl()
	const client = useMessageClient()
	const ledger = useLedgerClient()
	const networkId = useNetworkId()
	const confirm = usePasswordModal()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))
	const { accountIndexes, addressBook } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
	}))

	const sign = useCallback(
		async (
			needSignaturesFrom: string[],
			challenge: string,
			metadata: { origin: string; dAppDefinitionAddress: string },
		): Promise<AccountProof[]> => {
			switch (keystore?.type) {
				case KeystoreType.LOCAL:
					const password = await confirm({ content: intl.formatMessage(messages.account_challenge) })
					return Promise.all<AccountProof>(
						needSignaturesFrom.map(async address => {
							const signatureWithPublicKey = await client.signToSignatureWithPublicKey(
								accountIndexes[address].curve,
								accountIndexes[address].derivationPath,
								password,
								getDAppDataToSign(challenge, metadata.origin, metadata.dAppDefinitionAddress),
							)
							const signature = signatureWithPublicKeyToJSON(signatureWithPublicKey)

							return {
								accountAddress: address,
								proof: {
									signature: signature.signature,
									publicKey: signature.publicKey,
									curve: proofCurve(signature.curve),
								},
							}
						}),
					)
				case KeystoreType.HARDWARE:
					const response = await ledger.signChallenge(
						needSignaturesFrom.map(address => accountIndexes[address]),
						challenge,
						metadata,
					)
					return response.map((signature, idx) => ({
						accountAddress: needSignaturesFrom[idx],
						proof: {
							signature: signature.signature,
							publicKey: signature.derivedPublicKey.publicKey,
							curve: signature.derivedPublicKey.curve,
						},
					}))
				default:
					throw new Error(`Can not sign with keystore type: ${keystore?.type}`)
			}
		},
		[keystore, client, ledger, accountIndexes, intl, confirm],
	)

	const buildAccounts = useCallback(
		async (selectedAccounts: string[], req?: AccountsRequestItem, metadata?: any) => {
			if (!req) return undefined

			const { challenge } = req
			let proofs: AccountProof[]
			if (challenge) {
				proofs = await sign(selectedAccounts, challenge, metadata)
			}

			const accounts = selectedAccounts.map((idx, appearanceId) => ({
				address: accountIndexes[idx].address,
				label:
					addressBook[accountIndexes[idx].address]?.name ||
					intl.formatMessage(messages.unknown_account, { appearanceId }),
				appearanceId,
			}))

			return { accounts, challenge, proofs }
		},
		[sign, accountIndexes, addressBook, intl],
	)

	return buildAccounts
}
