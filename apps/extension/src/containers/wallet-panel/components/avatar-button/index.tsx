import React from 'react'
import { CircleAvatar } from '@src/components/circle-avatar'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Flex } from 'ui/src/components/atoms'

export interface IProps {
	background: string
}

export const AvatarButton: React.FC<IProps> = ({ background }) => (
	<Box
		css={{
			cursor: 'pointer',
			position: 'relative',
			width: '24px',
			height: '24px',
			border: 'none',
			background: 'none',
			outline: 'none',
			m: '0',
			p: '0',
			'&:hover': {
				'> div': {
					opacity: '1.0',
				},
			},
		}}
	>
		<Flex
			align="center"
			justify="center"
			css={{
				width: '24px',
				height: '24px',
				position: 'absolute',
				top: '0px',
				left: '0px',
				transition: '$default',
				opacity: '0',
				color: '$txtMuted',
				background: '$bgPanel',
				borderRadius: '50%',
				zIndex: '1',
				boxShadow: 'inset 0 0 0 1px var(--colors-borderInputFocus)',
				svg: {
					ml: '-2px',
				},
			}}
		>
			<Pencil2Icon />
		</Flex>
		<CircleAvatar background={background} width={24} height={24} borderWidth={1} />
	</Box>
)
