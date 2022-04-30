import browser from 'webextension-polyfill'
import { useEffect } from 'react'
import { useStore } from '@src/store'
import { HDMasterSeed } from '@radixdlt/crypto'
import { MessageService, PORT_NAME } from '@src/services/messanger'
import { GET } from '@src/lib/actions'

const messanger = new MessageService('extension', browser.runtime.connect({ name: PORT_NAME }), null)

export const useVault = () => {
	const { networkIndex, accountIndex, setMasterSeed, setHasKeystore, setMessanger } = useStore(state => ({
		networkIndex: state.selectedNetworkIndex,
		accountIndex: state.selectedAccountIndex,
		setMasterSeed: state.setMasterSeedAction,
		setHasKeystore: state.setHasKeystoreAction,
		setMessanger: state.setMessangerAction,
	}))

	useEffect(() => {
		const load = async () => {
			try {
				const { seed, hasKeystore } = await messanger.sendActionMessageFromPopup(GET, null)
				setHasKeystore(hasKeystore)
				if (seed) {
					await setMasterSeed(HDMasterSeed.fromSeed(Buffer.from(seed, 'hex')))
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
				window.location.reload()
			}
			setMessanger(messanger)
		}

		load()
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
	}, [networkIndex, accountIndex])
}
