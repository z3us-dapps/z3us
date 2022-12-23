import React from 'react'
import { AccountsDesktop } from './components/desktop'
import { AccountsMobile } from './components/mobile'

export const Accounts: React.FC = () => (
	<>
		<AccountsDesktop />
		<AccountsMobile />
	</>
)
