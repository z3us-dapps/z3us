import { useEffect, useRef } from 'react'
import { type Location, useLocation } from 'react-router-dom'

const animatedKeys = ['transfer', 'staking', 'swap', 'settings']

export const useLocationKey = (): {
	location: Location
	locationKey: string
} => {
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []
	const key = locationArr[2] ?? ''
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
