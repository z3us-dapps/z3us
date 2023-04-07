import { Network as NetworkID } from '@radixdlt/application'
import BigNumber from 'bignumber.js'
import { useInfiniteQuery, useQueries, useQuery } from 'react-query'

import { useMessage } from '@src/hooks/use-message'
import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import { RadixService } from '@src/services/radix'
import { Action, Transaction } from '@src/types'

export const getGatewayInfoQueryKey = (id: NetworkID) => ['useGatewayInfo', id]

export const useGatewayInfo = () => {
	const network = useNoneSharedStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(getGatewayInfoQueryKey(network.id), async () => service.gateway())
}

export const getNativeTokenQueryKey = (id: NetworkID) => ['useNativeToken', id]

export const useNativeToken = () => {
	const network = useNoneSharedStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(getNativeTokenQueryKey(network.id), async () => service.nativeToken(network.id))
}

export const getTokenInfoQueryKey = (id: NetworkID, rri: string) => ['useTokenInfo', id, rri]

export const useTokenInfo = (rri: string) => {
	const network = useNoneSharedStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(getTokenInfoQueryKey(network.id, rri), async () => service.tokenInfo(rri), {
		enabled: !!rri,
	})
}

export const useTokenInfos = (rris: Array<string>) => {
	const network = useNoneSharedStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	const queries = rris.map(rri => ({
		queryKey: getTokenInfoQueryKey(network.id, rri),
		queryFn: async () => {
			try {
				const token = await service.tokenInfo(rri)
				return token
			} catch (err: any) {
				return null
			}
		},
	}))
	return useQueries(queries)
}

export const getTokenBalancesQueryKey = (address: string) => ['useTokenBalances', address]

export const useTokenBalances = () => {
	const { address, network } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
		network: state.networks[state.selectedNetworkIndex],
	}))

	const service = new RadixService(network.url)

	return useQuery(getTokenBalancesQueryKey(address), async () => service.tokenBalancesForAddress(address), {
		staleTime: 5 * 1000,
		refetchInterval: 5 * 1000,
		enabled: !!address,
	})
}

export const useAllAccountsTokenBalances = (): {
	isLoading: boolean
	balances: {
		[rri: string]: {
			rri: string
			symbol: string
			name: string
			amount: BigNumber
		}
	}
	staked: BigNumber
} => {
	const { addresses, network } = useNoneSharedStore(state => ({
		addresses: Object.values(state.publicAddresses).map(({ address }) => address),
		network: state.networks[state.selectedNetworkIndex],
	}))
	const service = new RadixService(network.url)

	const queries = addresses.map(address => ({
		queryKey: getTokenBalancesQueryKey(address),
		queryFn: async () => {
			try {
				return await service.tokenBalancesForAddress(address)
			} catch (err: any) {
				return null
			}
		},
	}))

	const results = useQueries(queries)
	const isLoading = results.some(result => result.isLoading)
	const rawBalances = results?.filter(({ data }) => !!data) || []

	const balanceMap = rawBalances.reduce((container, { data }) => {
		const balances = data ? data.account_balances.liquid_balances : []
		balances.forEach(balance => {
			if (!container[balance.rri]) {
				container[balance.rri] = {
					rri: balance.rri,
					symbol: balance.symbol,
					amount: new BigNumber(balance.amount).shiftedBy(-18),
				}
			} else {
				container[balance.rri].amount = container[balance.rri].amount.plus(new BigNumber(balance.amount).shiftedBy(-18))
			}
		})

		return container
	}, {})

	const staked = rawBalances.reduce(
		(container, { data }) =>
			data
				? container.plus(new BigNumber(data.account_balances.staked_and_unstaking_balance.value).shiftedBy(-18))
				: container,
		new BigNumber(0),
	)

	return { isLoading, balances: balanceMap, staked }
}

export const getStakedPositionsQueryKey = (address: string) => ['useStakedPositions', address]

export const useStakedPositions = () => {
	const { address, network } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
		network: state.networks[state.selectedNetworkIndex],
	}))
	const service = new RadixService(network.url)

	return useQuery(getStakedPositionsQueryKey(address), async () => service.stakesForAddress(address), {
		enabled: !!address,
	})
}

export const getUnstakePositionsQueryKey = (address: string) => ['useUnstakePositions', address]

