import React from 'react'
import { useParams } from 'react-router-dom'

import { Link } from 'ui/src/components/router-link'
import Translation from 'ui/src/components/translation'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { getShortAddress } from 'ui/src/utils/string-utils'

export const AccountBreadcrumb: React.FC = () => {
	const { accountId = '-' } = useParams()
	const accounts = useWalletAccounts()

	return (
		<Link to={`/accounts/${accounts[accountId]?.address || '-'}`}>
			{accounts[accountId]?.name || getShortAddress(accounts[accountId]?.address) || (
				<Translation text="accounts.breadcrumbs.account" />
			)}
		</Link>
	)
}
