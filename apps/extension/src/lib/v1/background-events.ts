import { Runtime } from 'webextension-polyfill'
import shallow from 'zustand/shallow'
import { Mutex } from 'async-mutex'
import { sharedStore, accountStore } from '@src/store'
import { EVENT_MESSAGE_ID, TARGET_INPAGE } from '@src/services/messanger'
import { ACCOUNT_CHANGE, KEYSTORE_CHANGE } from '../events'

const mutex = new Mutex()
const subscribeOptions = { equalityFn: shallow, fireImmediately: true }

// https://github.com/pmndrs/zustand#using-subscribe-with-selector
export const subscribeToEvents = async (
	port: Runtime.Port,
	sendMessage: (port: Runtime.Port, target: string, id: string, request: any, response: any) => void,
) => {
	await sharedStore.persist.rehydrate()
	const { selectKeystoreId } = sharedStore.getState()

	let accStore = accountStore(selectKeystoreId)

	const unsubscribeKeystoreChange = sharedStore.subscribe(
		state => state.selectKeystoreId,
		async (newKeystoreId: string) => {
			sendMessage(port, TARGET_INPAGE, EVENT_MESSAGE_ID, null, {
				eventType: KEYSTORE_CHANGE,
				eventDetails: { keystoreId: newKeystoreId },
			})

			const release = await mutex.acquire()
			accStore = accountStore(newKeystoreId)
			release()
		},
		subscribeOptions,
	)

	const unsubscribeAccountChange = accStore.subscribe(
		state => [state.selectedAccountIndex, state.publicAddresses],
		([selectedAccountIndex, publicAddresses], [previousAccountIndex]) => {
			if (selectKeystoreId === previousAccountIndex) return
			const publicIndexes = Object.keys(publicAddresses)
			const address = publicAddresses[publicIndexes[selectedAccountIndex]]?.address
			sendMessage(port, TARGET_INPAGE, EVENT_MESSAGE_ID, null, {
				eventType: ACCOUNT_CHANGE,
				eventDetails: { address },
			})
		},
		subscribeOptions,
	)

	const unsubscribeNetworkChange = accStore.subscribe(
		state => [state.selectedNetworkIndex, state.networks],
		([selectedNetworkIndex, networks], [previousNetworkIndex]) => {
			if (selectKeystoreId === previousNetworkIndex) return
			const network = networks[selectedNetworkIndex]
			sendMessage(port, TARGET_INPAGE, EVENT_MESSAGE_ID, null, {
				eventType: ACCOUNT_CHANGE,
				eventDetails: { network },
			})
		},
		subscribeOptions,
	)

	return () => {
		unsubscribeKeystoreChange()
		unsubscribeAccountChange()
		unsubscribeNetworkChange()
	}
}
