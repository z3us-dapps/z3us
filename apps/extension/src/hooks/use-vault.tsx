import browser from 'webextension-polyfill'
import { Mutex } from 'async-mutex'
import { useEffect, useState } from 'react'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'
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

export const useVault = () => {
	const { keystore, setMessanger } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
		setMessanger: state.setMessangerAction,
	}))
	const {
		signingKey,
		network,
		publicAddresses,
		networkIndex,
		accountIndex,
		setIsUnlocked,
		setSigningKey,
		setPublicAddresses,
	} = useAccountStore(state => ({
		signingKey: state.signingKey,
		network: state.networks[state.selectedNetworkIndex],
		publicAddresses: state.publicAddresses,
		networkIndex: state.selectedNetworkIndex,
		accountIndex: state.selectedAccountIndex,
		setIsUnlocked: state.setIsUnlockedAction,
		setSigningKey: state.setSigningKeyAction,
		setPublicAddresses: state.setPublicAddressesAction,
	}))

	const [time, setTime] = useState<number>(Date.now())

	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), refreshInterval)

		return () => {
			clearInterval(interval)
		}
	}, [])

	const derive = async (n?: Network, addresses?: { [key: number]: AddressBookEntry }) => {
		try {
			switch (keystore?.type) {
				case KeystoreType.HARDWARE:
					if (signingKey?.hw) {
						const newSigningKey = await createHardwareSigningKey(signingKey.hw, accountIndex)
						if (newSigningKey) setSigningKey(newSigningKey)
						setIsUnlocked(!!newSigningKey)
					}
					break
				case KeystoreType.LOCAL:
				default:
					// eslint-disable-next-line no-case-declarations
					const { publicKey, newPublicAddresses } = await messanger.sendActionMessageFromPopup(DERIVE, {
						index: accountIndex,
						network: n,
						publicAddresses: addresses,
					})
					if (publicKey) {
						const publicKeyBuffer = Buffer.from(publicKey, 'hex')
						const publicKeyResult = PublicKey.fromBuffer(publicKeyBuffer)
						if (!publicKeyResult.isOk()) throw publicKeyResult.error

						const newSigningKey = createLocalSigningKey(messanger, publicKey)
						setSigningKey(newSigningKey)
						setIsUnlocked(true)

						if (newPublicAddresses) {
							setPublicAddresses(newPublicAddresses)
						}
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

	const init = async () => {
		const release = await mutex.acquire()
		await derive()
		setMessanger(messanger)
		release()
	}

	useEffect(() => {
		init()
	}, [keystore])

	useEffect(() => {
		messanger.sendActionMessageFromPopup(PING, null)
	}, [time])

	useEffect(() => {
		derive()
	}, [accountIndex])

	useEffect(() => {
		derive(network, publicAddresses)
	}, [networkIndex])
}
