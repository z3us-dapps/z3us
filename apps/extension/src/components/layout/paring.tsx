import React from 'react'
import { Navigate, useLocation, useOutlet } from 'react-router-dom'

import Loader from 'ui/src/components/loader'

import { useIsPaired } from '@src/hooks/use-is-paired'

const pairingRoute = '/keystore/new/radix'

const Pairing: React.FC = () => {
	const location = useLocation()
	const { isPaired, isLoading } = useIsPaired()

	const outlet = useOutlet()

	if (isLoading) return <Loader />
	if (!isPaired && !location.pathname.startsWith('/keystore/new')) return <Navigate to={pairingRoute} />

	return outlet
}

export default Pairing
