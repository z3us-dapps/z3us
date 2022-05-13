import browser from 'webextension-polyfill'
import { useEffect, useState } from 'react'
import { useStore } from '@src/store'
import { HDMasterSeed } from '@radixdlt/crypto'
import { MessageService, PORT_NAME } from '@src/services/messanger'
import { GET } from '@src/lib/actions'
import { useLastFiveTransactions } from '@src/services/react-query/queries/radix'

const messanger = new MessageService('extension', browser.runtime.connect({ name: PORT_NAME }), null)

const refreshInterval = 60 * 1000 // 1 minute

export const useVault = () => {
	const { networkIndex, accountIndex, setMasterSeed, setHasKeystore, setMessanger, addToast } = useStore(state => ({
		networkIndex: state.selectedNetworkIndex,
		accountIndex: state.selectedAccountIndex,
		setMasterSeed: state.setMasterSeedAction,
		setHasKeystore: state.setHasKeystoreAction,
		setMessanger: state.setMessangerAction,
		addToast: state.addToastAction,
	}))

	const {
		data: { transactions },
	} = useLastFiveTransactions()

	const [time, setTime] = useState(Date.now())
	const [lastTxId, setLastTxId] = useState(null)

	useEffect(() => {
		const interval = setInterval(() => setTime(Date.now()), refreshInterval)

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

		return () => {
			clearInterval(interval)
		}
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

	useEffect(() => {
		if (!lastTxId) return
		if (!transactions) return
		for (let i = 0; i < transactions.length; i += 1) {
			if (lastTxId === transactions[i].id) {
				break
			}
			addToast({
				type: 'info',
				title: 'New transaction',
				duration: 5000,
			})
		}
		setLastTxId(transactions[0].id)
	}, [transactions])
}
