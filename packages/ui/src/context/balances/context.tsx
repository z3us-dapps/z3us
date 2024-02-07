import { createContext } from 'react'

import type { Balances } from 'ui/src/types/balances'

const emptyState: Balances = {
	balances: [],
	totalValue: 0,
	totalChange: 0,
	totalXrdValue: 0,

	fungibleBalances: [],
	fungibleValue: 0,
	fungibleChange: 0,
	fungibleXrdValue: 0,

	nonFungibleBalances: [],
	nonFungibleValue: 0,
	nonFungibleChange: 0,
	nonFungibleXrdValue: 0,

	tokensBalances: [],
	tokensValue: 0,
	tokensChange: 0,
	tokensXrdChange: 0,

	nftsBalances: [],
	nftsValue: 0,
	nftsChange: 0,
	nftsXrdValue: 0,

	liquidityPoolTokensBalances: [],
	liquidityPoolTokensValue: 0,
	liquidityPoolTokensChange: 0,
	liquidityPoolTokensXrdValue: 0,

	poolUnitsBalances: [],
	poolUnitsValue: 0,
	poolUnitsChange: 0,
	poolUnitsXrdValue: 0,
}

export const BalancesContext = createContext<Balances>(emptyState)
