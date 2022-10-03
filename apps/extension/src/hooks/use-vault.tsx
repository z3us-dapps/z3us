import browser from 'webextension-polyfill'
import { Mutex } from 'async-mutex'
import { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useSharedStore, useNoneSharedStore } from '@src/hooks/use-store'
import { MessageService, PORT_NAME } from '@src/services/messanger'
import { DERIVE, PING } from '@src/lib/v1/actions'
import { PublicKey } from '@radixdlt/crypto'
import { createHardwareSigningKey, createLocalSigningKey } from '@src/services/signing_key'
import { KeystoreType } from '@src/types'
import { AddressBookEntry, Network } from '@src/store/types'

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
			signingKey: state.signingKey,
			keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
			setMessanger: state.setMessangerAction,
			setIsUnlocked: state.setIsUnlockedAction,
			setSigningKey: state.setSigningKeyAction,
		}),
	)
	const { network, publicAddresses, networkIndex, accountIndex, setPublicAddresses } = useNoneSharedStore(state => ({
		network: state.networks[state.selectedNetworkIndex],
		publicAddresses: state.publicAddresses,
		networkIndex: state.selectedNetworkIndex,
		accountIndex: state.selectedAccountIndex,
		setPublicAddresses: state.setPublicAddressesAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		isMounted: false,
		time: Date.now(),
	})

	const derive = async (n?: Network, addresses?: { [key: number]: AddressBookEntry }) => {
		const release = await mutex.acquire()
		try {
			switch (keystore?.type) {
				case KeystoreType.HARDWARE:
					if (signingKey?.hw) {
						const newSigningKey = await createHardwareSigningKey(signingKey.hw, accountIndex)
						if (newSigningKey) setSigningKey(newSigningKey)
						setIsUnlocked(!!newSigningKey)
					} else {
						setIsUnlocked(false)
					}
					break
				case KeystoreType.LOCAL:
					// eslint-disable-next-line no-case-declarations
					const {
						keystoreId,
						publicKey,
						publicAddresses: newPublicAddresses,
						type,
					} = await messanger.sendActionMessageFromPopup(DERIVE, {
						index: accountIndex,
						network: n,
						publicAddresses: addresses,
					})
					if (publicKey && keystoreId === (keystore?.id || '')) {
						const publicKeyBuffer = Buffer.from(publicKey, 'hex')
						const publicKeyResult = PublicKey.fromBuffer(publicKeyBuffer)
						if (!publicKeyResult.isOk()) throw publicKeyResult.error

						const newSigningKey = createLocalSigningKey(messanger, publicKeyResult.value, type)
						setSigningKey(newSigningKey)
						setIsUnlocked(true)

						if (newPublicAddresses) {
							setPublicAddresses(newPublicAddresses)
						}
					} else {
						setIsUnlocked(false)
					}
					break
				default:
					throw new Error(`Unknown keystore ${keystore?.id} (${keystore?.name}) type: ${keystore?.type}`)
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
		release()
	}

	const init = async () => {
		await derive()
		setMessanger(messanger)
		setState(draft => {
			draft.isMounted = true
		})
	}

	useEffect(() => {
		const interval = setInterval(
			() =>
				setState(draft => {
					draft.time = Date.now()
				}),
			refreshInterval,
		)

		init()

		return () => {
			clearInterval(interval)
		}
	}, [])

	useEffect(() => {
		if (!state.isMounted) return
		messanger.sendActionMessageFromPopup(PING, null)
	}, [state.time])

	useEffect(() => {
		derive()
	}, [selectKeystoreId, accountIndex])

	useEffect(() => {
		if (!state.isMounted) return
		derive(network, publicAddresses)
	}, [networkIndex])
}
