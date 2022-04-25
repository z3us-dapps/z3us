import React from 'react'
import { CSS } from '../../theme'
import { Box } from '../atoms/box'

interface IProps {
	color?: string
	css?: CSS
}

const defaultProps = {
	color: 'currentColor',
	css: undefined,
}

export const Z3usText: React.FC<IProps> = ({ color, css }: IProps) => (
	<Box
		as="svg"
		width="100"
		height="18"
		viewBox="0 0 100 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		css={{ ...(css as any) }}
	>
		<g>
			<path
				fill={color}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M40.7,0H28.3c-0.4,0-0.7,0.3-0.7,0.7v2.1c0,0.4,0.3,0.7,0.7,0.7h11c1.1,0,2.1,0.9,2.1,2.1v1.1c0,0.2-0.2,0.3-0.3,0.3H30
		c-0.4,0-0.7,0.3-0.7,0.7v2c0,0.4,0.3,0.7,0.7,0.7h11c0.2,0,0.3,0.2,0.3,0.3v1c0,1.1-0.9,2.1-2.1,2.1h-11c-0.4,0-0.7,0.3-0.7,0.7
		v2.1c0,0.4,0.3,0.7,0.7,0.7h12.4c2.3,0,4.1-1.9,4.1-4.1v-9C44.8,1.9,43,0,40.7,0z"
			/>
			<path
				fill={color}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M71.7,0h-2.1C69.3,0,69,0.3,69,0.7v11.7c0,0.8-0.6,1.4-1.4,1.4H60c-0.8,0-1.4-0.6-1.4-1.4V0.7c0-0.4-0.3-0.7-0.7-0.7h-2.1
		c-0.4,0-0.7,0.3-0.7,0.7v11.7c0,2.7,2.2,4.8,4.8,4.8h7.6c2.7,0,4.8-2.2,4.8-4.8V0.7C72.4,0.3,72.1,0,71.7,0z"
			/>
			<path
				fill={color}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M86.9,3.4h12.4c0.4,0,0.7-0.3,0.7-0.7V0.7c0-0.4-0.3-0.7-0.7-0.7H86.9c-2.3,0-4.1,1.9-4.1,4.1v2.1c0,2.3,1.9,4.1,4.1,4.1h9
		c0.4,0,0.7,0.3,0.7,0.7v2.1c0,0.4-0.3,0.7-0.7,0.7H83.4c-0.4,0-0.7,0.3-0.7,0.7v2.1c0,0.4,0.3,0.7,0.7,0.7h12.4
		c2.3,0,4.1-1.9,4.1-4.1V11c0-2.3-1.9-4.1-4.1-4.1h-9c-0.4,0-0.7-0.3-0.7-0.7V4.1C86.2,3.8,86.5,3.4,86.9,3.4z"
			/>
			<path
				fill={color}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M15.9,0H0.7C0.3,0,0,0.3,0,0.7v2.1c0,0.4,0.3,0.7,0.7,0.7h10.1c0.3,0,0.5,0.4,0.2,0.6L0.5,13.4C0.2,13.6,0,14,0,14.4v1.4
		c0,0.8,0.6,1.4,1.4,1.4h15.2c0.4,0,0.7-0.3,0.7-0.7v-2.1c0-0.4-0.3-0.7-0.7-0.7H6.4c-0.3,0-0.5-0.4-0.2-0.6l10.6-9.3
		c0.3-0.3,0.5-0.6,0.5-1V1.4C17.2,0.6,16.6,0,15.9,0z"
			/>
		</g>
	</Box>
)

Z3usText.defaultProps = defaultProps
