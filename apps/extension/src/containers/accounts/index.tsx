import React from 'react'

import { AccountSearch } from '@src/containers/accounts/account-search'
import { AccountTransaction } from '@src/containers/accounts/account-transaction'

import { AccountsDesktop } from './desktop'
import { AccountsMobile } from './mobile'

interface IAccountsRequiredProps {
	isMobile: boolean
}

interface IAccountsOptionalProps { }

interface IAccountsProps extends IAccountsRequiredProps, IAccountsOptionalProps { }

const defaultProps: IAccountsOptionalProps = {}

export const Accounts = (props: IAccountsProps): JSX.Element => {
	const { isMobile } = props

	return (
		<>
			{isMobile ? <AccountsMobile /> : <AccountsDesktop />}
			<AccountTransaction />
			<AccountSearch />
			<p>
				Nascetur sapien cras metus vestibulum arcu vel enim dui vestibulum dignissim tincidunt ultrices pellentesque. Sit dolor hac, platea aliquam pellentesque velit ipsum. Efficitur nullam eget eget ullamcorper metus vestibulum nulla tempus, mus vel praesent in tellus nulla, lacus dui mus vitae ipsum nunc nullam in dolor tristique. Ornare laoreet morbi quam maximus eu pellentesque lobortis eu donec et pellentesque tristique congue nullam, luctus tincidunt vel aliquet nisl vivamus ultrices, fringilla. Suspendisse ac arcu, lacus nullam est rutrum urna consectetur eget vel laoreet id laoreet porttitor praesent elit eget nullam ante vitae tempor erat diam amet id elementum elit dignissim.
			</p>
		</>
	)
}

Accounts.defaultProps = defaultProps
