/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const ArrowLeftIcon = React.forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => (
	<svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props} ref={forwardedRef}>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			d="M10.25 6.75L4.75 12L10.25 17.25"
		/>
		<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 12H5" />
	</svg>
))

export default ArrowLeftIcon
