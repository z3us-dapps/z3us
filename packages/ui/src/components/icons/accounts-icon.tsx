/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const AccountsIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			xmlns="http://www.w3.org/2000/svg"
			fill={color}
			{...props}
			ref={forwardedRef}
		>
			<g>
				<ellipse cx="8" cy="3" rx="6.7" ry="3" />
				<path d="M1.3,12.1V13c0,1.7,3.1,3,6.7,3c3.6,0,6.7-1.3,6.7-3v-0.9C13.1,13.4,10.5,14,8,14S2.9,13.4,1.3,12.1z" />
				<path d="M1.3,5.5v0.9c0,1.7,3.1,3,6.7,3c3.6,0,6.7-1.3,6.7-3V5.5C13.1,6.7,10.5,7.3,8,7.3S2.9,6.7,1.3,5.5z" />
				<path d="M1.3,8.8v0.9c0,1.7,3.1,3,6.7,3c3.6,0,6.7-1.3,6.7-3V8.8c-1.5,1.2-4.1,1.9-6.7,1.9S2.9,10,1.3,8.8z" />
			</g>
		</svg>
	),
)

export default AccountsIcon
