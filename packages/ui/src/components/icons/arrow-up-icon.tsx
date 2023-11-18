/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const ArrowUpIcon = React.forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => (
	<svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props} ref={forwardedRef}>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			d="M17.25 10.25L12 4.75L6.75 10.25"
		/>
		<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 19.25V5.75" />
	</svg>
))

export default ArrowUpIcon
