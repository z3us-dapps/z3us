import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { SETTINGS, STAKING, SWAP, TRANSFER } from 'ui/src/constants/routes'

export const useLocationKey = () => {
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []
	const key = locationArr[2] ?? ''
	const animatedKeys = [TRANSFER, STAKING, SWAP, SETTINGS]
	const prevHash = useRef<string | null>(null)
	const isAnimateRoute = animatedKeys.includes(key)
	const isPrevAnimateRoute = prevHash.current !== null && animatedKeys.includes(prevHash.current)

	useEffect(() => {
		if (isAnimateRoute && isPrevAnimateRoute) {
			prevHash.current = key
		}
	}, [key])

	const locationKey = !isAnimateRoute && !isPrevAnimateRoute ? prevHash.current : key

	return { location, locationKey }
}
