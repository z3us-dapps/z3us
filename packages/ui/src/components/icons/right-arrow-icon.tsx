/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const RightArrowIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M4.8,12.7h12.6l-4.1,4c-0.3,0.3-0.3,0.8,0,1.1c0.3,0.3,0.8,0.3,1.1,0l5.5-5.2c0.1-0.1,0.2-0.3,0.2-0.5s-0.1-0.4-0.2-0.5
	l-5.5-5.2C14.1,6.1,13.9,6,13.8,6c-0.2,0-0.4,0.1-0.5,0.2c-0.3,0.3-0.3,0.8,0,1.1l4.1,4H4.8C4.3,11.2,4,11.6,4,12S4.3,12.7,4.8,12.7
	z"
			/>
		</svg>
	),
)

export default RightArrowIcon
