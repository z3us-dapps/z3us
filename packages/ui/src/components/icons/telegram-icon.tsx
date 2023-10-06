/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const TelegramIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M24,12c0,6.6-5.4,12-12,12C5.4,24,0,18.6,0,12C0,5.4,5.4,0,12,0C18.6,0,24,5.4,24,12z M12.4,8.9
	c-1.2,0.5-3.5,1.5-7,3c-0.6,0.2-0.9,0.4-0.9,0.7c0,0.4,0.4,0.5,1,0.7c0.1,0,0.2,0.1,0.3,0.1c0.6,0.2,1.4,0.4,1.9,0.4
	c0.4,0,0.8-0.2,1.3-0.5c3.3-2.2,5-3.3,5.1-3.3c0.1,0,0.2,0,0.2,0c0.1,0.1,0.1,0.2,0.1,0.2c0,0.2-1.8,1.9-2.8,2.7
	c-0.3,0.3-0.5,0.5-0.5,0.5c-0.1,0.1-0.2,0.2-0.3,0.3c-0.6,0.5-1,1,0,1.6c0.5,0.3,0.9,0.6,1.3,0.9c0.4,0.3,0.9,0.6,1.4,0.9
	c0.1,0.1,0.3,0.2,0.4,0.3c0.5,0.4,0.9,0.7,1.5,0.6c0.3,0,0.7-0.3,0.8-1.2c0.4-2.1,1.2-6.7,1.4-8.6c0-0.2,0-0.4,0-0.5
	c0-0.1,0-0.2-0.2-0.3c-0.1-0.1-0.4-0.1-0.5-0.1C16.5,7.2,15.8,7.5,12.4,8.9z"
			/>
		</svg>
	),
)

export default TelegramIcon
