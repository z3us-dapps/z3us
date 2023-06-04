/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const RefreshIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
			<g>
				<path
					fill={color}
					d="M12.4,15.1l1.6,1.4l-3.2,0c-3,0-5.5-2.5-5.5-5.5v-0.2h-1V11c0,3.6,2.9,6.5,6.5,6.5h3.2l-1.5,1.4l0.7,0.7L16,17l-2.9-2.6
		L12.4,15.1z"
				/>
				<path
					fill={color}
					d="M13.2,6.5l-3.2,0l1.5-1.4l-0.7-0.7L8,7l2.9,2.6l0.7-0.7l-1.5-1.4h3.2c3,0,5.5,2.5,5.5,5.5v0.2h1V13
		C19.8,9.4,16.8,6.5,13.2,6.5z"
				/>
			</g>
		</svg>
	),
)

export default RefreshIcon
