import React from 'react'

import { AccountsDesktop } from './desktop'
import { AccountsMobile } from './mobile'

export const Accounts: React.FC = () => (
	<>
		<AccountsMobile />
		<AccountsDesktop />
	</>
)
