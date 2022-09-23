import browser from 'webextension-polyfill'
import { Mutex } from 'async-mutex'
import { useEffect, useState } from 'react'
import { useSharedStore, useAccountStore } from '@src/hooks/use-store'
import { HDMasterSeed } from '@radixdlt/crypto'
import { MessageService, PORT_NAME } from '@src/services/messanger'
import { GET } from '@src/lib/v1/actions'
import { KeystoreType } from '@src/store/types'

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
	const { keystore, hw, seed, setMessanger, setSeed, unlockHW } = useSharedStore(state => ({
		hw: state.hardwareWallet,
		seed: state.masterSeed,
		keystore: state.keystores.find(({ id }) => id === state.selectKeystoreId),
		setMessanger: state.setMessangerAction,
		setSeed: state.setMasterSeedAction,
		unlockHW: state.unlockHardwareWalletAction,
	}))
	const { networkIndex, accountIndex, selectAccount } = useAccountStore(state => ({
		networkIndex: state.selectedNetworkIndex,
		accountIndex: state.selectedAccountIndex,
		selectAccount: state.selectAccountAction,
	}))

	const [time, setTime] = useState<number>(Date.now())

	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), refreshInterval)

		return () => {
			clearInterval(interval)
		}
	}, [])

	const init = async () => {
		const release = await mutex.acquire()
		try {
			switch (keystore?.type) {
				case KeystoreType.HARDWARE:
					unlockHW()
					break
				case KeystoreType.LOCAL:
				default:
					// eslint-disable-next-line no-case-declarations
					const { seed: newSeed } = await messanger.sendActionMessageFromPopup(GET, null)
					if (newSeed) {
						setSeed(HDMasterSeed.fromSeed(Buffer.from(newSeed, 'hex')))
					}
					break
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
		setMessanger(messanger)
		release()
	}

	useEffect(() => {
		init()
	}, [keystore])

	useEffect(() => {
		if (seed || hw) {
			selectAccount(accountIndex, null, seed)
		}
	}, [seed, hw])

	useEffect(() => {
		const load = async () => {
			try {
				await messanger.sendActionMessageFromPopup(GET, null) // extend session
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		}

		load()
	}, [networkIndex, accountIndex, time])
}
