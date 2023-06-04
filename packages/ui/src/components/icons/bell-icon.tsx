/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const BellIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M17.25 12V10C17.25 7.1005 14.8995 4.75 12 4.75C9.10051 4.75 6.75 7.10051 6.75 10V12L4.75 16.25H19.25L17.25 12Z"
			/>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M9 16.75C9 16.75 9 19.25 12 19.25C15 19.25 15 16.75 15 16.75"
			/>
		</svg>
	),
)

export default BellIcon
