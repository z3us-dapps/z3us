/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const XIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				fill={color}
				d="M12,0C18.6,0 24,5.4 24,12C24,18.6 18.6,24 12,24C5.4,24 0,18.6 0,12C0,5.4 5.4,0 12,0ZM6.032,6L11.051,12.711L6,18.167L7.137,18.167L11.559,13.39L15.132,18.167L19,18.167L13.698,11.079L18.4,6L17.263,6L13.19,10.4L9.9,6L6.032,6ZM7.703,6.837L9.48,6.837L17.328,17.33L15.551,17.33L7.703,6.837Z"
			/>
		</svg>
	),
)

export default XIcon
