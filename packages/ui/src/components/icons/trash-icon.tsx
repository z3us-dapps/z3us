/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const TrashIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			xmlns="http://www.w3.org/2000/svg"
			fill={color}
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M5.9,11.3c0,0.3-0.2,0.5-0.5,0.5c-0.3,0-0.5-0.2-0.5-0.5V5.9c0-0.3,0.2-0.5,0.5-0.5c0.3,0,0.5,0.2,0.5,0.5V11.3z M8,11.3
	c0,0.3-0.2,0.5-0.5,0.5S7,11.6,7,11.3V5.9c0-0.3,0.2-0.5,0.5-0.5S8,5.6,8,5.9V11.3z M10.2,11.3c0,0.3-0.2,0.5-0.5,0.5
	c-0.3,0-0.5-0.2-0.5-0.5V5.9c0-0.3,0.2-0.5,0.5-0.5c0.3,0,0.5,0.2,0.5,0.5V11.3z M12.9,2.1v1.1H2.1V2.1h3.1c0.5,0,0.9-0.6,0.9-1.1
	h2.9c0,0.5,0.4,1.1,0.9,1.1H12.9z M11.3,4.2v8.7H3.7V4.2H2.6V14h9.8V4.2H11.3z"
			/>
		</svg>
	),
)

export default TrashIcon
