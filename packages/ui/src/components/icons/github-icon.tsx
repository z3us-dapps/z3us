/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const GithubIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M12,0C5.4,0,0,5.4,0,12c0,5.3,3.4,9.8,8.2,11.4C8.8,23.5,9,23.1,9,22.8c0-0.3,0-1,0-2c-3.3,0.7-4-1.6-4-1.6
	c-0.5-1.4-1.3-1.8-1.3-1.8c-1.1-0.7,0.1-0.7,0.1-0.7c1.2,0.1,1.8,1.2,1.8,1.2c1.1,1.8,2.8,1.3,3.5,1c0.1-0.8,0.4-1.3,0.8-1.6
	C7.1,17,4.3,16,4.3,11.4c0-1.3,0.5-2.4,1.2-3.2C5.5,7.8,5,6.6,5.7,5c0,0,1-0.3,3.3,1.2c1-0.3,2-0.4,3-0.4c1,0,2,0.1,3,0.4
	C17.3,4.7,18.3,5,18.3,5c0.7,1.7,0.2,2.9,0.1,3.2c0.8,0.8,1.2,1.9,1.2,3.2c0,4.6-2.8,5.6-5.5,5.9c0.4,0.4,0.8,1.1,0.8,2.2
	c0,1.6,0,2.9,0,3.3c0,0.3,0.2,0.7,0.8,0.6C20.6,21.8,24,17.3,24,12C24,5.4,18.6,0,12,0z"
			/>
		</svg>
	),
)

export default GithubIcon
