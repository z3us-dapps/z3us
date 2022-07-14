import { useEffect } from 'react'
import { useStore } from '@src/store'
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
import { ExtendedActionType, Token } from '@src/types'
import BigNumber from 'bignumber.js'
import { buildAmount } from '@src/utils/radix'
import { Z3US_RRI, Z3US_WALLET } from '@src/config'
import { useMessage } from '@src/hooks/use-message'

const oci = new OCIService()
const caviar = new CaviarService()

const poolQueryOptions = {
	staleTime: 60 * 1000,
	refetchInterval: 60 * 1000,
}

export const useCaviarPools = () => useQuery(['useCaviarPools'], caviar.getPools, poolQueryOptions)

export const useOCIPools = () => useQuery(['useOCIPools'], oci.getPools, poolQueryOptions)

export const usePools = () => {
	const { data: ociPools } = useOCIPools()
	const { data: caviarPools } = useCaviarPools()

	return [...(ociPools ? [OCIPoolName] : []), ...(caviarPools || []).map(pool => `${CaviarPoolName} - ${pool.name}`)]
}

type Pool = {
	name: string
	wallet: string
	tokens: string[]
}

export const usePool = (poolName: string) => {
	const { data: ociPools } = useOCIPools()
	const { data: caviarPools } = useCaviarPools()

	if (poolName === OCIPoolName) {
		if (!ociPools) {
			return null
		}
		const uniqueTokens = {}
		ociPools.forEach(p => {
			uniqueTokens[p.token_a.rri] = null
			uniqueTokens[p.token_b.rri] = null
		})
		return {
			name: OCIPoolName,
			wallet: OCIAddress,
			tokens: Object.keys(uniqueTokens),
		}
	}

	if (!caviarPools) {
		return null
	}
	const pool = caviarPools.find(p => `${CaviarPoolName} - ${p.name}` === poolName)
	if (!pool) {
		return null
	}

	return {
		name: `${CaviarPoolName} - ${pool.name}`,
		wallet: pool.wallet,
		tokens: Object.keys(pool.balances),
	}
}

type Cost = {
	transaction: BuiltTransactionReadyToSign | null
	transactionFee: BigNumber
	swapFee: BigNumber
	z3usFee: BigNumber
	z3usBurn: BigNumber
	recieve: BigNumber
}

const defaultState = {
	transaction: null,
	transactionFee: new BigNumber(0),
	swapFee: new BigNumber(0),
	z3usFee: new BigNumber(0),
	z3usBurn: new BigNumber(0),
	recieve: new BigNumber(0),
}

export const usePoolCost = (
	pool: Pool,
	fromToken: Token,
	toToken: Token,
	amount: BigNumber,
	z3usBalance: BigNumber,
	burn: boolean,
): Cost => {
	const { buildTransactionFromActions } = useTransaction()
	const { createMessage } = useMessage()
	const { account } = useStore(state => ({
		account: state.account,
	}))
	const [state, setState] = useImmer(defaultState)
	const fetchCost = async () => {
		if (!amount.isEqualTo(0) || !pool || !fromToken || !toToken) {
			setState(draft => {
				Object.entries(defaultState).forEach(([key, value]) => {
					draft[key] = value
				})
			})
			return
		}

		const rriResult = ResourceIdentifier.fromUnsafe(fromToken.rri)
		if (rriResult.isErr()) {
			throw rriResult.error
		}
		const toZ3usResult = AccountAddress.fromUnsafe(Z3US_WALLET)
		if (toZ3usResult.isErr()) {
			throw toZ3usResult.error
		}
		const toResult = AccountAddress.fromUnsafe(pool.wallet)
		if (toResult.isErr()) {
			throw toResult.error
		}

		let z3usFee = amount.multipliedBy(2 / 1000)
		let z3usBurn = new BigNumber(0)
		let swapFee = new BigNumber(0)
		let recieve = new BigNumber(0)

		if (burn) {
			if (z3usBalance.gte(z3usFee)) {
				z3usBurn = z3usFee
				z3usFee = new BigNumber(0)
			} else {
				z3usBurn = new BigNumber(0).plus(z3usBalance)
				z3usFee = z3usFee.minus(z3usBalance)
			}
		}
		amount = amount.minus(z3usFee)

		if (pool.name === OCIPoolName) {
			const cost = await oci.calculateSwap(fromToken.rri, toToken.rri, amount)
			swapFee = new BigNumber(cost?.fee_liquidity_provider[0]?.amount || 0).plus(
				new BigNumber(cost?.fee_exchange[0]?.amount || 0),
			)
			recieve = new BigNumber(cost?.output_amount || 0)
		} else {
			swapFee = amount.multipliedBy(1 / 100)
			recieve = amount.minus(swapFee).dividedBy(6.8) // @TODO: get the correct formula from caviar dudes
		}

		const actions = []
		if (z3usBurn.gt(0)) {
			actions.push({
				type: ExtendedActionType.BURN_TOKENS,
				from_account: account.address,
				amount: buildAmount(z3usBurn),
				rri: Z3US_RRI,
			})
		}

		if (z3usFee.gt(0)) {
			const z3usFeeActionResult = IntendedTransferTokens.create(
				{
					to_account: toZ3usResult.value,
					amount: buildAmount(z3usBurn),
					tokenIdentifier: rriResult.value,
				},
				account.address,
			)
			if (z3usFeeActionResult.isErr()) {
				throw z3usFeeActionResult.error
			}
			actions.push(z3usFeeActionResult.value)
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

		const message = await createMessage(toToken.symbol.toUpperCase())
		const { transaction, fee } = await buildTransactionFromActions(actions, message)

		setState(draft => {
			draft.z3usBurn = z3usBurn
			draft.swapFee = swapFee
			draft.recieve = recieve
			draft.transaction = transaction
			draft.transactionFee = new BigNumber(fee).shiftedBy(-18)
		})
	}

	useEffect(() => {
		fetchCost()
	}, [pool?.name, fromToken?.symbol, toToken?.symbol, amount.toString(), z3usBalance.toString(), burn])

	return state
}
