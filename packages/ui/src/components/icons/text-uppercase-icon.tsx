/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const TextUppercaseIcon = React.forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => (
	<svg width="24" height="24" fill="none" viewBox="0 0 24 24" {...props} ref={forwardedRef}>
		<path
			d="M4.75 17.25L8 6.75L11.25 17.25"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M12.75 17.25L16 6.75L19.25 17.25"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path d="M6 14.25H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		<path d="M14 14.25H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
))

export default TextUppercaseIcon
