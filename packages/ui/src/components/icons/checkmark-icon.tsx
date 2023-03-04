/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const CheckmarkIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
			<path fill={color} d="M11,4H9v5H4v2h5v5h2v-5h5V9h-5V4z" />
		</svg>
	),
)

export default CheckmarkIcon
