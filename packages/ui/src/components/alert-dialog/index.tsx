import React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { Box } from '../atoms/box'
import { styled, keyframes } from '../../theme'

const EXT_HEIGHT = '600px'
const EXT_WIDTH = '360px'

const overlayAnimateIn = keyframes({
	from: { opacity: 0 },
	to: { opacity: 1 },
})

const overlayAnimateOut = keyframes({
	from: { opacity: 1 },
	to: { opacity: 0 },
})

const animateIn = keyframes({
	from: { opacity: 0, transform: ' scale(.96)' },
	to: { opacity: 1, transform: ' scale(1)' },
})

const animateOut = keyframes({
	from: { opacity: 1, transform: ' scale(1)' },
	to: { opacity: 0, transform: ' scale(0.96)' },
})

const StyledOverlayExtension = styled(AlertDialogPrimitive.Overlay, {
	backgroundColor: '$bgTransparentDialog',
	backdropFilter: 'blur(5px)',
	position: 'absolute',
	width: EXT_WIDTH,
	height: EXT_HEIGHT,
	top: '0',
	left: '0',
	inset: 0,
	'&[data-state="open"]': {
		animation: `${overlayAnimateIn} 200ms ease`,
		animationFillMode: 'forwards',
	},
	'&[data-state="closed"]': {
		animation: `${overlayAnimateOut} 200ms ease`,
		animationFillMode: 'forwards',
	},
})

const StyledContentExtension = styled(AlertDialogPrimitive.Content, {
	position: 'absolute',
	width: EXT_WIDTH,
	height: EXT_HEIGHT,
	top: '0',
	left: '0',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	'&:focus': { outline: 'none' },
	'&[data-state="open"]': {
		animation: `${animateIn} 200ms ease`,
		animationFillMode: 'forwards',
	},
	'&[data-state="closed"]': {
		animation: `${animateOut} 200ms ease`,
		animationFillMode: 'forwards',
	},
})

type ContentProps = {
	children: React.ReactNode
	container?: React.RefObject<HTMLElement>
} & typeof defaultContentProps

const defaultContentProps = {
	container: undefined,
}

const Content = ({ children, container }: ContentProps) => (
	<AlertDialogPrimitive.Portal container={container}>
		<StyledOverlayExtension />
		<StyledContentExtension>
			<Box
				css={{
					p: '$3',
					width: '100%',
					border: '1px solid $borderDialog',
					color: '$txtDefault',
					backgroundColor: '$bgPanelDialog',
					br: '$2',
					m: '$6',
				}}
			>
				{children}
			</Box>
		</StyledContentExtension>
	</AlertDialogPrimitive.Portal>
)

Content.defaultProps = defaultContentProps

const StyledTitle = styled(AlertDialogPrimitive.Title, {
	margin: 0,
})

const StyledDescription = styled(AlertDialogPrimitive.Description, {
	fontSize: '12px',
	lineHeight: '16px',
	mt: '$2',
	mb: '$3',
})

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogContent = Content
export const AlertDialogTitle = StyledTitle
export const AlertDialogDescription = StyledDescription

export const AlertDialogAction = AlertDialogPrimitive.Action
export const AlertDialogCancel = AlertDialogPrimitive.Cancel
