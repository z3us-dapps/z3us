import { styled } from '@stitches/react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

const StyledAvatar = styled(AvatarPrimitive.Root, {
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	verticalAlign: 'middle',
	userSelect: 'none',
	width: 48,
	height: 48,
	borderRadius: '100%',
})

const StyledImage = styled(AvatarPrimitive.Image, {
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	borderRadius: 'inherit',
})

const StyledFallback = styled(AvatarPrimitive.Fallback, {
	width: '100%',
	height: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: 'white',
	color: 'grey',
	fontSize: 12,
	lineHeight: 1,
	fontWeight: 500,
})

// Exports
export const Avatar = StyledAvatar
export const AvatarImage = StyledImage
export const AvatarFallback = StyledFallback
