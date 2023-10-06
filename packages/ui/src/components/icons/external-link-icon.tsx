/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const ExternalLinkIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M1.5,0C0.7,0,0,0.7,0,1.5v13.1C0,15.3,0.7,16,1.5,16h13.1c0.8,0,1.5-0.7,1.5-1.5V9.5c0-0.4-0.3-0.7-0.7-0.7
	c-0.4,0-0.7,0.3-0.7,0.7v5.1H1.5V1.5h5.1c0.4,0,0.7-0.3,0.7-0.7S6.9,0,6.5,0H1.5z M15.8,0.2c0.1,0.1,0.1,0.2,0.2,0.2
	C16,0.5,16,0.6,16,0.7v0v0v4.4c0,0.4-0.3,0.7-0.7,0.7c-0.4,0-0.7-0.3-0.7-0.7V2.5L7.1,10c-0.3,0.3-0.7,0.3-1,0c-0.3-0.3-0.3-0.7,0-1
	l7.5-7.5h-2.6c-0.4,0-0.7-0.3-0.7-0.7S10.5,0,10.9,0h4.4h0c0.1,0,0.2,0,0.3,0.1C15.6,0.1,15.7,0.1,15.8,0.2z"
			/>
		</svg>
	),
)

export default ExternalLinkIcon
