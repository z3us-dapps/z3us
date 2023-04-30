import React from 'react'

import { AccountTransaction } from '@src/containers/accounts/account-transaction'

import { AccountsDesktop } from './desktop'
import { AccountsMobile } from './mobile'

interface IAccountsRequiredProps {
	isMobile: boolean
}

interface IAccountsOptionalProps {}

interface IAccountsProps extends IAccountsRequiredProps, IAccountsOptionalProps {}

const defaultProps: IAccountsOptionalProps = {}

export const Accounts = (props: IAccountsProps): JSX.Element => {
	const { isMobile } = props

	return (
		<>
			{isMobile ? <AccountsMobile /> : <AccountsDesktop />}
			<AccountTransaction />
		</>
	)
}

Accounts.defaultProps = defaultProps
