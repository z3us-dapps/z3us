/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const NftIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M13.2,16H2.8C1.2,16,0,14.8,0,13.2V12c0,0,0,0,0,0V2.8C0,1.2,1.2,0,2.8,0h10.5C14.8,0,16,1.2,16,2.8v10.5
	C16,14.8,14.8,16,13.2,16z M1.5,12.3v1c0,0.7,0.6,1.2,1.2,1.2h8.7l-4.9-5c0,0-0.1,0-0.1-0.1C6.4,9.3,6.3,9.3,6.2,9.2L6,9
	C5.8,8.6,5.4,8.5,5,8.5c-0.4,0-0.7,0.2-1,0.5L1.5,12.3z M7.9,8.7l5.6,5.7c0.6-0.1,1-0.6,1-1.2V8.8c0,0,0,0-0.1-0.1L12,5.9
	c-0.2-0.3-0.6-0.5-1-0.4c-0.4,0-0.7,0.2-1,0.5C10,6.1,8.9,7.5,7.9,8.7z M2.8,1.5c-0.7,0-1.2,0.6-1.2,1.2v7.1L2.9,8
	C3.4,7.4,4.2,7,5,7c0.7,0,1.3,0.2,1.9,0.7c0.9-1.2,1.9-2.5,2-2.6C9.4,4.4,10.2,4,11,4c0.8,0,1.6,0.3,2.1,1l1.3,1.6V2.8
	c0-0.7-0.6-1.2-1.2-1.2H2.8z"
			/>
		</svg>
	),
)

export default NftIcon
