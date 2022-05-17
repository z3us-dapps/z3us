/* eslint-disable no-await-in-loop */
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

	const [lastTxIds, setLastTxIds] = useState({})

	useEffect(() => {
		if (isLoading) return () => {}
		if (!transactionMap) return () => {}

		let mounted = true

		const newLastTxIds = {}
		Object.keys(transactionMap).forEach(async address => {
			const transactions = transactionMap[address]
			if (transactions.length > 0) {
				newLastTxIds[address] = transactions[0].id
			}

			const lastTxId = lastTxIds[address]
			if (lastTxId) {
				for (let i = 0; i < transactions.length; i += 1) {
					if (lastTxId === transactions[i].id) {
						break
					}
					if (!mounted) return
					await browser.notifications.create(transactions[i].id, {
						title,
						type: 'basic',
						message: 'There is a new transaction on your account',
						iconUrl: browser.runtime.getURL('favicon-128x128.png'),
					})
					const { lastError } = browser.runtime
					if (lastError) {
						console.error(lastError)
					}
				}
			}
		})

		setLastTxIds(newLastTxIds)

		return () => {
			mounted = false
		}
	}, [isLoading, transactionMap])
}
