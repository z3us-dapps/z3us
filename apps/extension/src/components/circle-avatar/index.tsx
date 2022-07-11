import React from 'react'
import { CSS } from 'ui/src/theme'
import { Box } from 'ui/src/components/atoms'
import { Avatar, AvatarImage, AvatarFallback } from 'ui/src/components/avatar'

interface IProps {
	image?: string
	fallbackText?: string
	width?: number
	height?: number
	borderWidth?: number
	shadow?: boolean
	background?: string
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
	avatarFallBackCss,
}) =>
	image ? (
		<Box
			css={{
				width: `${width}px`,
				height: `${height}px`,
				borderRadius: '50%',
				boxShadow: shadow ? '$shadowPanel2' : '',
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
				<AvatarImage src={image} alt={fallbackText} />
				<AvatarFallback
					delayMs={200}
					css={{ borderRadius: '50%', backgroundColor: '$bgPanel', overflow: 'hidden', ...(avatarFallBackCss as any) }}
				>
					{fallbackText}
				</AvatarFallback>
			</Avatar>
		</Box>
	) : (
		<Box
			css={{
				width,
				height,
				borderRadius: '50%',
				background,
				border: `${borderWidth}px solid`,
				borderColor: '$borderAvatar',
				boxShadow: shadow ? '$shadowPanel2' : '',
				flexShrink: '0',
			}}
		/>
	)

CircleAvatar.defaultProps = defaultProps
