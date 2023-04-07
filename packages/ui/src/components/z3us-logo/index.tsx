import React from 'react'

import { CSS } from '../../theme'
import { Box } from '../atoms/box'

interface IProps {
	css?: CSS
	className?: string
}

const defaultProps = {
	css: undefined,
	className: undefined,
}

export const Z3usLogo: React.FC<IProps> = ({ css, className }) => (
	<Box
		as="svg"
		width="28"
		height="28"
		viewBox="0 0 28 28"
		className={className}
		css={{ fill: 'currentColor', ...(css as any) }}
	>
		<g>
			<path
				d="M0,14c0,7.7,6.3,14,14,14s14-6.3,14-14S21.7,0,14,0S0,6.3,0,14z M2,14C2,7.4,7.4,2,14,2s12,5.4,12,12s-5.4,12-12,12
		S2,20.6,2,14z"
			/>
		</g>
		<g>
			<path
				d="M24.1,18.3l-6.3,2.2c-0.7,0.3-1.5-0.3-1.5-1.1c0-0.8-0.7-1.4-1.5-1.1L7,21l10.2-6.4c0.5-0.3,1,0,1,0.5s0.6,0.8,1,0.5
		l5.6-3.8C23.8,6.8,19.3,3,14,3C9.4,3,5.5,5.8,3.9,9.7l6.3-2.2c0.7-0.3,1.5,0.3,1.5,1.1s0.7,1.4,1.5,1.1L21,7l-10.2,6.4
		c-0.5,0.3-1,0-1-0.5s-0.6-0.8-1-0.5l-5.6,3.8c1,5,5.5,8.8,10.8,8.8C18.6,25,22.5,22.2,24.1,18.3z"
			/>
		</g>
	</Box>
)

Z3usLogo.defaultProps = defaultProps
