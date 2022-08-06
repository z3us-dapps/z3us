/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const HomeIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24 "
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				d="M19.7,9.2l-7.2-5c-0.3-0.2-0.6-0.2-0.9,0l-7.2,5C4.3,9.3,4.1,9.6,4.1,9.8l0,7.4c-0.1,0.7,0.1,1.4,0.6,1.9
	C5.2,19.7,6,20,6.8,20h3h4.5h3c1.5,0,2.8-1.2,2.8-2.8V9.8C20,9.6,19.9,9.3,19.7,9.2z M10.5,18.5v-2.8c0-0.7,0.6-1.2,1.2-1.2h0.5
	c0.7,0,1.2,0.6,1.2,1.2v2.8H10.5z M18.5,17.2c0,0.7-0.6,1.2-1.2,1.2H15v-2.8c0-1.5-1.2-2.8-2.8-2.8h-0.5C10.3,13,9,14.2,9,15.7v2.8
	H6.8c-0.4,0-0.7-0.1-0.9-0.3c-0.2-0.2-0.2-0.4-0.2-0.8v-7.1l6.5-4.5l6.4,4.5V17.2z"
			/>
		</svg>
	),
)

export default HomeIcon
