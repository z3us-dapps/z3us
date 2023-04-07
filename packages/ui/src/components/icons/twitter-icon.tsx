/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const TwitterIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				d="M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0z M14.8,7.5c0,0.1,0,0.2,0,0.3
	c0,3.3-2.5,7.1-7.1,7.1c-1.4,0-2.7-0.4-3.8-1.1c0.2,0,0.4,0,0.6,0c1.2,0,2.2-0.4,3.1-1.1c-1.1,0-2-0.7-2.3-1.7
	c0.4,0.1,0.7,0.1,1.1,0c-1.2-0.2-2-1.3-2-2.4v0c0.3,0.2,0.7,0.3,1.1,0.3C4.9,8.4,4.5,7.6,4.5,6.8c0-0.5,0.1-0.9,0.3-1.2
	C6.1,7.1,7.9,8,9.9,8.1c-0.4-1.7,0.9-3,2.4-3c0.7,0,1.4,0.3,1.8,0.8c0.6-0.1,1.1-0.3,1.6-0.6c-0.2,0.6-0.6,1.1-1.1,1.4
	c0.5-0.1,1-0.2,1.4-0.4C15.7,6.7,15.3,7.2,14.8,7.5z"
			/>
		</svg>
	),
)

export default TwitterIcon
