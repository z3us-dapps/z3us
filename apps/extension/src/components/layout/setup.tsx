import React, { useEffect } from 'react'
import { useLocation, useNavigate, useOutlet } from 'react-router-dom'

import { FallbackLoading } from 'ui/src/components/fallback-renderer'

import { useIsSetUpComplete } from '@src/hooks/use-is-setup-complete'

const SetupChecker: React.FC = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { isComplete, isLoading, redirect } = useIsSetUpComplete()

	useEffect(() => {
		if (!isComplete && !location.pathname.startsWith('/keystore')) navigate(redirect)
	}, [isComplete])

	const outlet = useOutlet()

	if (isLoading) return <FallbackLoading />

	return outlet
}

export default SetupChecker
