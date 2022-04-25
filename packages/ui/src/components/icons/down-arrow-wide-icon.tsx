/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const DownArrowWideIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="36"
			height="12"
			viewBox="0 0 36 12"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path fill={color} fillRule="evenodd" clipRule="evenodd" d="M18,12L36,2l-1.5-2L18,9L1.5,0L0,2L18,12z" />
		</svg>
	),
)

export default DownArrowWideIcon
