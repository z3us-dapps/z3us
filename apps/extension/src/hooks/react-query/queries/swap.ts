import { useEffect } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { useQuery } from 'react-query'
import { useImmer } from 'use-immer'
import { useTransaction } from '@src/hooks/use-transaction'
import caviar from '@src/services/caviar'
import oci, { PoolName as OCIPoolName } from '@src/services/oci'
import doge, { PoolName as DogeCubePoolName } from '@src/services/dogecubex'
import {
	ResourceIdentifier,
	AccountAddress,
	IntendedTransferTokens,
	BuiltTransactionReadyToSign,
} from '@radixdlt/application'
import { Pool, PoolType, Token } from '@src/types'
import BigNumber from 'bignumber.js'
import { buildAmount } from '@src/utils/radix'
import { Z3US_WALLET_MAIN, Z3US_WALLET_BURN, Z3US_RRI, XRD_RRI, swapServices } from '@src/config'
import { useMessage } from '@src/hooks/use-message'

const poolQueryOptions = {
	staleTime: 60 * 1000,
	refetchInterval: 60 * 1000,
}

export const useCaviarPools = () =>
	useQuery(['useCaviarPools'], caviar.getPools, { ...poolQueryOptions, enabled: swapServices[PoolType.CAVIAR].enabled })

export const useOCIPools = () =>
	useQuery(['useOCIPools'], oci.getPools, { ...poolQueryOptions, enabled: swapServices[PoolType.OCI].enabled })

export const useDogeCubeXPools = () =>
	useQuery(['useDogeCubeXPools'], doge.getPools, {
		...poolQueryOptions,
		enabled: swapServices[PoolType.DOGECUBEX].enabled,
	})

export const usePoolTokens = (): { [rri: string]: { [rri: string]: null } } => {
	const { data: ociPools } = useOCIPools()
	const { data: caviarPools } = useCaviarPools()
	const { data: dogePools } = useDogeCubeXPools()

	const uniqueTokens = {}

	if (ociPools) {
		ociPools.forEach(p => {
			uniqueTokens[p.token_a.rri] = { [p.token_b.rri]: null, ...(uniqueTokens[p.token_a.rri] || {}) }
			uniqueTokens[p.token_b.rri] = { [p.token_a.rri]: null, ...(uniqueTokens[p.token_b.rri] || {}) }
		})
	}
	if (caviarPools) {
		caviarPools.forEach(p =>
			Object.keys(p.balances).forEach(rri => {
				uniqueTokens[rri] = { ...p.balances, ...(uniqueTokens[rri] || {}) }
			}),
		)
	}
	if (dogePools) {
		dogePools.forEach(p => {
			uniqueTokens[p.token.rri] = { [XRD_RRI]: null, ...(uniqueTokens[p.token.rri] || {}) }
			uniqueTokens[XRD_RRI] = { [p.token.rri]: null, ...(uniqueTokens[XRD_RRI] || {}) }
		})
	}

	return uniqueTokens
}

export const usePools = (fromRRI: string, toRRI: string): Pool[] => {
	const { data: ociPools } = useOCIPools()
	const { data: caviarPools } = useCaviarPools()
	const { data: dogePools } = useDogeCubeXPools()

	if (!fromRRI || !toRRI) {
		return []
	}

	const pools: Pool[] = []
	if (ociPools) {
		const ociPool = ociPools.find(
			p =>
				(p.token_a.rri === fromRRI && p.token_b.rri === toRRI) ||
				(p.token_b.rri === fromRRI && p.token_a.rri === toRRI),
		)
		if (ociPool) {
			pools.push({
				...swapServices[PoolType.OCI],
				name: OCIPoolName,
				wallet: ociPool.wallet_address,
			})
		}
	}
	if (caviarPools) {
		caviarPools.forEach(p => {
			if (p.balances[fromRRI] && p.balances[toRRI]) {
				pools.push({
					...swapServices[PoolType.CAVIAR],
					name: p.name,
					wallet: p.wallet,
					balances: p.balances,
				})
			}
		})
	}
	if (dogePools && (fromRRI === XRD_RRI || toRRI === XRD_RRI)) {
		if (fromRRI === XRD_RRI) {
			const dogePool = dogePools.find(p => p.token.rri === toRRI)
			if (dogePool) {
				pools.push({
					...swapServices[PoolType.DOGECUBEX],
					image: dogePool.heroImageUrl || swapServices[PoolType.DOGECUBEX].image,
					name: DogeCubePoolName,
					wallet: dogePool.account,
				})
			}
		} else if (toRRI === XRD_RRI) {
			const dogePool = dogePools.find(p => p.token.rri === fromRRI)
			if (dogePool) {
				pools.push({
					...swapServices[PoolType.DOGECUBEX],
					image: dogePool.heroImageUrl || swapServices[PoolType.DOGECUBEX].image,
					name: DogeCubePoolName,
					wallet: dogePool.account,
				})
			}
		}
	}

	return pools
}

