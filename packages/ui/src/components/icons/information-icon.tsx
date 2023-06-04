/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const InformationIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
			<path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V15" />
			<circle cx="12" cy="9" r="1" fill={color} />
			<circle cx="12" cy="12" r="7.25" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
		</svg>
	),
)

export default InformationIcon
