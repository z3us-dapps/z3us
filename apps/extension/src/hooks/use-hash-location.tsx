import { useCallback, useEffect, useRef, useState } from 'react'
import type { BaseLocationHook } from 'wouter'
import makeMatcher from 'wouter/matcher'

// ---------------- hash support ------------------------

// returns the current hash location in a normalized form
// (excluding the leading '#' symbol)
const currentLocation = (base, path = window.location.hash.replace('#', '')) =>
	!path.toLowerCase().indexOf(base.toLowerCase()) ? path.slice(base.length) || '/' : `~${path}`

export const useHashLocation: BaseLocationHook = ({ base = '' } = {}) => {
	const [loc, setLoc] = useState<string>(currentLocation(base))
	const prevHash = useRef(loc)

	useEffect(() => {
		// this function is called whenever the hash changes
		const handler = () => {
			const currHash = currentLocation(base)
			if (prevHash.current !== currHash) {
				prevHash.current = currHash
				setLoc(currHash)
			}
		}

		// subscribe to hash changes
		window.addEventListener('hashchange', handler)
		return () => window.removeEventListener('hashchange', handler)
	}, [base])

	const navigate = useCallback(
		to => {
			window.location.hash = to[0] === '~' ? to.slice(1) : base + to
		},
		[base],
	)

	return [loc, navigate]
}

/*
 * A custom routing matcher function that supports multipath routes
 */
const defaultMatcher = makeMatcher()

export const multipathMatcher = (patterns, path) => {
	// eslint-disable-next-line no-restricted-syntax
	for (const pattern of [patterns].flat()) {
		const [match, params] = defaultMatcher(pattern, path)
		if (match) return [match, params]
	}
	return [false, null]
}
