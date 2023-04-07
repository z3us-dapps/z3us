/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const ChevronDownIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				d="M8,10.8c-0.3,0-0.5-0.1-0.7-0.3L3.8,6.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0L8,8.4l2.8-2.8c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4
	l-3.5,3.5C8.5,10.7,8.3,10.8,8,10.8z"
			/>
		</svg>
	),
)

export default ChevronDownIcon
