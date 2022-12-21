import React from 'react'
import { useHashLocation } from '@src/hooks/use-hash-location'
// import { useIsMobileWidth } from '@src/hooks/use-is-mobile'
import { AccountsDesktop } from './components/desktop'
import { AccountsMobile } from './components/mobile'

export const Accounts: React.FC = () => {
	const BASE = '/accounts'
	const [location] = useHashLocation()
	const loc = location.replace(BASE, '')
	// const isMobileWidth = useIsMobileWidth()

	return (
		<>
			<AccountsDesktop base={BASE} location={loc} />
			<AccountsMobile />
		</>
	)
}
