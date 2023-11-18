import type { PropsWithChildren } from 'react'
import React from 'react'

import type { IScrollAreaRadix } from 'ui/src/components/scroll-area-radix'
import { ScrollAreaRadix } from 'ui/src/components/scroll-area-radix'

const MobileScrollArea: React.FC<PropsWithChildren<IScrollAreaRadix>> = ({
	children,
	showTopScrollShadow = false,
	disabled = false,
	...props
}) => (
	<ScrollAreaRadix showTopScrollShadow={showTopScrollShadow} {...props} disabled={disabled}>
		{children}
	</ScrollAreaRadix>
)

export default MobileScrollArea
