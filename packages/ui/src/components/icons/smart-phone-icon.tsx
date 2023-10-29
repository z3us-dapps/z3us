/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const SmartPhoneIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H13.25C14.3546 4.75 15.25 5.64543 15.25 6.75V17.25C15.25 18.3546 14.3546 19.25 13.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"
			/>
			<path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.25 16.75H9.75" />
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M18.75 14.25C18.75 14.25 19.25 13.3438 19.25 12C19.25 10.6562 18.75 9.75 18.75 9.75"
			/>
		</svg>
	),
)

export default SmartPhoneIcon
