import type React from 'react'

import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'

const at = new Date()

// bootstrap balances cache for current account to improve user experience on unlock
export const BootstrapBalances: React.FC = () => {
	useBalances(useSelectedAccounts(), at)

	return null
}

export default BootstrapBalances
