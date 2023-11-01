import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { useSharedStore } from 'ui/src/hooks/use-store'

import { useIsUnlocked } from '@src/hooks/use-is-unlocked'

import SetupChecker from './setup'
import Unlock from './unlock'

const Layout: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { isUnlocked, isLoading, reload } = useIsUnlocked()

	const { selectedKeystoreId } = useSharedStore(state => ({
		selectedKeystoreId: state.selectedKeystoreId,
	}))

	useEffect(() => {
		if (!isLoading && !selectedKeystoreId) navigate('/keystore/new')
	}, [selectedKeystoreId, isLoading])

	if (!location.pathname.startsWith('/keystore/new')) {
		if (isLoading) return <FallbackLoading />
		if (!isUnlocked) return <Unlock onUnlock={reload} />
	}

	return <SetupChecker />
}

export default Layout
