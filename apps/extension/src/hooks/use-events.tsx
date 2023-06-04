import { useEffect } from 'react'

import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import { EVENT } from '@src/lib/v1/actions'
import { ACCOUNT_CHANGE, KEYSTORE_CHANGE, NETWORK_CHANGE } from '@src/lib/v1/events'
import type { MessageService } from '@src/services/messanger'

export const useEvents = (messanger: MessageService) => {
	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectKeystoreId,
	}))
	const { address, network, networkIndex, accountIndex } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
		networkIndex: state.selectedNetworkIndex,
		accountIndex: state.selectedAccountIndex,
		network: state.networks[state.selectedNetworkIndex],
	}))

	useEffect(() => {
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
