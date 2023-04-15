/* eslint-disable no-case-declarations */
import { AccountAddress } from '@radixdlt/account'
import { PublicKey } from '@radixdlt/crypto'
import { Mutex } from 'async-mutex'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'

import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import { DERIVE, DERIVE_ALL, PING } from '@src/lib/v1/actions'
import { MessageService } from '@src/services/messanger'
import { createHardwareSigningKey, createLocalSigningKey } from '@src/services/signing-key'
import { getDefaultAddressEntry } from '@src/store/helpers'
import { Network } from '@src/store/types'
import { KeystoreType, SigningKey } from '@src/types'

const mutex = new Mutex()

const refreshInterval = 60 * 1000 // 1 minute

interface ImmerT {
	time: number
}

export const useVault = (messanger: MessageService) => {
	const { signingKey, selectKeystoreId, setIsUnlocked, setSigningKey } = useSharedStore(state => ({
		selectKeystoreId: state.selectKeystoreId,
		signingKey: state.signingKey,
		setIsUnlocked: state.setIsUnlockedAction,
		setSigningKey: state.setSigningKeyAction,
	}))

	const { network, publicAddresses, networkIndex, accountIndex, addPublicAddress, setPublicAddresses } =
		useNoneSharedStore(state => ({
			network: state.networks[state.selectedNetworkIndex],
			publicAddresses: state.publicAddresses,
			networkIndex: state.selectedNetworkIndex,
			accountIndex: state.selectedAccountIndex,
			addPublicAddress: state.addPublicAddressAction,
			setPublicAddresses: state.setPublicAddressesAction,
		}))

	const [state, setState] = useImmer<ImmerT>({
		time: Date.now(),
	})

	const addOrUpdateAddressEntry = (index: number, n: Network, newSigningKey: SigningKey) => {
		const address = AccountAddress.fromPublicKeyAndNetwork({
			publicKey: newSigningKey.publicKey,
			network: n.id,
		})
		addPublicAddress(index, {
			...getDefaultAddressEntry(index),
			...publicAddresses[index],
			address: address.toString(),
		})
	}

	const derive = async (all: boolean = false) => {
		const release = await mutex.acquire()

		const action = all ? DERIVE_ALL : DERIVE
		const {
			isUnlocked: isUnlockedBackground,
			keystoreId,
			keystore,
			publicKey,
			publicAddresses: newPublicAddresses,
			signingKeyType,
			derivedNetwork,
			derivedIndex,
		} = await messanger.sendActionMessageFromPopup(action, null)

		if (keystoreId === selectKeystoreId) {
			try {
				switch (keystore?.type) {
					case KeystoreType.HARDWARE:
						if (signingKey?.hw) {
							const newSigningKey = await createHardwareSigningKey(signingKey.hw, derivedIndex)
							if (newSigningKey) {
								setSigningKey(newSigningKey)
								addOrUpdateAddressEntry(derivedIndex, network, newSigningKey)
							}
							setIsUnlocked(!!newSigningKey)
						} else {
							setIsUnlocked(isUnlockedBackground)
						}
						break
					case KeystoreType.LOCAL:
					// fallthrough
					default:
						// for the legacy purpose we need to handle empty string for keystore id with local wallet
						if (publicKey) {
							const publicKeyBuffer = Buffer.from(publicKey, 'hex')
							const publicKeyResult = PublicKey.fromBuffer(publicKeyBuffer)
							if (!publicKeyResult.isOk()) throw publicKeyResult.error

							const newSigningKey = createLocalSigningKey(messanger, publicKeyResult.value, signingKeyType)
							setSigningKey(newSigningKey)
							if (newPublicAddresses) {
								setPublicAddresses(newPublicAddresses)
							} else {
								addOrUpdateAddressEntry(derivedIndex, derivedNetwork, newSigningKey)
							}
							setIsUnlocked(isUnlockedBackground)
						} else {
							setIsUnlocked(false)
						}
						break
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		}

		release()
	}

	useEffect(() => {
		if (!messanger) return
		derive()
	}, [selectKeystoreId, accountIndex, Object.keys(publicAddresses).length])

	useEffect(() => {
		if (!messanger) return
		derive(true)
	}, [networkIndex])

	useEffect(() => {
		const interval = setInterval(
			() =>
				setState(draft => {
					draft.time = Date.now()
				}),
			refreshInterval,
		)

		return () => {
			clearInterval(interval)
		}
	}, [])

	useEffect(() => {
		if (!messanger) return
		messanger.sendActionMessageFromPopup(PING, null)
	}, [state.time])
}
