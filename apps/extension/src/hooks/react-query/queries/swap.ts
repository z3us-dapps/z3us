import { useQuery } from 'react-query'
import caviar from '@src/services/caviar'
import astrolescent, { PoolName as AstrolescentPoolName } from '@src/services/astrolescent'
import oci, { PoolName as OCIPoolName } from '@src/services/oci'
import doge, { PoolName as DogeCubePoolName } from '@src/services/dogecubex'
import {
	ResourceIdentifier,
	AccountAddress,
	IntendedTransferTokens,
	BuiltTransactionReadyToSign,
	ActionType as ApplicationActionType,
	AccountT,
} from '@radixdlt/application'
import { IntendedAction, Pool, PoolType, Token, RawAction, ActionType } from '@src/types'
import BigNumber from 'bignumber.js'
import { buildAmount } from '@src/utils/radix'
import { Z3US_WALLET_MAIN, Z3US_WALLET_BURN, Z3US_RRI, XRD_RRI, swapServices } from '@src/config'
import { getSwapError, TSwapError } from '@src/utils/get-swap-error'
import {
	parseAccountAddress,
	parseAmount,
	parseResourceIdentifier,
	parseValidatorAddress,
} from '@src/services/radix/serializer'

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

export const useAstrolescentTokens = () =>
	useQuery(['useAstrolescentTokens'], astrolescent.getTokens, {
		...poolQueryOptions,
		enabled: swapServices[PoolType.ASTROLESCENT].enabled,
	})

export const usePoolTokens = (): { [rri: string]: { [rri: string]: null } } => {
	const { data: ociPools } = useOCIPools()
	const { data: caviarPools } = useCaviarPools()
	const { data: dogePools } = useDogeCubeXPools()
	const { data: astrolescentTokens } = useAstrolescentTokens()

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
	if (astrolescentTokens) {
		astrolescentTokens.forEach(token => {
			uniqueTokens[token.rri] = { [XRD_RRI]: null, ...(uniqueTokens[token.rri] || {}) }
			uniqueTokens[XRD_RRI] = { [token.rri]: null, ...(uniqueTokens[XRD_RRI] || {}) }
		})
	}

	return uniqueTokens
}

export const usePools = (fromRRI: string, toRRI: string): Pool[] => {
	const { data: ociPools } = useOCIPools()
	const { data: caviarPools } = useCaviarPools()
	const { data: dogePools } = useDogeCubeXPools()
	const { data: astrolescentTokens } = useAstrolescentTokens()

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
	if (astrolescentTokens && (fromRRI === XRD_RRI || toRRI === XRD_RRI)) {
		if (fromRRI === XRD_RRI) {
			const astrolescentPool = astrolescentTokens.find(token => token.rri === toRRI)
			if (astrolescentPool) {
				pools.push({
					...swapServices[PoolType.ASTROLESCENT],
					name: AstrolescentPoolName,
					wallet: 'astrolescent',
				})
			}
		} else if (toRRI === XRD_RRI) {
			const astrolescentPool = astrolescentTokens.find(token => token.rri === fromRRI)
			if (astrolescentPool) {
				pools.push({
					...swapServices[PoolType.ASTROLESCENT],
					name: AstrolescentPoolName,
					wallet: 'astrolescent',
				})
			}
		}
	}

	return pools
}

const actionTypeToIndentedActionType = {
	[ActionType.TRANSFER_TOKENS]: ApplicationActionType.TOKEN_TRANSFER,
	[ActionType.STAKE_TOKENS]: ApplicationActionType.STAKE_TOKENS,
	[ActionType.UNSTAKE_TOKENS]: ApplicationActionType.UNSTAKE_TOKENS,
	// [ActionType.CREATE_TOKEN]: ExtendedActionType.CREATE_TOKEN,
	// [ActionType.MINT_TOKENS]: ExtendedActionType.MINT_TOKENS,
	// [ActionType.BURN_TOKENS]: ExtendedActionType.BURN_TOKENS,
}

export const calculateTransactionFee = async (
	pool: Pool,
	fromToken: Token,
	toToken: Token,
	amount: BigNumber,
	recieve: BigNumber,
	z3usFee: BigNumber,
	z3usBurn: BigNumber,
	minimum: boolean,
	// @TODO: type these
	buildTransactionFromActions: any,
	createMessage: any,
	account: AccountT,
	transactionData?: {
		actions: Array<RawAction>
		message: string
	},
): Promise<{
	transaction: BuiltTransactionReadyToSign | null
	fee: BigNumber
	transactionFeeError: TSwapError
}> => {
	let transaction = null
	let fee = new BigNumber(0)
	let transactionFeeError = null

	if (amount.eq(0) || !pool?.wallet || !fromToken?.rri || !toToken?.rri) {
		return { transaction, fee, transactionFeeError }
	}

	try {
		const rriResult = ResourceIdentifier.fromUnsafe(fromToken.rri)
		if (rriResult.isErr()) {
			throw rriResult.error
		}

		const actions = []
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
			case PoolType.ASTROLESCENT:
				if (transactionData) {
					actions.push(
						...transactionData.actions.map(
							(action): IntendedAction => ({
								type: actionTypeToIndentedActionType[action.type],
								from_account: action?.from_account?.address
									? parseAccountAddress(action.from_account.address)
									: undefined,
								to_account: action?.to_account?.address ? parseAccountAddress(action.to_account.address) : undefined,
								from_validator: action?.from_validator?.address
									? parseValidatorAddress(action.from_validator.address)
									: undefined,
								to_validator: action?.to_validator?.address
									? parseValidatorAddress(action.to_validator.address)
									: undefined,
								amount: action?.amount?.value ? parseAmount(action.amount.value) : undefined,
								rri: action?.amount?.token_identifier?.rri
									? parseResourceIdentifier(action.amount.token_identifier.rri)
									: undefined,
							}),
						),
					)
					plainText = transactionData.message
				}
				break
			default:
				throw new Error(`Invalid pool: ${pool.name} - ${pool.type}`)
		}

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

		if (pool.type !== PoolType.ASTROLESCENT) {
			const toResult = AccountAddress.fromUnsafe(pool.wallet)
			if (toResult.isErr()) {
				throw toResult.error
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
		}

		let message: string
		if (plainText) {
			message = await createMessage(plainText)
		}

		const { transaction: builtTransaction, fee: builtFee } = await buildTransactionFromActions(actions, message)

		transaction = builtTransaction
		fee = new BigNumber(builtFee).shiftedBy(-18)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error(error)
		const errorMessageStr = (error?.message || error).toString().trim()
		const errorType = getSwapError(errorMessageStr)
		if (errorType) {
			transactionFeeError = errorType
		}
	}

	return { transaction, fee, transactionFeeError }
}
