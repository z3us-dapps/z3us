import { useEffect, useRef } from 'react'

export default function useTimeout(callback: Function, delay: number) {
	const timeoutRef = useRef(null)
	const savedCallback = useRef(callback)

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	// eslint-disable-next-line consistent-return
	useEffect(() => {
		const tick = () => savedCallback.current()
		if (typeof delay === 'number') {
			timeoutRef.current = window.setTimeout(tick, delay)
			return () => window.clearTimeout(timeoutRef.current)
		}
	}, [delay])

	return timeoutRef
}
