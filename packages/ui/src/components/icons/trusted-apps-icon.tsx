/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const TrustedAppsIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				d="M15,0v8.8h-1.2v-5H1.2v10h7.5V15H0V0H15z M15,11.9h-1.9V10h-1.2v1.9H10v1.2h1.9V15h1.2v-1.9H15V11.9z"
			/>
		</svg>
	),
)

export default TrustedAppsIcon
