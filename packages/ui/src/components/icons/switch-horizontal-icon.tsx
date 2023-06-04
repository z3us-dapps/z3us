/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const SwitchHorizontalIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} ref={forwardedRef}>
			<path
				d="M8.25 11.25L4.75 8L8.25 4.75"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M4.75 8H15.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path
				d="M15.75 12.75L19.25 16L15.75 19.25"
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M19.25 16H8.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	),
)

export default SwitchHorizontalIcon
