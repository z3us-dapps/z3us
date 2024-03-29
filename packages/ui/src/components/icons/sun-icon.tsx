/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const SunIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
			<circle cx="12" cy="12" r="3.25" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
			<path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2.75V4.25" />
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M17.25 6.75L16.0659 7.93416"
			/>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M21.25 12.0001L19.75 12.0001"
			/>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M17.25 17.2501L16.0659 16.066"
			/>
			<path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19.75V21.25" />
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M7.9341 16.0659L6.74996 17.25"
			/>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M4.25 12.0001L2.75 12.0001"
			/>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M7.93405 7.93423L6.74991 6.75003"
			/>
		</svg>
	),
)

export default SunIcon
