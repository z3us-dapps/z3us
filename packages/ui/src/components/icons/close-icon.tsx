/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const CloseIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fill={color}
			{...props}
			ref={forwardedRef}
		>
			<path
				d="M13.4,12L18,7.5c0.4-0.4,0.4-1,0-1.4s-1-0.4-1.4,0L12,10.6L7.5,6C7.1,5.7,6.4,5.7,6,6s-0.4,1,0,1.4l4.5,4.5L6,16.5
	c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l4.5-4.5l4.5,4.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3
	c0.4-0.4,0.4-1,0-1.4L13.4,12z"
			/>
		</svg>
	),
)

export default CloseIcon
