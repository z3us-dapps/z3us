/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const UpArrowWideIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
			<path fill={color} fillRule="evenodd" clipRule="evenodd" d="M18 0L0 10L1.5 12L18 3L34.5 12L36 10L18 0Z" />
		</svg>
	),
)

export default UpArrowWideIcon
