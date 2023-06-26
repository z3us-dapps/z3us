import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useEventListener } from 'usehooks-ts'

const getIsMobileWidth = (): boolean => {
	const windowWidth = window.innerWidth
	const mobileBreakPoint = 768
	return windowWidth < mobileBreakPoint
}

export const useIsMobileWidth = () => {
	const [isMobileWidth, setIsMobileWidth] = useState<boolean>(getIsMobileWidth())

	const debouncedResizeHandler = useDebouncedCallback(() => {
		setIsMobileWidth(getIsMobileWidth())
	}, 50)

	useEventListener('resize', debouncedResizeHandler)

	return isMobileWidth
}
