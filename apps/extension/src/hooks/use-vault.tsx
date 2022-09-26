import browser from 'webextension-polyfill'
import { Mutex } from 'async-mutex'
import { useEffect, useState } from 'react'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'
import { MessageService, PORT_NAME } from '@src/services/messanger'
import { DERIVE } from '@src/lib/v1/actions'
import { PublicKey } from '@radixdlt/crypto'
import { createHardwareSigningKey, createLocalSigningKey } from '@src/services/signing_key'
import { KeystoreType } from '@src/types'

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
	const { signingKey, networkIndex, accountIndex, derivedAccountIndex, unlock, setSigningKey } = useAccountStore(
		state => ({
			signingKey: state.signingKey,
			derivedAccountIndex: state.derivedAccountIndex,
			networkIndex: state.selectedNetworkIndex,
			accountIndex: state.selectedAccountIndex,
			unlock: state.setIsUnlockedAction,
			setSigningKey: state.setSigningKeyAction,
		}),
	)

	const [time, setTime] = useState<number>(Date.now())

	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), refreshInterval)

		return () => {
			clearInterval(interval)
		}
	}, [])

	const derive = async () => {
		try {
			switch (keystore?.type) {
				case KeystoreType.HARDWARE:
					if (signingKey) {
						const newSigningKey = await createHardwareSigningKey(signingKey.hw, derivedAccountIndex)
						setSigningKey(newSigningKey)
					} else {
						setSigningKey(null)
					}
					unlock(true)
					break
				case KeystoreType.LOCAL:
				default:
					// eslint-disable-next-line no-case-declarations
					const { publicKey } = await messanger.sendActionMessageFromPopup(DERIVE, { index: derivedAccountIndex })
					if (publicKey) {
						const publicKeyBuffer = Buffer.from(publicKey, 'hex')
						const publicKeyResult = PublicKey.fromBuffer(publicKeyBuffer)
						if (!publicKeyResult.isOk()) throw publicKeyResult.error

						const newSigningKey = createLocalSigningKey(messanger, publicKey)
						setSigningKey(newSigningKey)
						unlock(true)
					} else {
						setSigningKey(null)
						unlock(false)
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
		derive()
	}, [accountIndex, time])

	useEffect(() => {
		setSigningKey(signingKey)
	}, [networkIndex])
}
