import browser from 'webextension-polyfill'
import { useEffect, useState } from 'react'
import { useLastFiveTransactions } from '@src/services/react-query/queries/radix'

const title = 'New transaction'

export const useWatchTransactions = () => {
	const results = useLastFiveTransactions()
	const isLoading = results?.some(result => result.isLoading)
	const transactionMap = (results?.filter(({ data }) => !!data) || []).reduce(
		(container, { data }) => ({ ...container, [data.address]: data?.transactions || [] }),
		{},
	)

	const [lastTxs, setLastTxs] = useState({})

	useEffect(() => {
		if (isLoading) return
		if (!transactionMap) return

		const newLastTxs = {}
		Object.keys(transactionMap).forEach(address => {
			const transactions = transactionMap[address]
			const lastTxId = lastTxs[address]?.id

			if (lastTxId) {
				for (let i = 0; i < transactions.length; i += 1) {
					if (lastTxId === transactions[i].id) {
						break
					}
					browser.notifications.create(transactions[0].id, {
						title,
						type: 'basic',
						message: 'There is a new transaction on your account',
					})
				}
			}
			if (transactions.length > 0) {
				newLastTxs[address] = transactions[0].id
			}
		})

		setLastTxs(newLastTxs)
	}, [isLoading, transactionMap])
}
