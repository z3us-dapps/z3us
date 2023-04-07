import BigNumber from 'bignumber.js'

import { XRD_RRI } from '@src/config'
import { Pool, Token } from '@src/types'

export type Quote = {
	amount: BigNumber
	receive: BigNumber
	fee: BigNumber
}

export type CaviarPool = {
	id: string
	name: string
	wallet: string
	balances: { [rri: string]: number }
}

export type CaviarPoolsResponse = CaviarPool[]

export const PoolName = 'CaviarSwap'

const zero = new BigNumber(0)
const one = new BigNumber(1)
const caviarNetworkFee = one.dividedBy(10)

export class CaviarService {
	private baseURL: string = 'https://pjhht6w8p9.execute-api.eu-west-2.amazonaws.com/prod'

	private options: RequestInit = {
		method: 'GET',
		// mode: 'no-cors',
		headers: {
			'Content-Type': 'application/json',
		},
	}

	getPools = async (): Promise<CaviarPoolsResponse> => {
		const response = await fetch(`${this.baseURL}/pools-web`, this.options)
		if (response.status !== 200) {
			throw new Error(`Invalid request: ${response.status} recieved`)
		}

		return response.json()
	}
}

export const calculateSwap = (
	pools: Pool[],
	pool: Pool,
	amount: BigNumber,
	from: Token,
	to: Token,
	floopBalance: BigNumber,
): Quote => {
	let receive = zero
	let fee = zero

	const caviarPool = pools.find(cp => cp.id === pool.id)
	const balanceXRD = new BigNumber(caviarPool?.balances[XRD_RRI] || 0).shiftedBy(-18)
	const fromBalance = new BigNumber(caviarPool?.balances[from.rri] || 0).shiftedBy(-18)
	const toBalance = new BigNumber(caviarPool?.balances[to.rri] || 0).shiftedBy(-18)

	const midPrice = toBalance.dividedBy(balanceXRD)
	const constant = fromBalance.multipliedBy(toBalance)
	const networkFee = caviarNetworkFee.multipliedBy(midPrice)

	const newToBalance = constant.dividedBy(fromBalance.plus(amount))
	const amountTo = toBalance.minus(newToBalance)

	if (floopBalance.gt(0)) {
		if (floopBalance.gte(1)) {
			fee = amount.multipliedBy(1 / 1000)
		} else {
			fee = amount.multipliedBy(one.minus(floopBalance).multipliedBy(0.009).plus(0.01))
		}
	} else {
		fee = amount.multipliedBy(1 / 100)
	}

	receive = amountTo.multipliedBy(one.minus(fee)).minus(networkFee)

	return {
		amount,
		fee,
		receive,
	}
}

const service = new CaviarService()
export default service
