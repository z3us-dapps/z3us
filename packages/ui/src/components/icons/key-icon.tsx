/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const KeyIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10,1.3c2.1,0,3.8,1.7,3.8,3.7S12.1,8.8,10,8.8S6.3,7.1,6.3,5S7.9,1.3,10,1.3z M10,0C7.2,0,5,2.2,5,5s2.2,5,5,5s5-2.2,5-5
	S12.8,0,10,0z M6.6,10.2l-0.9,1h-2v1.2H2.5v1.2H1.2v-1.4l3.7-3.7C4.7,8.3,4.5,7.9,4.3,7.5L0,11.9V15h3.7v-1.2H5v-1.2h1.2l1.5-1.7
	C7.4,10.7,7,10.5,6.6,10.2z M11.2,3.1c0.3,0,0.6,0.3,0.6,0.6s-0.3,0.6-0.6,0.6s-0.6-0.3-0.6-0.6S10.9,3.1,11.2,3.1z M11.2,2.5
	c-0.7,0-1.2,0.6-1.2,1.2S10.6,5,11.2,5c0.7,0,1.2-0.6,1.2-1.2S11.9,2.5,11.2,2.5z"
			/>
		</svg>
	),
)

export default KeyIcon
