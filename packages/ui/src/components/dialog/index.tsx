import React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Box } from '../atoms/box'
import { styled, keyframes, CSS } from '../../theme'

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

const StyledOverlay = styled(DialogPrimitive.Overlay, {
	backgroundColor: '$bgTransparentDialog',
	backdropFilter: 'blur(6px)',
	position: 'absolute',
	width: EXT_WIDTH,
	height: EXT_HEIGHT,
	top: '0',
	left: '0',
	inset: 0,
	'&[data-state="open"]': {
		animation: `${overlayAnimateIn} 200ms ease`,
	},
	'&[data-state="closed"]': {
		animation: `${overlayAnimateOut} 200ms ease`,
	},
})

const StyledContent = styled(DialogPrimitive.Content, {
	position: 'absolute',
	backgroundColor: '$bgTransparentDialog',
	backdropFilter: 'blur(6px)',
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
	},
	'&[data-state="closed"]': {
		animation: `${animateOut} 200ms ease`,
	},
})

type ContentProps = {
	children: React.ReactNode
	container?: React.RefObject<HTMLElement>
	css?: CSS
} & typeof defaultContentProps

const defaultContentProps = {
	container: undefined,
	css: undefined,
}

const Content = ({ children, container, css }: ContentProps) => (
	<DialogPrimitive.Portal container={container}>
		<StyledOverlay />
		<StyledContent>
			<Box
				css={{
					p: '$3',
					width: '100%',
					border: '1px solid $borderDialog',
					color: '$txtDefault',
					backgroundColor: '$bgPanelDialog',
					br: '$2',
					m: '$6',
					...(css as any),
				}}
			>
				{children}
			</Box>
		</StyledContent>
	</DialogPrimitive.Portal>
)

Content.defaultProps = defaultContentProps

const StyledTitle = styled(DialogPrimitive.Title, {
	margin: 0,
	fontWeight: 500,
	color: 'grey',
	fontSize: 17,
})

const StyledDescription = styled(DialogPrimitive.Description, {
	margin: '10px 0 20px',
	color: 'grey',
	fontSize: 15,
	lineHeight: 1.5,
})

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogContent = Content
export const DialogTitle = StyledTitle
export const DialogDescription = StyledDescription
export const DialogClose = DialogPrimitive.Close
