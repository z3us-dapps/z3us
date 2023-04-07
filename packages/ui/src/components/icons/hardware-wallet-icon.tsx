/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const HardwareWalletIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
			<g>
				<path fill="none" d="M9.6,13.7c0,0.1,0.1,0.3,0.3,0.3s0.3-0.1,0.3-0.3V6.5H9.6V13.7z" />
				<rect fill="none" x="0.5" y="2.3" width="0.5" height="3.7" />
				<path fill="none" d="M12.5,3.3c-1,0-1.9,0.8-1.9,1.9V14h3.7V5.2C14.4,4.2,13.6,3.3,12.5,3.3z" />
				<path
					fill="none"
					d="M15.2,2.3H1.6V6h8.5V5.2c0-1.3,1.1-2.4,2.4-2.4c1.3,0,2.4,1.1,2.4,2.4V6h0.3c0.1,0,0.3-0.1,0.3-0.3V2.5
		C15.5,2.4,15.3,2.3,15.2,2.3z"
				/>
				<path
					fill={color}
					d="M15.2,1.7H8c0-0.1-0.1-0.3-0.3-0.3H6.7c-0.1,0-0.3,0.1-0.3,0.3H5.3c0-0.1-0.1-0.3-0.3-0.3H4c-0.1,0-0.3,0.1-0.3,0.3H0.5
		C0.2,1.7,0,2,0,2.3V6c0,0.3,0.2,0.5,0.5,0.5h6.4v1.2h0.5V7.2H8v0V6.7v0H7.5v0h1.1V6.5h0.5v7.2c0,0.4,0.4,0.8,0.8,0.8h4.8
		c0.1,0,0.3-0.1,0.3-0.3V6.5h0.3c0.4,0,0.8-0.4,0.8-0.8V2.5C16,2.1,15.6,1.7,15.2,1.7z M1.1,6H0.5V2.3h0.5V6z M10.1,13.7
		c0,0.1-0.1,0.3-0.3,0.3s-0.3-0.1-0.3-0.3V6.5h0.5V13.7z M14.4,14h-3.7V5.2c0-1,0.8-1.9,1.9-1.9c1,0,1.9,0.8,1.9,1.9V14z M15.5,5.7
		c0,0.1-0.1,0.3-0.3,0.3h-0.3V5.2c0-1.3-1.1-2.4-2.4-2.4c-1.3,0-2.4,1.1-2.4,2.4V6H1.6V2.3h13.6c0.1,0,0.3,0.1,0.3,0.3V5.7z"
				/>
			</g>
		</svg>
	),
)

export default HardwareWalletIcon
