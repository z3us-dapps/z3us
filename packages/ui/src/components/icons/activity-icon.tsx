/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const ActivityIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M9.3,0c0.2,0.1,0.4,0.3,0.3,0.6l-1,5.8h4.7c0.2,0,0.4,0.1,0.5,0.3c0.1,0.2,0.1,0.4-0.1,0.6l-6.4,8.5C7.2,16,6.9,16.1,6.7,16
	c-0.2-0.1-0.4-0.3-0.3-0.6l1-5.8H2.7c-0.2,0-0.4-0.1-0.5-0.3C2.1,9.1,2.1,8.9,2.2,8.7l6.4-8.5C8.8,0,9.1-0.1,9.3,0z M3.7,8.5H8
	c0.2,0,0.3,0.1,0.4,0.2C8.5,8.8,8.6,9,8.5,9.2l-0.7,4.2l4.4-5.9H8c-0.2,0-0.3-0.1-0.4-0.2C7.5,7.2,7.4,7,7.5,6.8l0.7-4.2L3.7,8.5z"
			/>
		</svg>
	),
)

export default ActivityIcon
