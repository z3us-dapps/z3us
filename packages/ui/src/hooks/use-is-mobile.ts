import screensJson from 'design/tokens/foundation/screens.json'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useEventListener } from 'usehooks-ts'

const DEBOUNCE_TIMEOUT = 50

const getIsMobileWidth = (): boolean => {
	const windowWidth = window.innerWidth
	const mobileBreakPoint = screensJson.screens.md.value.replace('px', '')
	return windowWidth < parseInt(mobileBreakPoint, 10)
}

export const useIsMobileWidth = () => {
	const [isMobileWidth, setIsMobileWidth] = useState<boolean>(getIsMobileWidth())

	const debouncedResizeHandler = useDebouncedCallback(() => {
		setIsMobileWidth(getIsMobileWidth())
	}, DEBOUNCE_TIMEOUT)

	useEventListener('resize', debouncedResizeHandler)

	return isMobileWidth
}
