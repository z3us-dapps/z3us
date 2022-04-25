/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const StakingIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M8.3,0.9c-0.2-0.1-0.5-0.1-0.7,0L0.3,5.3C0.1,5.4,0,5.6,0,5.8s0.1,0.5,0.3,0.6l7.3,4.3c0.2,0.1,0.5,0.1,0.7,0l7.3-4.3
	C15.9,6.3,16,6.1,16,5.8s-0.1-0.5-0.3-0.6L8.3,0.9z M8,9.4L2,5.8l6-3.6l6,3.6L8,9.4z M1,9.6C0.7,9.4,0.3,9.5,0.1,9.8
	c-0.2,0.3-0.1,0.7,0.2,0.9l7.3,4.3c0.2,0.1,0.5,0.1,0.7,0l7.3-4.3c0.3-0.2,0.4-0.6,0.2-0.9c-0.2-0.3-0.6-0.4-0.9-0.2l-7,4.1L1,9.6z"
			/>
		</svg>
	),
)

export default StakingIcon
