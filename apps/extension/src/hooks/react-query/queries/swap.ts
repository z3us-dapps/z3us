/* eslint-disable no-case-declarations */
import { useEffect } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { useQuery } from 'react-query'
import { useImmer } from 'use-immer'
import { useTransaction } from '@src/hooks/use-transaction'
import { CaviarService, PoolName as CaviarPoolName } from '@src/services/caviar'
import { OCIService, PoolName as OCIPoolName, Address as OCIAddress } from '@src/services/oci'
import {
	ResourceIdentifier,
	AccountAddress,
	IntendedTransferTokens,
	BuiltTransactionReadyToSign,
} from '@radixdlt/application'
import { Pool, PoolType, Token } from '@src/types'
import BigNumber from 'bignumber.js'
import { buildAmount } from '@src/utils/radix'
import { Z3US_FEE_RATIO, Z3US_WALLET_MAIN, Z3US_WALLET_BURN, Z3US_RRI } from '@src/config'
import { useMessage } from '@src/hooks/use-message'

const oci = new OCIService()
const caviar = new CaviarService()

const poolQueryOptions = {
	staleTime: 60 * 1000,
	refetchInterval: 60 * 1000,
}

export const useCaviarPools = () => useQuery(['useCaviarPools'], caviar.getPools, poolQueryOptions)

export const useOCIPools = () => useQuery(['useOCIPools'], oci.getPools, poolQueryOptions)

export const usePoolTokens = (): { [rri: string]: { [rri: string]: any } } => {
	const { data: ociPools } = useOCIPools()
	const { data: caviarPools } = useCaviarPools()

	const uniqueTokens = {}
	if (ociPools) {
		ociPools.forEach(p => {
			uniqueTokens[p.token_a.rri] = { ...(uniqueTokens[p.token_a.rri] || {}), [p.token_b.rri]: null }
			uniqueTokens[p.token_b.rri] = { ...(uniqueTokens[p.token_b.rri] || {}), [p.token_a.rri]: null }
		})
	}

	if (caviarPools) {
		caviarPools.forEach(p =>
			Object.keys(p.balances).forEach(rri => {
				uniqueTokens[rri] = p.balances
			}),
		)
	}

	return uniqueTokens
}

export const usePools = (fromRRI: string, toRRI: string): Pool[] => {
	const { data: ociPools } = useOCIPools()
	const { data: caviarPools } = useCaviarPools()

	if (!fromRRI || !toRRI) {
		return []
	}

	const pools = []
	if (ociPools) {
		const ociPool = ociPools.find(
			p =>
				(p.token_a.rri === fromRRI && p.token_b.rri === toRRI) ||
				(p.token_b.rri === fromRRI && p.token_a.rri === toRRI),
		)
		if (ociPool) {
			pools.push({
				name: OCIPoolName,
				wallet: OCIAddress,
				type: PoolType.OCI,
			})
		}
	}
	if (caviarPools) {
		caviarPools.forEach(p => {
			if (p.balances[fromRRI] && p.balances[toRRI]) {
				pools.push({
					name: `${CaviarPoolName} - ${p.name}`,
					wallet: p.wallet,
					type: PoolType.CAVIAR,
				})
			}
		})
	}

	return pools
}

export const useZ3USFees = (
	amount: BigNumber,
	z3usBalance: BigNumber,
	burn: boolean,
): {
	amount: BigNumber
	fee: BigNumber
	burn: BigNumber
} => {
	const { addToast } = useSharedStore(state => ({
		addToast: state.addToastAction,
	}))

	const [state, setState] = useImmer({
		amount: new BigNumber(0),
		fee: new BigNumber(0),
		burn: new BigNumber(0),
	})

	const fetchCost = async () => {
		if (amount.isEqualTo(0)) {
			setState(draft => {
				draft.amount = new BigNumber(0)
				draft.fee = new BigNumber(0)
				draft.burn = new BigNumber(0)
			})
			return
		}

		try {
			let fee = amount.multipliedBy(Z3US_FEE_RATIO)
			let burnAmount = new BigNumber(0)

			if (burn) {
				if (z3usBalance.gte(fee)) {
					burnAmount = fee
					fee = new BigNumber(0)
				} else {
					burnAmount = new BigNumber(0).plus(z3usBalance)
					fee = fee.minus(z3usBalance)
				}
			}
			amount = amount.minus(fee)

			setState(draft => {
				draft.amount = amount
				draft.fee = fee
				draft.burn = burnAmount
			})
		} catch (error) {
			setState(draft => {
				draft.amount = new BigNumber(0)
				draft.fee = new BigNumber(0)
				draft.burn = new BigNumber(0)
			})
			addToast({
				type: 'error',
				title: 'Failed to calculate Z3US fees',
				subTitle: (error?.message || error).toString().trim(),
				duration: 5000,
			})
		}
	}

	useEffect(() => {
		fetchCost()
	}, [amount.toString(), z3usBalance.toString(), burn])

	return state
}

