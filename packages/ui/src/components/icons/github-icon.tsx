/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const GithubIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M10,0.2c-5.5,0-10,4.5-10,10c0,4.4,2.9,8.2,6.8,9.5c0.5,0.1,0.7-0.2,0.7-0.5c0-0.2,0-0.9,0-1.7c-2.8,0.6-3.4-1.3-3.4-1.3
	C3.7,15.1,3,14.8,3,14.8c-0.9-0.6,0.1-0.6,0.1-0.6c1,0.1,1.5,1,1.5,1C5.5,16.7,7,16.3,7.5,16c0.1-0.6,0.3-1.1,0.6-1.3
	C6,14.4,3.6,13.6,3.6,9.7c0-1.1,0.4-2,1-2.7C4.5,6.8,4.2,5.8,4.7,4.4c0,0,0.8-0.3,2.7,1C8.3,5.2,9.1,5.1,10,5.1
	c0.8,0,1.7,0.1,2.5,0.3c1.9-1.3,2.7-1,2.7-1c0.5,1.4,0.2,2.4,0.1,2.6c0.6,0.7,1,1.6,1,2.7c0,3.8-2.3,4.7-4.6,4.9
	c0.3,0.3,0.7,0.9,0.7,1.8c0,1.3,0,2.4,0,2.7c0,0.3,0.2,0.6,0.7,0.5c4-1.3,6.9-5.1,6.9-9.5C20,4.7,15.5,0.2,10,0.2"
			/>
		</svg>
	),
)

export default GithubIcon
