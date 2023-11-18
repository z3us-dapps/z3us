/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const RadixIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24 "
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
			ref={forwardedRef}
		>
			<path
				d="M9.60238 19.9998C9.26038 19.9998 8.93518 19.8364 8.73118 19.5551L4.47334 13.6545H1.69678V11.5062H5.0227C5.36806 11.5062 5.69158 11.6714 5.8939 11.951L9.37318 16.7716L14.6825 4.64368C14.8543 4.25272 15.24 4 15.6665 4H22.3032V6.14824H16.3689L10.5864 19.3564C10.4313 19.7102 10.0994 19.9528 9.71518 19.9931C9.6799 19.9982 9.64102 19.9998 9.60238 19.9998Z"
				fill={color}
			/>
		</svg>
	),
)

export default RadixIcon
