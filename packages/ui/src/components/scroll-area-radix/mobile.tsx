import React, { PropsWithChildren } from 'react'

import { IScrollAreaRadix, ScrollAreaRadix } from 'ui/src/components/scroll-area-radix'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

const MobileScrollArea: React.FC<PropsWithChildren<IScrollAreaRadix>> = ({ children, ...props }) => {
	const isMobile = useIsMobileWidth()

	return (
		<ScrollAreaRadix {...props} showTopScrollShadow={false} disabled={!isMobile}>
			{children}
		</ScrollAreaRadix>
	)
}

export default MobileScrollArea
