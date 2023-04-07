import React from 'react'

import { Box } from 'ui/src/components/atoms'
import { Avatar, AvatarFallback, AvatarImage } from 'ui/src/components/avatar'
import { CSS } from 'ui/src/theme'

interface IProps {
	image?: string
	fallbackText?: string
	width?: number
	height?: number
	borderWidth?: number
	shadow?: boolean
	background?: string
	cutImage?: boolean
	avatarFallBackCss?: CSS
}
const defaultProps = {
	image: null,
	fallbackText: '',
	width: 48,
	height: 48,
	borderWidth: 2,
	shadow: true,
	background: '#b0c3dd',
	cutImage: true,
	avatarFallBackCss: {},
}

export const CircleAvatar: React.FC<IProps> = ({
	image,
	fallbackText,
	width,
	height,
	borderWidth,
	shadow,
	background,
	cutImage,
	avatarFallBackCss,
}) => (
	<Box
		css={{
			width: `${width}px`,
			height: `${height}px`,
			borderRadius: '50%',
			boxShadow: shadow ? '$shadowPanel2' : '',
			background,
			flexShrink: '0',
		}}
	>
		<Avatar
			css={{
				$$shadowColor: '$colors$borderAvatar',
				...(borderWidth ? { boxShadow: `0 0 0 ${borderWidth}px $$shadowColor` } : {}),
				width: `${width}px`,
				height: `${height}px`,
			}}
		>
			<AvatarImage src={image} alt={fallbackText} css={{ ...(!cutImage ? { borderRadius: 'unset' } : {}) }} />
			<AvatarFallback
				delayMs={200}
				css={{ borderRadius: '50%', backgroundColor: '$bgPanel', overflow: 'hidden', ...(avatarFallBackCss as any) }}
			>
				{fallbackText}
			</AvatarFallback>
		</Avatar>
	</Box>
)

CircleAvatar.defaultProps = defaultProps
