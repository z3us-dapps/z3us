import Loader from 'packages/ui/src/components/loader'
import React from 'react'
import { Navigate, useLocation, useOutlet } from 'react-router-dom'

import { useIsPaired } from '@src/hooks/use-is-paired'

const pairingRoute = '/radix/pairing'

const Pairing: React.FC = () => {
	const location = useLocation()
	const { isPaired, isLoading } = useIsPaired()

	const outlet = useOutlet()

	if (isLoading) return <Loader />
	if (!isPaired && location.pathname !== pairingRoute) return <Navigate to={pairingRoute} />

	return outlet
}

export default Pairing
