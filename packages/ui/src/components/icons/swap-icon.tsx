/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const SwapIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M19.2,11H4.8C4.3,11,4,10.7,4,10.2s0.3-0.8,0.8-0.8h12.7l-4.2-4.2c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l5.5,5.5
	c0.2,0.2,0.3,0.5,0.2,0.8C19.8,10.8,19.6,11,19.2,11z"
			/>
			<path
				fill={color}
				d="M10.2,20c-0.2,0-0.4-0.1-0.5-0.2l-5.5-5.5c-0.2-0.2-0.3-0.5-0.2-0.8S4.4,13,4.8,13h14.5c0.4,0,0.8,0.3,0.8,0.8
	s-0.3,0.8-0.8,0.8H6.6l4.2,4.2c0.3,0.3,0.3,0.8,0,1.1C10.6,19.9,10.4,20,10.2,20z"
			/>
		</svg>
	),
)

export default SwapIcon