export const useUnstakePositions = () => {
	const { address, network } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
		network: state.networks[state.selectedNetworkIndex],
	}))
	const service = new RadixService(network.url)

	return useQuery(getUnstakePositionsQueryKey(address), async () => service.unstakesForAddress(address), {
		enabled: !!address,
	})
}

export const getTotalDelegatedStakeQueryKey = (id: NetworkID) => ['useTotalDelegatedStake', id]

export const useTotalDelegatedStake = () => {
	const network = useNoneSharedStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(getTotalDelegatedStakeQueryKey(network.id), async () => {
		const validators = await service.validators(network.id)
		if (validators.length === 0) {
			return undefined
		}
		let total = new BigNumber(0)
		for (let i = 0; i < validators.length; i += 1) {
			const vtotal = validators[i].totalDelegatedStake
			if (vtotal) {
				total = BigNumber.sum(total, new BigNumber(vtotal).shiftedBy(-18))
			}
		}
		return total
	})
}

export const getValidatorsQueryKey = (id: NetworkID) => ['useValidators', id]

export const useValidators = () => {
	const network = useNoneSharedStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(getValidatorsQueryKey(network.id), async () => service.validators(network.id))
}

export const getLookupValidatorQueryKey = (address: string) => ['useLookupValidator', address]

export const useLookupValidator = (validatorAddress: string) => {
	const network = useNoneSharedStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(getLookupValidatorQueryKey(validatorAddress), async () => service.lookupValidator(validatorAddress), {
		enabled: !!validatorAddress,
	})
}

export const getTransactionStatusQueryKey = (id: NetworkID, txID: string) => ['useTransactionStatus', id, txID]

export const useTransactionStatus = (txID: string) => {
	const network = useNoneSharedStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(
		getTransactionStatusQueryKey(network.id, txID),
		async () => service.transactionStatus(network.id, txID),
		{
			enabled: !!txID,
		},
	)
}

const fetchTransactionHistoryPage = async (service: RadixService, address: string, size: number, pageParam: string) => {
	const { cursor, transactions } = await service.transactionHistory(address, size, pageParam)
	return {
		cursor,
		transactions: transactions.flatMap(tx => {
			tx.actions = tx.actions.filter(a => a.from_account === address || a.to_account === address)
			return tx.actions.length > 0 ? [tx] : []
		}),
	}
}

export const getTransactionHistoryInfiniteQueryKey = (address: string, size: number) => [
	'useTransactionHistory',
	address,
	size,
]

export const useTransactionHistory = (size = 30) => {
	const maxLimit = 30
	size = Math.min(size, maxLimit)

	const { address, network } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
		network: state.networks[state.selectedNetworkIndex],
	}))
	const service = new RadixService(network.url)

	return useInfiniteQuery(
		getTransactionHistoryInfiniteQueryKey(address, size),
		({ pageParam }) => fetchTransactionHistoryPage(service, address, size, pageParam),
		{
			getNextPageParam: lastPage => lastPage.cursor,
			enabled: !!address,
		},
	)
}

export const getTransactionHistoryPageQueryKey = (address: string, cursor: string) => [
	'useTransactionHistoryPage',
	address,
	cursor,
]

export const useTransactionHistoryPage = (pageParam: string = '0', size = 30) => {
	const maxLimit = 30
	size = Math.min(size, maxLimit)

	const { address, network } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
		network: state.networks[state.selectedNetworkIndex],
	}))
	const service = new RadixService(network.url)

	return useQuery(
		getTransactionHistoryPageQueryKey(address, pageParam),
		() => fetchTransactionHistoryPage(service, address, size, pageParam),
		{
			enabled: !!address,
		},
	)
}

export const getDecryptTransactionQueryKey = (address: string, txId: string) => ['useDecryptTransaction', address, txId]

export const useDecryptTransaction = (tx: Transaction, activity?: Action) => {
	const { signingKey } = useSharedStore(state => ({
		signingKey: state.signingKey,
	}))
	const { address } = useNoneSharedStore(state => ({
		address: state.getCurrentAddressAction(),
	}))
	const { decryptMessage } = useMessage()

	return useQuery(
		getDecryptTransactionQueryKey(address, tx.id),
		async () => {
			if (address === activity.from_account) {
				return decryptMessage(activity.to_account, tx.message)
			}
			return decryptMessage(activity.from_account, tx.message)
		},
		{
			enabled: !!activity && !!signingKey,
		},
	)
}
