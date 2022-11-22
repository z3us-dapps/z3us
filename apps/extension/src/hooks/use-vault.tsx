import browser from 'webextension-polyfill'
import { Mutex } from 'async-mutex'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useSharedStore, useNoneSharedStore } from '@src/hooks/use-store'
import { MessageService, PORT_NAME } from '@src/services/messanger'
import { DERIVE, PING } from '@src/lib/v1/actions'
import { PublicKey } from '@radixdlt/crypto'
import { createHardwareSigningKey, createLocalSigningKey } from '@src/services/signing-key'
import { KeystoreType, SigningKey } from '@src/types'
import { AddressBookEntry, Network } from '@src/store/types'
import { AccountAddress } from '@radixdlt/account'
import { getDefaultAddressEntry } from '@src/store/helpers'

const mutex = new Mutex()
const messanger = new MessageService('extension', null, null)

const connectNewPort = () => {
	const port = browser.runtime.connect({ name: PORT_NAME })
	port.onDisconnect.addListener(() => {
		if (port.error) {
			// eslint-disable-next-line no-console
			console.error(`Disconnected due to an error: ${port.error.message}`)
		}
		connectNewPort()
	})

	messanger.initPort(port)
}

connectNewPort()

const refreshInterval = 60 * 1000 // 1 minute

interface ImmerT {
	isMounted: boolean
	time: number
}

export const useVault = () => {
	const { signingKey, selectKeystoreId, keystore, setMessanger, setIsUnlocked, setSigningKey } = useSharedStore(
		state => ({
			selectKeystoreId: state.selectKeystoreId,
			keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
			isUnlocked: state.isUnlocked,
			signingKey: state.signingKey,
			setMessanger: state.setMessangerAction,
			setIsUnlocked: state.setIsUnlockedAction,
			setSigningKey: state.setSigningKeyAction,
		}),
	)
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
		isMounted: false,
		time: Date.now(),
	})

	const addNewAddressEntry = (index: number, newSigningKey: SigningKey) => {
		if (accountIndex >= Object.keys(publicAddresses).length) {
			const address = AccountAddress.fromPublicKeyAndNetwork({
				publicKey: newSigningKey.publicKey,
				network: network.id,
			})
			addPublicAddress(index, {
				...getDefaultAddressEntry(index),
				...publicAddresses[index],
				address: address.toString(),
			})
		}
	}

	const derive = async (n?: Network, addresses?: { [key: number]: AddressBookEntry }) => {
		const release = await mutex.acquire()

		let index = 0
		const publicIndexes = Object.keys(publicAddresses)
		if (publicIndexes.length > 0) {
			if (accountIndex < publicIndexes.length) {
				index = +publicIndexes[accountIndex]
			} else {
				index = +publicIndexes[publicIndexes.length - 1] + 1
			}
		}

		const derivePayload = {
			index,
			network: n,
			publicAddresses: addresses,
		}

		try {
			switch (keystore?.type) {
				case KeystoreType.HARDWARE:
					if (signingKey?.hw) {
						const newSigningKey = await createHardwareSigningKey(signingKey.hw, accountIndex)
						if (newSigningKey) {
							setSigningKey(newSigningKey)
							addNewAddressEntry(index, newSigningKey)
						}
						setIsUnlocked(!!newSigningKey)
					} else {
						const { keystoreId, isUnlocked: isUnlockedBackground } = await messanger.sendActionMessageFromPopup(
							DERIVE,
							derivePayload,
						)
						setIsUnlocked(keystoreId === keystore?.id && isUnlockedBackground)
					}
					break
				case KeystoreType.LOCAL:
					// eslint-disable-next-line no-case-declarations
					const {
						isUnlocked: isUnlockedBackground,
						keystoreId,
						publicKey,
						publicAddresses: newPublicAddresses,
						type,
					} = await messanger.sendActionMessageFromPopup(DERIVE, derivePayload)

					// for the legacy purpose we need to handle empty string for keystore id with local wallet
					if (publicKey && keystoreId === selectKeystoreId) {
						const publicKeyBuffer = Buffer.from(publicKey, 'hex')
						const publicKeyResult = PublicKey.fromBuffer(publicKeyBuffer)
						if (!publicKeyResult.isOk()) throw publicKeyResult.error

						const newSigningKey = createLocalSigningKey(messanger, publicKeyResult.value, type)
						setSigningKey(newSigningKey)
						if (newPublicAddresses) {
							setPublicAddresses(newPublicAddresses)
						} else {
							addNewAddressEntry(index, newSigningKey)
						}
						setIsUnlocked(isUnlockedBackground)
					} else {
						setIsUnlocked(false)
					}
					break
				default:
					break
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}

		release()
	}

	useEffect(() => {
		const init = async () => {
			await derive()
			if (state.isMounted) return
			setState(draft => {
				draft.isMounted = true
			})
			setMessanger(messanger)
		}
		init()
	}, [selectKeystoreId, accountIndex, Object.keys(publicAddresses).length])

	useEffect(() => {
		if (!state.isMounted) return
		derive(network, publicAddresses)
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
		if (!state.isMounted) return
		messanger.sendActionMessageFromPopup(PING, null)
	}, [state.time])
}