export const usePoolFees = (
	selectedPool: Pool,
	pools: Pool[],
	onPool: (pool: Pool) => void,
	amount: BigNumber,
	fromRRI: string,
	toRRI: string,
): {
	amount: BigNumber
	recieve: BigNumber
	fee: BigNumber
} => {
	const { addToast } = useSharedStore(state => ({
		addToast: state.addToastAction,
	}))

	const [state, setState] = useImmer({
		amount: new BigNumber(0),
		recieve: new BigNumber(0),
		fee: new BigNumber(0),
	})

	const fetchCost = async (pool): Promise<[BigNumber, BigNumber, BigNumber]> => {
		if (!pool?.wallet || amount.isEqualTo(0) || !fromRRI || !toRRI) {
			return [new BigNumber(0), new BigNumber(0), new BigNumber(0)]
		}

		let fee = new BigNumber(0)
		let recieve = new BigNumber(0)

		switch (pool.type) {
			case PoolType.OCI:
				const cost = await oci.calculateSwap(fromRRI, toRRI, amount)
				fee = new BigNumber(cost?.fee_liquidity_provider[0]?.amount || 0).plus(
					new BigNumber(cost?.fee_exchange[0]?.amount || 0),
				)
				recieve = new BigNumber(cost?.output_amount || 0)
				break
			case PoolType.CAVIAR:
				fee = amount.multipliedBy(1 / 100)
				recieve = amount.div(2) // @TODO: get the correct formula from caviar dudes
				break
			default:
				throw new Error(`Invalid pool: ${pool.name} - ${pool.type}`)
		}

		return [amount, recieve, fee]
	}

	const loadPoolFee = async () => {
		try {
			if (selectedPool) {
				const [newAmount, recieve, fee] = await fetchCost(selectedPool)
				setState(draft => {
					draft.amount = newAmount
					draft.recieve = recieve
					draft.fee = fee
				})
			} else if (pools.length > 0) {
				let toSelect: Pool
				let cheapest: BigNumber[]

				const results = await Promise.all(pools.map(pool => fetchCost(pool)))
				results.forEach((cost, index) => {
					if (!cheapest || cost[1].gt(cheapest[1])) {
						cheapest = cost
						toSelect = pools[index]
					}
				})

				const [newAmount, recieve, fee] = cheapest
				setState(draft => {
					draft.amount = newAmount
					draft.recieve = recieve
					draft.fee = fee
				})
				onPool(toSelect)
			}
		} catch (error) {
			setState(draft => {
				draft.amount = new BigNumber(0)
				draft.recieve = new BigNumber(0)
				draft.fee = new BigNumber(0)
			})
			addToast({
				type: 'error',
				title: 'Failed to calculate pool fees',
				subTitle: (error?.message || error).toString().trim(),
				duration: 5000,
			})
		}
	}

	useEffect(() => {
		loadPoolFee()
	}, [selectedPool?.wallet, fromRRI, toRRI, amount.toString()])

	return state
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

	const [state, setState] = useImmer({
		transaction: null,
		fee: new BigNumber(0),
	})

	const fetchCost = async () => {
		if (amount.isEqualTo(0) || !pool?.wallet || !fromToken?.rri || !toToken?.rri) {
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

			let plainText = toToken.symbol.toUpperCase()
			switch (pool.type) {
				case PoolType.OCI:
					if (minimum) {
						plainText = `${recieve.toString()} ${plainText}`
					}
					break
				case PoolType.CAVIAR:
					recieve = amount.div(2) // @TODO: get the correct formula from caviar dudes
					if (minimum) {
						plainText = `MIN ${recieve.toString()} ${plainText}`
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

			const message = await createMessage(plainText)
			const { transaction, fee } = await buildTransactionFromActions(actions, message)

			setState(draft => {
				draft.transaction = transaction
				draft.fee = new BigNumber(fee).shiftedBy(-18)
			})
		} catch (error) {
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
