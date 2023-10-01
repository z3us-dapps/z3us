import React from 'react'
import { Navigate, useLocation, useOutlet } from 'react-router-dom'

import { FallbackLoading } from 'ui/src/components/fallback-renderer'

import { useIsPaired } from '@src/hooks/use-is-paired'

const pairingRoute = '/keystore/new/radix'

const Pairing: React.FC = () => {
	const location = useLocation()
	const { isPaired, isLoading } = useIsPaired()

	const outlet = useOutlet()

	if (isLoading) return <FallbackLoading />
	if (!isPaired && !location.pathname.startsWith('/keystore')) return <Navigate to={pairingRoute} />

	return outlet
}

export default Pairing
