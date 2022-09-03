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
	<Box as="svg" width="28" height="28" viewBox="0 0 28 28" className={className} css={{ ...(css as any) }}>
		<g>
			<path
				d="M14,0C6.3,0,0,6.3,0,14s6.3,14,14,14s14-6.3,14-14S21.7,0,14,0z M14,26C7.4,26,2,20.6,2,14S7.4,2,14,2s12,5.4,12,12
			S20.6,26,14,26z"
			/>
		</g>
		<g>
			<path
				d="M14,25c5.3,0,9.8-3.8,10.8-8.8l-5.6-3.8c-0.4-0.3-1,0-1,0.5c0,0.5-0.5,0.8-1,0.5L7,7l7.8,2.7c0.8,0.3,1.5-0.3,1.5-1.1
				s0.8-1.4,1.5-1.1l6.3,2.2C22.5,5.8,18.6,3,14,3C8.7,3,4.2,6.8,3.2,11.8l5.6,3.8c0.4,0.3,1,0,1-0.5c0-0.5,0.5-0.8,1-0.5L21,21
				l-7.8-2.7c-0.8-0.3-1.5,0.3-1.5,1.1c0,0.8-0.8,1.4-1.5,1.1l-6.3-2.2C5.5,22.2,9.4,25,14,25z"
			/>
		</g>
	</Box>
)

Z3usLogo.defaultProps = defaultProps
