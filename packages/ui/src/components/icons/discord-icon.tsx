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
			<g>
				<path
					fill={color}
					d="M7.7,9.1c-0.7,0-1.3,0.6-1.3,1.4s0.6,1.4,1.3,1.4c0.7,0,1.3-0.6,1.3-1.4C9,9.8,8.4,9.1,7.7,9.1z"
				/>
				<path
					fill={color}
					d="M10,0C4.4,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0z M16.9,13.5c-1.2,0.9-2.4,1.4-3.5,1.8
			c-0.3-0.4-0.5-0.8-0.8-1.2c0.4-0.2,0.8-0.3,1.2-0.6c-0.1-0.1-0.2-0.1-0.3-0.2c-2.3,1.1-4.8,1.1-7.1,0c-0.1,0.1-0.2,0.2-0.3,0.2
			c0.4,0.2,0.8,0.4,1.2,0.6c-0.2,0.4-0.5,0.8-0.8,1.2c-1.2-0.4-2.3-0.9-3.5-1.8c-0.2-2.6,0.2-5.2,2.1-7.9C6,5.2,7,4.9,8,4.7
			c0.1,0.2,0.3,0.5,0.4,0.7c1.1-0.2,2.1-0.2,3.2,0c0.1-0.2,0.2-0.5,0.4-0.7c1,0.2,2,0.5,2.9,0.9C16.5,7.9,17.2,10.5,16.9,13.5z"
				/>
				<path
					fill={color}
					d="M12.3,9.1c-0.7,0-1.3,0.6-1.3,1.4s0.6,1.4,1.3,1.4c0.7,0,1.3-0.6,1.3-1.4C13.6,9.8,13,9.1,12.3,9.1z"
				/>
			</g>
		</svg>
	),
)

export default TelegramIcon
