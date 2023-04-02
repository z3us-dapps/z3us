import React from 'react'

import { AccountsDesktop } from './desktop'
import { AccountsMobile } from './mobile'

export const Accounts: React.FC = () => (
	<>
		{/* @TODO: fix this rendering with ts hooks and do not use css https://usehooks-ts.com/ */}
		<AccountsMobile />
		<AccountsDesktop />
	</>
)
