/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const SwapIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M11.2,4.3C9.1,4.3,7.5,5.9,7.5,8s1.7,3.7,3.7,3.7s3.7-1.7,3.7-3.7S13.3,4.3,11.2,4.3z M8.2,11.7C7.1,10.9,6.4,9.5,6.4,8
	s0.7-2.9,1.8-3.7H4.8C2.7,4.3,1.1,5.9,1.1,8s1.7,3.7,3.7,3.7H8.2z M0,8c0-2.7,2.1-4.8,4.8-4.8h6.4C13.9,3.2,16,5.3,16,8
	s-2.1,4.8-4.8,4.8H4.8C2.1,12.8,0,10.7,0,8z"
			/>
		</svg>
	),
)

export default SwapIcon
