import { LTSRadixEngineToolkit } from '@radixdlt/radix-engine-toolkit'
import { useCallback } from 'react'

import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { type AddressBookEntry, CURVE, SCHEME } from 'ui/src/store/types'

import { buildAccountDerivationPath } from '@src/crypto/derivation_path'
import { useGetPublicKey } from '@src/hooks/use-get-public-key'

export const useAddAccount = () => {
	const networkId = useNetworkId()
	const getPublicKey = useGetPublicKey()

	const { accountIndexes, addressBook, addAccount, setAddressBookEntry } = useNoneSharedStore(state => ({
		accountIndexes: state.accountIndexes[networkId] || {},
		addressBook: state.addressBook[networkId] || {},
		addAccount: state.addAccountAction,
		setAddressBookEntry: state.setAddressBookEntryAction,
	}))

	const create = async (name: string = '') => {
		const idx =
			Math.max(
				-1,
				...Object.values(accountIndexes)
					.filter(account => account.scheme !== SCHEME.BIP440OLYMPIA)
					.map(account => account.entityIndex),
			) + 1
		const derivationPath = buildAccountDerivationPath(networkId, idx)
		const publicKey = await getPublicKey(CURVE.CURVE25519, derivationPath)
		const address = await LTSRadixEngineToolkit.Derive.virtualAccountAddress(publicKey, networkId)
		const entry = { ...(addressBook[address] || {}), name } as AddressBookEntry

		addAccount(networkId, address, {
			address,
			entityIndex: +idx,
			publicKeyHex: publicKey.hexString(),
			curve: CURVE.CURVE25519,
			scheme: SCHEME.CAP26,
			derivationPath,
		})
		if (name) setAddressBookEntry(networkId, address, entry)
	}

	return useCallback(create, [networkId, getPublicKey, accountIndexes, addressBook, addAccount, setAddressBookEntry])
}
