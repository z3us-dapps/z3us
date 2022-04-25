/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const DownLeftIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13 13.5H0.5V1L1.5 0.5L2.5 1V10L12 0.5L13.5 2L4 11.5H13L13.5 12.5L13 13.5Z"
			/>
		</svg>
	),
)

export default DownLeftIcon
