import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Link } from 'ui/src/components/router-link'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { getShortAddress } from 'ui/src/utils/string-utils'

const messages = defineMessages({
	account: {
		id: 'accounts.breadcrumbs.account',
		defaultMessage: 'Account',
	},
})

export const AccountBreadcrumb: React.FC = () => {
	const intl = useIntl()
	const { accountId = '-' } = useParams()
	const accounts = useWalletAccounts()

	return (
		<Link to={`/accounts/${accounts[accountId]?.address || '-'}`}>
			{accounts[accountId]?.name ||
				getShortAddress(accounts[accountId]?.address) ||
				intl.formatMessage(messages.account)}
		</Link>
	)
}
