import React from 'react'

import { AccountSearch } from 'ui/src/containers/accounts/account-search'
import { AccountTransaction } from 'ui/src/containers/accounts/account-transaction'

import { AccountsDesktop } from './desktop'
import { AccountsMobile } from './mobile'

interface IAccountsProps {
	isMobile: boolean
}

export const Accounts = (props: IAccountsProps): React.JSX.Element => {
	const { isMobile } = props

	return (
		<>
			{isMobile ? <AccountsMobile /> : <AccountsDesktop />}
			<AccountTransaction />
			<AccountSearch />
		</>
	)
}
