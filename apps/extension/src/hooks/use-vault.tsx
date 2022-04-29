import browser from 'webextension-polyfill'
import { useEffect } from 'react'
import { useStore } from '@src/store'
import { HDMasterSeed } from '@radixdlt/crypto'
import { MessageService, PORT_NAME } from '@src/services/messanger'
import { GET } from '@src/lib/actions'

const messanger = new MessageService(
	'extension',
	browser?.runtime?.connect ? browser.runtime.connect({ name: PORT_NAME }) : null,
	browser?.runtime?.connect ? null : window,
)

export const useVault = () => {
	const { networkIndex, accountIndex, setMasterSeed, setHasKeystore, setMessanger } = useStore(state => ({
		networkIndex: state.selectedNetworkIndex,
		accountIndex: state.selectedAccountIndex,
		setMasterSeed: state.setMasterSeedAction,
		setHasKeystore: state.setHasKeystoreAction,
		setMessanger: state.setMessangerAction,
		setPublicAddresses: state.setPublicAddressesAction,
	}))

	useEffect(() => {
		const load = async () => {
			try {
				const { seed, hasKeystore } = await messanger.sendActionMessageFromPopup(GET, null)
				setHasKeystore(hasKeystore)
				if (seed) {
					setMasterSeed(HDMasterSeed.fromSeed(Buffer.from(seed, 'hex')))
				}
			} catch (error: unknown) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
			setMessanger(messanger)
		}

		load()
	}, [])

	useEffect(() => {
		const load = async () => {
			try {
				await messanger.sendActionMessageFromPopup(GET, null) // extend session
			} catch (error: unknown) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		}

		load()
	}, [networkIndex, accountIndex])
}
