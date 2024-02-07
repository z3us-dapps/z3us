import type { PropsWithChildren } from 'react'
import React from 'react'

import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'

import { BalancesContext } from './context'

export const BalancesProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const selectedAccounts = useSelectedAccounts()
	const balances = useBalances(selectedAccounts)

	return <BalancesContext.Provider value={balances}>{children}</BalancesContext.Provider>
}

export default BalancesProvider
