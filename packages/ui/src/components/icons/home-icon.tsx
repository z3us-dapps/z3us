/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const AccountsIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15.7,5.1l-7.2-5C8.2,0,7.8,0,7.6,0.1l-7.2,5C0.1,5.3,0,5.5,0,5.7v7.5C0,14.8,1.2,16,2.8,16h3c0,0,0,0,0,0h4.5c0,0,0,0,0,0
	h3c1.5,0,2.8-1.2,2.8-2.8V5.7C16,5.5,15.9,5.3,15.7,5.1z M9.5,14.5h-3v-2.7c0-0.7,0.6-1.2,1.2-1.2h0.5c0.7,0,1.2,0.6,1.2,1.2V14.5z
	 M14.5,13.2c0,0.7-0.6,1.2-1.2,1.2H11v-2.7C11,10.2,9.8,9,8.2,9H7.7C6.2,9,5,10.2,5,11.8v2.7H2.8c-0.7,0-1.2-0.6-1.2-1.2V6.1L8,1.7
	l6.5,4.5V13.2z"
			/>
		</svg>
	),
)

export default AccountsIcon
