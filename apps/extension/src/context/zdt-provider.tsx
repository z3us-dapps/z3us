import type { Account, Persona } from '@radixdlt/radix-dapp-toolkit'
import { LTSRadixEngineToolkit, RadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import React, { type PropsWithChildren, useCallback, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import type { State } from 'ui/src/context/zdt'
import { ZdtContext } from 'ui/src/context/zdt'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { CURVE, SCHEME } from 'ui/src/store/types'

import { buildAccountDerivationPath, buildPersonaDerivationPath } from '@src/crypto/derivation_path'
import { useSendTransaction } from '@src/hooks/transaction/use-send'
import { useGetPublicKey } from '@src/hooks/use-get-public-key'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import { useMessageClient } from '@src/hooks/use-message-client'

const messages = defineMessages({
	unknown_account: {
		id: 'zdt_provider.unknown_account',
		defaultMessage: 'Account: {appearanceId}',
	},
	unknown_persona: {
		id: 'zdt_provider.unknown_persona',
		defaultMessage: `{hasLabel, select,
			true {{label}}
			other {Persona: {appearanceId}}
		}`,
	},
})

export const ZdtProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const client = useMessageClient()
	const getPublicKey = useGetPublicKey()
	const sendTransaction = useSendTransaction()
	const { isUnlocked } = useIsUnlocked()
	const { accountIndexes, personaIndexes, addressBook } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
		personaIndexes: state.personaIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
	}))

	const accounts = useMemo<Account[]>(
		() =>
			Object.keys(accountIndexes).map((address, appearanceId) => ({
				address,
				label: addressBook[address]?.name || intl.formatMessage(messages.unknown_account, { appearanceId }),
				appearanceId,
			})),
		[accountIndexes, addressBook],
	)

	const personas = useMemo<Persona[]>(
		() =>
			Object.keys(personaIndexes).map((address, appearanceId) => ({
				identityAddress: address,
				label: intl.formatMessage(messages.unknown_persona, {
					hasLabel: !!personaIndexes[address].label,
					label: personaIndexes[address].label,
					appearanceId,
				}),
				appearanceId,
			})),
		[personaIndexes],
	)

	const buildNewPersonKeyParts = useCallback(async () => {
		const idx = Math.max(-1, ...Object.values(personaIndexes).map(persona => persona.entityIndex)) + 1
		const derivationPath = buildPersonaDerivationPath(networkId, idx)
		const publicKey = await getPublicKey(CURVE.CURVE25519, derivationPath)
		const address = await RadixEngineToolkit.Derive.virtualIdentityAddressFromPublicKey(publicKey, networkId)
		const identityAddress = address.toString()

		return {
			entityIndex: +idx,
			identityAddress,
			publicKeyHex: publicKey.hexString(),
			curve: CURVE.CURVE25519,
			scheme: SCHEME.CAP26,
			derivationPath,
		}
	}, [personaIndexes])

	const buildNewAccountKeyParts = useCallback(
		async (legacy: boolean) => {
			const idx =
				Math.max(
					-1,
					...Object.values(accountIndexes)
						.filter(account => legacy === (account.scheme === SCHEME.BIP440OLYMPIA))
						.map(account => account.entityIndex),
				) + 1
			const derivationPath = buildAccountDerivationPath(networkId, idx)
			const publicKey = await getPublicKey(legacy ? CURVE.SECP256K1 : CURVE.CURVE25519, derivationPath)
			const address = await LTSRadixEngineToolkit.Derive.virtualAccountAddress(publicKey, networkId)

			return {
				address,
				entityIndex: +idx,
				publicKeyHex: publicKey.hexString(),
				curve: CURVE.CURVE25519,
				scheme: SCHEME.CAP26,
				derivationPath,
			}
		},
		[accountIndexes],
	)

	const ctx = useMemo(
		() =>
			({
				isWallet: true,
				isUnlocked,
				accounts,
				personas,
				sendTransaction,
				unlock: client.unlockVault,
				lock: client.lockVault,
				getSecret: client.getSecret,
				buildNewPersonKeyParts,
				buildNewAccountKeyParts,
			} as State),
		[isUnlocked, personas, accounts, sendTransaction],
	)

	return <ZdtContext.Provider value={ctx}>{children}</ZdtContext.Provider>
}
