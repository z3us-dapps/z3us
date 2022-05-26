import React from 'react'
import { CSS } from 'ui/src/theme'
import { Box, Flex } from 'ui/src/components/atoms'

interface IProps {
	children: React.ReactNode
	css: CSS
	hoverColor: string
}

export const LandingHoverCard: React.FC<IProps> = ({ children, css, hoverColor }) => (
	<Flex
		css={{
			position: 'relative',
			...(css as any),
			'> div': {
				position: 'relative',
				zIndex: '1',
			},
			'&::after': {
				content: '""',
				borderRadius: '32px',
				position: 'absolute',
				top: '0px',
				bottom: '0px',
				left: '0px',
				right: '0px',
				pointerEvents: 'none',
				background: `radial-gradient(circle at 50px 50px, ${hoverColor} 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%)`,
			},
		}}
	>
		{children}
		<Box
			css={{
				'&&': {
					position: 'absolute',
				},
				borderRadius: '32px',
				top: '0px',
				bottom: '0px',
				left: '0px',
				right: '0px',
				border: '2px solid ',
				borderColor: '$borderTransparent',
				pointerEvents: 'none',
				zIndex: '1',
			}}
		/>
	</Flex>
)
