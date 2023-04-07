/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const ArrowDownIcon = React.forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => (
	<svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props} ref={forwardedRef}>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			d="M17.25 13.75L12 19.25L6.75 13.75"
		/>
		<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18.25V4.75" />
	</svg>
))

export default ArrowDownIcon
