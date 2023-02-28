/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const Check2Icon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M7.75 12.75L10 15.25L16.25 8.75"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	),
)

export default Check2Icon
