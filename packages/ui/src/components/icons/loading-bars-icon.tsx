/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const LoadingBarsIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" fill="none" {...props} ref={forwardedRef}>
			<rect x="0" y="10" width="4" height="10" fill={color} opacity="0.2">
				<animate
					attributeName="opacity"
					attributeType="XML"
					values="0.2; 1; .2"
					begin="0s"
					dur="0.6s"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="height"
					attributeType="XML"
					values="10; 20; 10"
					begin="0s"
					dur="0.6s"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="y"
					attributeType="XML"
					values="10; 5; 10"
					begin="0s"
					dur="0.6s"
					repeatCount="indefinite"
				/>
			</rect>
			<rect x="8" y="10" width="4" height="10" fill={color} opacity="0.2">
				<animate
					attributeName="opacity"
					attributeType="XML"
					values="0.2; 1; .2"
					begin="0.15s"
					dur="0.6s"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="height"
					attributeType="XML"
					values="10; 20; 10"
					begin="0.15s"
					dur="0.6s"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="y"
					attributeType="XML"
					values="10; 5; 10"
					begin="0.15s"
					dur="0.6s"
					repeatCount="indefinite"
				/>
			</rect>
			<rect x="16" y="10" width="4" height="10" fill={color} opacity="0.2">
				<animate
					attributeName="opacity"
					attributeType="XML"
					values="0.2; 1; .2"
					begin="0.3s"
					dur="0.6s"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="height"
					attributeType="XML"
					values="10; 20; 10"
					begin="0.3s"
					dur="0.6s"
					repeatCount="indefinite"
				/>
				<animate
					attributeName="y"
					attributeType="XML"
					values="10; 5; 10"
					begin="0.3s"
					dur="0.6s"
					repeatCount="indefinite"
				/>
			</rect>
		</svg>
	),
)

export default LoadingBarsIcon
