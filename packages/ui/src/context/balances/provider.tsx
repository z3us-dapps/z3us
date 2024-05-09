import type { PropsWithChildren } from 'react'
import React from 'react'

import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'

import { FallbackLoading } from '../../components/fallback-renderer'
import { BalancesContext } from './context'

export const BalancesProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const selectedAccounts = useSelectedAccounts()
	const { data, isLoading } = useBalances(selectedAccounts)

	if (isLoading) return <FallbackLoading />

	return <BalancesContext.Provider value={data}>{children}</BalancesContext.Provider>
}

export default BalancesProvider
