import React from 'react'
import { Navigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { MobileStackedNavigation } from 'ui/src/components/layout/mobile-stacked-navigation'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { SETTINGS_MENU } from '../components/navigation'

const Home: React.FC = () => {
	const isMobile = useIsMobileWidth()

	if (!isMobile) {
		return <Navigate to="/settings/general" />
	}

	return (
		<Box component="ul" paddingX="small">
			<MobileStackedNavigation menu={SETTINGS_MENU} />
		</Box>
	)
}

export default Home
