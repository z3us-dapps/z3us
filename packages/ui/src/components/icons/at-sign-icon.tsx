/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const AtSignIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} ref={forwardedRef}>
			<circle cx="12" cy="12" r="3.25" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
			<path
				stroke={color}
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C18.8125 4.75 19.25 9.125 19.25 12V13.25C19.25 14.3546 18.3546 15.25 17.25 15.25V15.25C16.1454 15.25 15.25 14.3546 15.25 13.25V8.75"
			/>
		</svg>
	),
)

export default AtSignIcon
