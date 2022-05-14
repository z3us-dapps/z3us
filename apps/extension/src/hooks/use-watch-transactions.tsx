import browser from 'webextension-polyfill'
import { useEffect, useState } from 'react'
import { useStore } from '@src/store'
import { useLastFiveTransactions } from '@src/services/react-query/queries/radix'

const title = 'New transaction'

export const useWatchTransactions = () => {
	const { addToast } = useStore(state => ({
		addToast: state.addToastAction,
	}))

	const {
		data: { transactions },
	} = useLastFiveTransactions() // @TODO: watch all available accounts not the only one selected

	const [lastTxId, setLastTxId] = useState(null)

	useEffect(() => {
		if (!lastTxId) return
		if (!transactions) return
		for (let i = 0; i < transactions.length; i += 1) {
			if (lastTxId === transactions[i].id) {
				break
			}
			addToast({
				type: 'info',
				title,
				duration: 5000,
			})
			browser.notifications.create(transactions[0].id, {
				title,
				type: 'basic',
				message: 'There is a new transaction on your account',
			})
		}
		setLastTxId(transactions[0].id)
	}, [transactions])
}
