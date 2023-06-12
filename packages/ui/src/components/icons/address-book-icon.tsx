/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react'

import type { IconProps } from './types'

export const AddressBookIcon = React.forwardRef<SVGSVGElement, IconProps>(
	({ color = 'currentColor', ...props }, forwardedRef) => (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			xmlns="http://www.w3.org/2000/svg"
			fill={color}
			{...props}
			ref={forwardedRef}
		>
			<path
				fill={color}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.3,9.3l-1.6,0.3L11,8L12.3,9.3z M11.3,7.7l1.3,1.3L16,5.5l-1.3-1.3L11.3,7.7z M13.5,9.9L13.5,9.9l-0.1,1.5
	c-2.6,0.2-4.6,0.8-5.5,1.1V4.7c1.8-1.1,5.1-1.4,6.7-1.5V2c-2.8,0.1-5.5,0.5-7.3,1.7C5.5,2.5,2.8,2.1,0,2v10.6
	c2.4,0.1,4.8,0.4,6.5,1.2c0.5,0.2,1.1,0.2,1.6,0c1.8-0.8,4.1-1.1,6.5-1.2V8.7L13.5,9.9z M6.7,12.5c-0.9-0.3-2.9-0.9-5.5-1.1V3.3
	c3.2,0.2,4.6,0.9,5.5,1.4C6.7,4.7,6.7,12.5,6.7,12.5z M10,9.7L10.1,9L8.7,9.4V10L10,9.7z"
			/>
		</svg>
	),
)

export default AddressBookIcon
