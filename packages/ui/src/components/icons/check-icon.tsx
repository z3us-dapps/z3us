/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const CheckIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg width="10" height="10" viewBox="0 0 10 10" fill={color} {...props} ref={forwardedRef}>
			<path
				d="M9.8,2.4C10.1,2,10.1,1.3,9.6,1C9.2,0.6,8.6,0.7,8.2,1.1L3.4,6.8L1.7,5c-0.4-0.4-1-0.4-1.4,0
	c-0.4,0.4-0.4,1,0,1.4L2.8,9C3,9.2,3.3,9.3,3.5,9.2c0.3,0,0.5-0.1,0.7-0.4L9.8,2.4z"
			/>
		</svg>
	),
)

export default CheckIcon
