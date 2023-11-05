import * as DialogPrimitive from '@radix-ui/react-dialog'
import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Close2Icon } from 'ui/src/components/icons'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'

import * as styles from './styles.css'

export const DialogRoot = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogOverlay = DialogPrimitive.Overlay
export const DialogContent = DialogPrimitive.Content
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
export const DialogClose = DialogPrimitive.Close

type TWidthVariant = 'medium' | 'large'

interface IDialogProps {
	open?: boolean
	trigger?: React.ReactElement
	children?: any
	className?: ClassValue
	onClose?: () => void
	width?: TWidthVariant
	isCloseButtonVisible?: boolean
}

export const Dialog: React.FC<IDialogProps> = props => {
	const { open, trigger, children, width = 'medium', className, isCloseButtonVisible = true, onClose } = props

	return (
		<DialogRoot open={open}>
			{trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
			<DialogPortal>
				<DialogOverlay className={styles.dialogOverlay} />
				<DialogContent
					onOpenAutoFocus={e => {
						e.preventDefault()
					}}
					className={clsx(
						styles.dialogContentExpanded,
						width === 'medium' && styles.dialogContentWidthMedium,
						width === 'large' && styles.dialogContentWidthLarge,
						className,
					)}
					onEscapeKeyDown={onClose}
					onInteractOutside={onClose}
				>
					<Box className={styles.dialogContentWrapper}>
						<ScrollArea
							className={styles.dialogContentScrollAreaWrapper}
							viewPortClassName={styles.dialogContentScrollAreaViewportWrapper}
						>
							{children}
						</ScrollArea>
					</Box>
					{isCloseButtonVisible ? (
						<Box className={styles.dialogContentCloseWrapper}>
							<DialogClose asChild>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={onClose}>
									<Close2Icon />
								</Button>
							</DialogClose>
						</Box>
					) : null}
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}
