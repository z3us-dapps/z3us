/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { AccountTransaction } from '@src/containers/playground/containers/accounts/account-transaction'

import { AccountsDesktop } from './desktop'
import { AccountsMobile } from './mobile'

export const Accounts: React.FC = () => {
	// eslint-diable-next-line
	const isMobile = true
	return (
		<>
			{/* @TODO: fix this rendering with ts hooks and do not use css https://usehooks-ts.com/ */}
			<AccountsMobile />
			<AccountsDesktop />
			<AccountTransaction />
		</>
	)
}
