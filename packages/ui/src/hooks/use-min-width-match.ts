import { useEffect, useState } from 'react'

export const useMinWidthMatch = (minWidth: string | number): boolean => {
	const [isMatch, setIsMatch] = useState<boolean>(true)

	useEffect(() => {
		const mql = window.matchMedia(`(min-width: ${minWidth})`)
		const listener = (event: MediaQueryListEvent) => setIsMatch(event.matches)

		mql.addEventListener('change', listener)
		return () => {
			mql.removeEventListener('change', listener)
		}
	}, [])

	return isMatch
}
