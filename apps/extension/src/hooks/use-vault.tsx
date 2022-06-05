import browser from 'webextension-polyfill'
import { useEffect, useState } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { HDMasterSeed } from '@radixdlt/crypto'
import { MessageService, PORT_NAME } from '@src/services/messanger'
import { GET } from '@src/lib/actions'

const messanger = new MessageService('extension', browser.runtime.connect({ name: PORT_NAME }), null)

const refreshInterval = 60 * 1000 // 1 minute

export const useVault = () => {
	const { setMessanger, setMasterSeed, removeKeystore } = useSharedStore(state => ({
		setMessanger: state.setMessangerAction,
		setMasterSeed: state.setMasterSeedAction,
		removeKeystore: state.removeKeystoreAction,
	}))
	const { networkIndex, accountIndex, selectAccount } = useStore(state => ({
		networkIndex: state.selectedNetworkIndex,
		accountIndex: state.selectedAccountIndex,
		selectAccount: state.selectAccountAction,
	}))

	const [time, setTime] = useState(Date.now())

	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), refreshInterval)

		return () => {
			clearInterval(interval)
		}
	}, [])

	const init = async () => {
		try {
			const { seed, hasKeystore, keystoreId } = await messanger.sendActionMessageFromPopup(GET, null)
			if (!hasKeystore && keystoreId) {
				removeKeystore(keystoreId)
			}
			if (seed) {
				const masterSeed = HDMasterSeed.fromSeed(Buffer.from(seed, 'hex'))
				await setMasterSeed(masterSeed)
				await selectAccount(accountIndex, null, masterSeed)
			}
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			window.location.reload()
		}
		setMessanger(messanger)
	}

	useEffect(() => {
		init()
	}, [])

	useEffect(() => {
		const load = async () => {
			try {
				await messanger.sendActionMessageFromPopup(GET, null) // extend session
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
				window.location.reload()
			}
		}

		load()
	}, [networkIndex, accountIndex, time])
}
