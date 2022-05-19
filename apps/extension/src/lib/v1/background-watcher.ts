import browser from 'webextension-polyfill'
import { store as useStore } from '@src/store'
import { RadixService } from '@src/services/radix'
import { getShortAddress, getTransactionType } from '@src/utils/string-utils'

export async function getLastTransactions() {
	const state = useStore.getState()
	const { networks, selectedNetworkIndex, publicAddresses, hwPublicAddresses } = state
	const allAddresses = [...Object.values(publicAddresses), ...Object.values(hwPublicAddresses)]

	const network = networks[selectedNetworkIndex]

	const service = new RadixService(network.url)

	const results = await Promise.all(
		allAddresses.map(async address => {
			const { transactions } = await service.transactionHistory(address)
			return {
				address,
				transactions:
					transactions?.flatMap(tx => {
						tx.actions = tx.actions.filter(a => a.from_account === address || a.to_account === address)
						return tx.actions.length > 0 ? [tx] : []
					}) || [],
			}
		}),
	)
	const transactionMap = results.reduce(
		(container, { address, transactions }) => ({ ...container, [address]: transactions || [] }),
		{},
	)
	return transactionMap
}

let lastTxIds = {}
const watchTransactions = async () => {
	try {
		const transactionMap = await getLastTransactions()
		const newLastTxIds = {}
		Object.keys(transactionMap).forEach(async address => {
			const transactions = transactionMap[address]
			if (transactions.length > 0) {
				newLastTxIds[address] = transactions[0].id
			}

			const lastTxId = lastTxIds[address]
			if (lastTxId) {
				for (let i = 0; i < transactions.length; i += 1) {
					const tx = transactions[i]
					if (lastTxId === tx.id) {
						break
					}
					const activity = tx?.actions.length > 0 ? getTransactionType(address, tx.actions[0]) : 'Unknown'

					browser.notifications.create(tx.id, {
						type: 'basic',
						iconUrl: browser.runtime.getURL('favicon-128x128.png'),
						title: `New ${activity} Transaction`,
						eventTime: tx?.sentAt.getTime(),
						message: `There is a new ${activity} transaction on your account (${getShortAddress(address)}).`,

					})
					const { lastError } = browser.runtime
					if (lastError) {
						// eslint-disable-next-line @typescript-eslint/no-throw-literal
						throw lastError
					}
				}
			}
		})

		lastTxIds = newLastTxIds
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
	}
}

const keepServiceWorkerActive = () => dispatchEvent(new CustomEvent('backgroundwatcher'))

const handleKeepServiceWorkerActive = async () => {
	await useStore.persist.rehydrate()
	watchTransactions()
}

export default () => {
	// eslint-disable-next-line no-restricted-globals
	addEventListener('backgroundwatcher', handleKeepServiceWorkerActive)
	setInterval(keepServiceWorkerActive, 1000 * 15) // 15 seconds
}
