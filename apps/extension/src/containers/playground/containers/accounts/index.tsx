import React from 'react'
import { useHashLocation } from '@src/hooks/use-hash-location'
// import { useIsMobileWidth } from '@src/hooks/use-is-mobile'
import { AccountsDesktop } from './components/desktop'
import { AccountsMobile } from './components/mobile'

export const Accounts: React.FC = () => (
	<>
		<AccountsDesktop />
		<AccountsMobile />
	</>
)
