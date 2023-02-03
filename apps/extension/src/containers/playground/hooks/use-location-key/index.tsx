import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const useLocationKey = () => {
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []
	const key = locationArr[2] ?? ''
	const animatedKeys = ['transfer', 'staking', 'settings', 'swap']
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
