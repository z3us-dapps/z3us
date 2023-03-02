/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const UpRightIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="20"
			height="20"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4 3.5H16.5V16L15.5 16.5L14.5 16V7L5 16.5L3.5 15L13 5.5H4L3.5 4.5L4 3.5Z"
			/>
		</svg>
	),
)

export default UpRightIcon