interface ImmerT {
	transaction: BuiltTransactionReadyToSign
	fee: BigNumber
}

export const useTransactionFee = (
	pool: Pool,
	fromToken: Token,
	toToken: Token,
	amount: BigNumber,
	recieve: BigNumber,
	z3usFee: BigNumber,
	z3usBurn: BigNumber,
	minimum: boolean,
): {
	transaction: BuiltTransactionReadyToSign | null
	fee: BigNumber
} => {
	const { buildTransactionFromActions } = useTransaction()
	const { createMessage } = useMessage()
	const { account } = useStore(state => ({
		account: state.account,
	}))
	const { addToast } = useSharedStore(state => ({
		addToast: state.addToastAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		transaction: null,
		fee: new BigNumber(0),
	})

	const fetchCost = async () => {
		if (amount.eq(0) || !pool?.wallet || !fromToken?.rri || !toToken?.rri) {
			setState(draft => {
				draft.transaction = null
				draft.fee = new BigNumber(0)
			})
			return
		}

		try {
			const rriResult = ResourceIdentifier.fromUnsafe(fromToken.rri)
			if (rriResult.isErr()) {
				throw rriResult.error
			}
			const toResult = AccountAddress.fromUnsafe(pool.wallet)
			if (toResult.isErr()) {
				throw toResult.error
			}

			let plainText: string
			switch (pool.type) {
				case PoolType.OCI:
					plainText = toToken.symbol.toUpperCase()
					if (minimum) {
						plainText = `${recieve.toString()} ${plainText}`
					}
					break
				case PoolType.CAVIAR:
					plainText = toToken.symbol.toUpperCase()
					if (minimum) {
						plainText = `MIN ${recieve.toString()} ${plainText}`
					}
					break
				case PoolType.DOGECUBEX:
					if (minimum) {
						plainText = `>${recieve.toString()}`
					}
					break
				default:
					throw new Error(`Invalid pool: ${pool.name} - ${pool.type}`)
			}

			const actions = []
			if (z3usBurn.gt(0)) {
				const actionResult = IntendedTransferTokens.create(
					{
						to_account: Z3US_WALLET_BURN,
						amount: buildAmount(z3usBurn),
						tokenIdentifier: Z3US_RRI,
					},
					account.address,
				)
				if (actionResult.isErr()) {
					throw actionResult.error
				}
				actions.push(actionResult.value)
			}

			if (z3usFee.gt(0)) {
				const actionResult = IntendedTransferTokens.create(
					{
						to_account: Z3US_WALLET_MAIN,
						amount: buildAmount(z3usFee),
						tokenIdentifier: rriResult.value,
					},
					account.address,
				)
				if (actionResult.isErr()) {
					throw actionResult.error
				}
				actions.push(actionResult.value)
			}

			const actionResult = IntendedTransferTokens.create(
				{
					to_account: toResult.value,
					amount: buildAmount(amount),
					tokenIdentifier: rriResult.value,
				},
				account.address,
			)
			if (actionResult.isErr()) {
				throw actionResult.error
			}
			actions.push(actionResult.value)

			let message: string
			if (plainText) {
				message = await createMessage(plainText)
			}

			const { transaction, fee } = await buildTransactionFromActions(actions, message)

			setState(draft => {
				draft.transaction = transaction
				draft.fee = new BigNumber(fee).shiftedBy(-18)
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
			setState(draft => {
				draft.transaction = null
				draft.fee = new BigNumber(0)
			})
			addToast({
				type: 'error',
				title: 'Failed to calculate transaction fees',
				subTitle: (error?.message || error).toString().trim(),
				duration: 5000,
			})
		}
	}

	useEffect(() => {
		fetchCost()
	}, [
		pool?.wallet,
		fromToken?.rri,
		toToken?.rri,
		amount.toString(),
		recieve.toString(),
		z3usFee.toString(),
		z3usBurn.toString(),
		minimum,
	])

	return state
}
