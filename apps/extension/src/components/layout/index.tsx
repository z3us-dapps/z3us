import React from 'react'
import { useLocation } from 'react-router-dom'

import { FallbackLoading } from 'ui/src/components/fallback-renderer'

import { useIsUnlocked } from '@src/hooks/use-is-unlocked'

import SetupChecker from './setup'
import Unlock from './unlock'

const Layout: React.FC = () => {
	const location = useLocation()
	const { isUnlocked, isLoading, reload } = useIsUnlocked()

	if (!location.pathname.startsWith('/keystore/new')) {
		if (isLoading) return <FallbackLoading />
		if (!location.pathname.startsWith('/keystore/new') && !isUnlocked) return <Unlock onUnlock={reload} />
	}

	return <SetupChecker />
}

export default Layout
