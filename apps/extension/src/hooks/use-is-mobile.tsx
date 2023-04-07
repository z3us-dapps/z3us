import { screens } from 'design/tokens/foundation/screens.json'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useEventListener } from 'usehooks-ts'

export const useIsMobileWidth = () => {
	const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false)

	const debouncedResizeHandler = useDebouncedCallback(() => {
		const windowWidth = window.innerWidth
		const mobileBreakPoint = screens.md.value.replace('px', '')
		const isMobile = windowWidth < parseInt(mobileBreakPoint, 10)
		setIsMobileWidth(isMobile)
	}, 50)

	useEventListener('resize', debouncedResizeHandler)

	return isMobileWidth
}
