import React from 'react'
import { CSS } from '../../theme'
import { Box } from '../atoms/box'

interface IProps {
	css?: CSS
}

const defaultProps = {
	css: undefined,
}

export const Z3usText: React.FC<IProps> = ({ css }) => (
	<Box
		as="svg"
		width="140"
		height="23"
		viewBox="0 0 140 23"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		css={{ ...(css as any) }}
	>
		<g>
			<path
				d="M130.7,8.9H113c-1.2,0-2.2-1-2.2-2.2s1-2.2,2.2-2.2h19.7L140,0h-27c-3.7,0-6.6,3-6.6,6.6c0,3.7,3,6.6,6.6,6.6
		h17.7c1.2,0,2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2H111l-7.3,4.4h27c3.7,0,6.6-3,6.6-6.6C137.3,11.8,134.4,8.9,130.7,8.9z"
			/>
			<path
				d="M98.4,15.9c0,1-0.8,1.8-1.8,1.8H79.7c-2,0-3.5-1.6-3.5-3.5V0h-4.4v15.1c0,3.9,3.2,7.1,7.1,7.1h16.6l7.3-4.4V0
		h-4.4V15.9z"
			/>
			<path
				d="M0,0l7.2,4.4c0.1,0,0.1,0.1,0.2,0.1H25L1.8,17.7h5.5L0,22.2h36.3l-7.2-4.4c-0.1,0-0.1-0.1-0.2-0.1H11.5
		l23-13.3H29L36.3,0H0z"
			/>
			<path
				d="M61.1,0H37.2l7.3,4.4h15.7c2,0,3.5,1.6,3.5,3.6c0,4.3,0,2.8,0,6.2c0,2-1.6,3.6-3.5,3.6H44.5l-7.3,4.4h23.9
		c3.9,0,7.1-3.2,7.1-7.1v-8C68.2,3.2,65.1,0,61.1,0z"
			/>
			<path d="M60.7,13.3c0.5,0,0.9-0.4,0.9-0.9V9.7c0-0.5-0.4-0.9-0.9-0.9H46.5l-4.4,2.2l4.4,2.2H60.7z" />
		</g>
	</Box>
)

Z3usText.defaultProps = defaultProps
