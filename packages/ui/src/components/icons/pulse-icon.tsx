/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'
import { IconProps } from './types'

export const PulseIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
				d="M1 9.50175H3.5C3.87844 9.50174 4.22446 9.28809 4.394 8.94975L5.187 7.37475L6.53 12.7428C6.64017 13.1842 7.03444 13.4956 7.48939 13.5006C7.94434 13.5055 8.34528 13.2027 8.465 12.7638L10.524 5.22875L11.538 8.77675C11.6608 9.20611 12.0534 9.502 12.5 9.50175H15C15.5523 9.50175 16 9.05404 16 8.50175C16 7.94947 15.5523 7.50175 15 7.50175H13.256L11.462 1.22575C11.3391 0.79369 10.9431 0.496612 10.4939 0.499409C10.0447 0.502207 9.65253 0.804193 9.535 1.23775L7.544 8.54975L6.47 4.25675C6.36703 3.85173 6.02304 3.55345 5.60752 3.50886C5.19199 3.46428 4.79256 3.68279 4.606 4.05675L2.88 7.50175H1C0.447715 7.50175 0 7.94947 0 8.50175C0 9.05404 0.447715 9.50175 1 9.50175Z"
			/>
		</svg>
	),
)

export default PulseIcon
