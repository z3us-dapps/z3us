/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const ChevronLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M13.25 8.75L9.75 12L13.25 15.25"
			/>
		</svg>
	),
)

export default ChevronLeftIcon
