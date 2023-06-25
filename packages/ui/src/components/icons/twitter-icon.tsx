/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const TwitterIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.6,0,12,0z M18.5,9.5c0,0.1,0,0.3,0,0.4c0,4.1-3.1,8.8-8.8,8.8
	c-1.7,0-3.4-0.5-4.7-1.4c0.2,0,0.5,0,0.7,0c1.4,0,2.8-0.5,3.8-1.3c-1.3,0-2.5-0.9-2.9-2.1c0.2,0,0.4,0.1,0.6,0.1
	c0.3,0,0.6,0,0.8-0.1c-1.4-0.3-2.5-1.5-2.5-3c0,0,0,0,0,0C6,11,6.5,11.2,7,11.2c-0.8-0.6-1.4-1.5-1.4-2.6C5.6,8,5.8,7.5,6,7.1
	c1.5,1.9,3.8,3.1,6.3,3.2c-0.1-0.2-0.1-0.5-0.1-0.7c0-1.7,1.4-3.1,3.1-3.1c0.9,0,1.7,0.4,2.2,1c0.7-0.1,1.4-0.4,2-0.7
	c-0.2,0.7-0.7,1.3-1.4,1.7c0.6-0.1,1.2-0.2,1.8-0.5C19.6,8.6,19.1,9.1,18.5,9.5z"
			/>
		</svg>
	),
)

export default TwitterIcon
