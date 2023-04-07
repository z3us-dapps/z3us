/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const TelegramIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M10,0C4.4,0,0,4.5,0,10c0,5.5,4.5,10,10,10s10-4.5,10-10S15.5,0,10,0C10,0,10,0,10,0z M14.1,6c0.1,0,0.3,0,0.4,0.1
	c0.1,0.1,0.1,0.2,0.1,0.3c0,0.1,0,0.3,0,0.4c-0.2,1.6-0.8,5.4-1.1,7.2c-0.1,0.8-0.4,1-0.7,1c-0.6,0.1-1-0.4-1.6-0.8
	c-0.9-0.6-1.4-0.9-2.2-1.5c-1-0.6-0.3-1,0.2-1.6C9.4,11,11.9,8.7,12,8.5c0,0,0-0.1,0-0.2c-0.1-0.1-0.1,0-0.2,0
	c-0.1,0-1.5,0.9-4.2,2.8c-0.4,0.3-0.8,0.4-1.1,0.4c-0.4,0-1-0.2-1.6-0.4c-0.6-0.2-1.1-0.3-1.1-0.7c0-0.2,0.3-0.4,0.7-0.6
	c2.9-1.3,4.9-2.1,5.8-2.5C13.1,6.2,13.7,6,14.1,6z"
			/>
		</svg>
	),
)

export default TelegramIcon
