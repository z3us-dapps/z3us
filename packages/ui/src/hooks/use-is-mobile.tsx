import { screens } from 'design/tokens/foundation/screens.json'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useEventListener } from 'usehooks-ts'

const getIsMobileWidth = (): boolean => {
	const windowWidth = window.innerWidth
	const mobileBreakPoint = screens.md.value.replace('px', '')
	return windowWidth < parseInt(mobileBreakPoint, 10)
}

export const useIsMobileWidth = () => {
	const [isMobileWidth, setIsMobileWidth] = useState<boolean>(getIsMobileWidth())

	const debouncedResizeHandler = useDebouncedCallback(() => {
		setIsMobileWidth(getIsMobileWidth())
	}, 50)

	useEventListener('resize', debouncedResizeHandler)

	return isMobileWidth
}
