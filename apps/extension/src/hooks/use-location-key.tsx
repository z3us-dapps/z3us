import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { SETTINGS, STAKING, SWAP, TRANSFER } from '@src/constants'

export const useLocationKey = () => {
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []
	const key = locationArr[2] ?? ''
	const animatedKeys = [TRANSFER, STAKING, SWAP, SETTINGS]
	const prevHash = useRef(null)
	const isAnimateRoute = animatedKeys.includes(key)
	const isPrevAnimateRoute = animatedKeys.includes(prevHash.current)

	useEffect(() => {
		if (isAnimateRoute && isPrevAnimateRoute) {
			prevHash.current = key
		}
	}, [key])

	const locationKey = !isAnimateRoute && !isPrevAnimateRoute ? prevHash.current : key

	return { location, locationKey }
}
