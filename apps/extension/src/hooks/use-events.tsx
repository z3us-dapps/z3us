import { useEffect } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { EVENT } from '@src/lib/v1/actions'
import { ACCOUNT_CHANGE, KEYSTORE_CHANGE, NETWORK_CHANGE } from '@src/lib/v1/events'

export const useEvents = () => {
	const { keystoreId, messanger } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
		messanger: state.messanger,
	}))
	const { address, network, networkIndex, accountIndex } = useStore(state => ({
		networkIndex: state.selectedNetworkIndex,
		accountIndex: state.selectedAccountIndex,
		address: state.getCurrentAddressAction(),
		network: state.networks[state.selectedNetworkIndex],
	}))

	useEffect(() => {
		console.log('useEffect', keystoreId, accountIndex, address, networkIndex, network.url.toString())
		if (!messanger) return
		messanger.sendActionMessageFromPopup(EVENT, {
			eventType: KEYSTORE_CHANGE,
			eventDetails: { keystoreId },
		})
	}, [keystoreId])

	useEffect(() => {
		if (!messanger) return
		messanger.sendActionMessageFromPopup(EVENT, {
			eventType: ACCOUNT_CHANGE,
			eventDetails: { address },
		})
	}, [accountIndex, address])

	useEffect(() => {
		if (!messanger) return
		messanger.sendActionMessageFromPopup(EVENT, {
			eventType: NETWORK_CHANGE,
			eventDetails: { id: network.id.toString(), url: network.url.toString() },
		})
	}, [networkIndex, network.url.toString()])
}
