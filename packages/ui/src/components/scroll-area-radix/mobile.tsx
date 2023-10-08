import type { PropsWithChildren } from 'react'
import React from 'react'
import { useParams } from 'react-router-dom'

import type { IScrollAreaRadix } from 'ui/src/components/scroll-area-radix'
import { ScrollAreaRadix } from 'ui/src/components/scroll-area-radix'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

const MobileScrollArea: React.FC<PropsWithChildren<IScrollAreaRadix>> = ({ children, ...props }) => {
	const isMobile = useIsMobileWidth()
	const { resourceId } = useParams()

	return (
		<ScrollAreaRadix {...props} showTopScrollShadow={!!resourceId} disabled={!isMobile}>
			{children}
		</ScrollAreaRadix>
	)
}

export default MobileScrollArea
