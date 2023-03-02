/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import { IconProps } from './types'

export const QrCode2Icon = React.forwardRef<SVGSVGElement, IconProps>((props, forwardedRef) => (
	<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} ref={forwardedRef}>
		<path
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.5"
			d="M4.75 5.75a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1h-3.5a1 1 0 0 1-1-1v-3.5Zm0 9a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1h-3.5a1 1 0 0 1-1-1v-3.5Zm9-9a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1h-3.5a1 1 0 0 1-1-1v-3.5Zm0 8h1.5v1.5h-1.5v-1.5Zm0 4h1.5v1.5h-1.5v-1.5Zm4 0h1.5v1.5h-1.5v-1.5Zm0-4h1.5v1.5h-1.5v-1.5Z"
		/>
	</svg>
))

export default QrCode2Icon
