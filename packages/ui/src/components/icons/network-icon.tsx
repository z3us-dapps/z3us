/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const NetworkIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path fill={color} d="M0,0.6v10.6h15V0.6H0z M13.8,10H1.2V1.9h12.5V10z M9.6,12.5l1.6,1.9H3.8l1.6-1.9H9.6z" />
		</svg>
	),
)

export default NetworkIcon
