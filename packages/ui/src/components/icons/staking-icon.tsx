/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const StakingIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M18,12.4c-0.3,0-0.6-0.2-0.7-0.5c-0.2-0.4,0-0.8,0.4-1c0.7-0.3,0.8-0.5,0.8-0.5l0-2.2c-2.3,1-6.7,1-9,0v1
	c0,0.4-0.3,0.8-0.8,0.8S8,9.7,8,9.2V6.5C8,4.8,11,4,14,4s6,0.8,6,2.5v4c0,0.5-0.3,1.3-1.7,1.8C18.2,12.4,18.1,12.4,18,12.4z
	 M9.5,6.5c0.3,0.3,1.8,1,4.5,1c2.7,0,4.3-0.7,4.5-1c-0.2-0.3-1.7-1-4.5-1C11.3,5.5,9.8,6.2,9.5,6.5z"
			/>
			<path
				fill={color}
				d="M10,20c-3,0-6-0.8-6-2.5v-4c0-1.7,3-2.5,6-2.5s6,0.8,6,2.5v4C16,19.2,13,20,10,20z M5.5,15.2v2.3c0.1,0.3,1.7,1,4.5,1
	s4.4-0.7,4.5-1l0-2.2C12.2,16.3,7.8,16.3,5.5,15.2z M5.5,13.5c0.2,0.3,1.7,1,4.5,1c2.7,0,4.2-0.7,4.5-1c-0.3-0.3-1.8-1-4.5-1
	C7.3,12.5,5.7,13.2,5.5,13.5z"
			/>
		</svg>
	),
)

export default StakingIcon
