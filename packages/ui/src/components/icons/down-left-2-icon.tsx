/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const DownLeft2Icon = React.forwardRef<SVGSVGElement, IconProps>(
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
			<path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75 8.75V17.25H15.25" />
			<path stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 17L17.25 6.75" />
		</svg>
	),
)

export default DownLeft2Icon
