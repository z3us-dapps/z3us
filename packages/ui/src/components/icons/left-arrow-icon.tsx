/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const LeftArrowIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				d="M19.2,11.2H6.6l4.1-4c0.3-0.3,0.3-0.8,0-1.1c-0.3-0.3-0.8-0.3-1.1,0l-5.5,5.2C4.1,11.6,4,11.8,4,12s0.1,0.4,0.2,0.5l5.5,5.2
	c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2c0.3-0.3,0.3-0.8,0-1.1l-4.1-4h12.6c0.4,0,0.8-0.3,0.8-0.8S19.7,11.2,19.2,11.2z"
			/>
		</svg>
	),
)

export default LeftArrowIcon
