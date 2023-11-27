import { LTSRadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { CURVE, SCHEME } from 'ui/src/store/types'
import type { Account, AddressBookEntry } from 'ui/src/store/types'

import { buildAccountDerivationPath, buildOlympiaDerivationPath } from '@src/crypto/derivation_path'
import { useGetPublicKey } from '@src/hooks/use-get-public-key'

export const useBuildNewAccountKeyParts = () => {
	const networkId = useNetworkId()
	const getPublicKey = useGetPublicKey()
	const { accountIndexes } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
	}))

	const buildNewAccountKeyParts = useCallback(
		async (combinedKeystoreId: string, legacy: boolean) => {
			const idx =
				Math.max(
					-1,
					...Object.values(accountIndexes)
						.filter(account => legacy === (account.scheme === SCHEME.BIP440OLYMPIA))
						.map(account => account.entityIndex),
				) + 1
			const derivationPath = legacy ? buildOlympiaDerivationPath(idx) : buildAccountDerivationPath(networkId, idx)
			const curve = legacy ? CURVE.SECP256K1 : CURVE.CURVE25519
			const scheme = legacy ? SCHEME.BIP440OLYMPIA : SCHEME.CAP26
			const publicKey = await getPublicKey(curve, derivationPath, combinedKeystoreId)
			const address = await LTSRadixEngineToolkit.Derive.virtualAccountAddress(publicKey, networkId)

			return {
				address,
				entityIndex: +idx,
				publicKeyHex: publicKey.hexString(),
				curve,
				scheme,
				derivationPath,
				combinedKeystoreId,
			}
		},
		[networkId, accountIndexes, getPublicKey],
	)

	return buildNewAccountKeyParts
}

export const useAddAccount = () => {
	const networkId = useNetworkId()
	const buildNewAccountKeyParts = useBuildNewAccountKeyParts()

	const { addressBook, addAccount, setAddressBookEntry } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
		addAccount: state.addAccountAction,
		setAddressBookEntry: state.setAddressBookEntryAction,
	}))

	const create = async (combinedKeystoreId: string, name: string = '', isLegacy: boolean = false) => {
		const keyParts = await buildNewAccountKeyParts(combinedKeystoreId, isLegacy)
		addAccount(networkId, keyParts.address, keyParts as Account)
		if (name) {
			const entry = { ...(addressBook[keyParts.address] || {}), name } as AddressBookEntry
			setAddressBookEntry(networkId, keyParts.address, entry)
		}
		return keyParts.address
	}

	return useCallback(create, [networkId, addressBook, addAccount, setAddressBookEntry, buildNewAccountKeyParts])
}
