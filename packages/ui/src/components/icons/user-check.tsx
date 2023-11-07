/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const UserCheck = React.forwardRef<SVGSVGElement, IconProps>(
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
			<circle cx="12" cy="8" r="3.25" stroke={color} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M12.25 19.25H6.94953C5.77004 19.25 4.88989 18.2103 5.49085 17.1954C6.36247 15.7234 8.23935 14 12.25 14"
			/>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.5"
				d="M14.75 17.75L16 19.25L19.25 14.75"
			/>
		</svg>
	),
)

export default UserCheck
