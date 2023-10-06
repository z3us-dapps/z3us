import * as DialogPrimitive from '@radix-ui/react-dialog'
import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { Close2Icon } from "../icons"
import { Box } from '../box'
import { Button } from '../button'
import { SimpleBarStyled } from '../simple-bar-styled'
import * as styles from './dialog.css'

export const DialogRoot = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogOverlay = DialogPrimitive.Overlay
export const DialogContent = DialogPrimitive.Content
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description
export const DialogClose = DialogPrimitive.Close

interface IDialogProps {
	open?: boolean
	children?: any
	className?: ClassValue
	onClose?: () => void
	isCloseButtonVisible?: boolean
}

export const Dialog: React.FC<IDialogProps> = props => {
	const { open, children, className, isCloseButtonVisible = true, onClose } = props

	return (
		<DialogRoot open={open} >
			<DialogPortal>
				<DialogOverlay className={styles.dialogOverlay} />
				<DialogContent className={clsx(styles.dialogContentExpanded, className)} onEscapeKeyDown={onClose}>
					<Box className={styles.dialogContentWrapper}>
						<SimpleBarStyled className={styles.dialogContentSimpleBarWrapper}>{children}</SimpleBarStyled>
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
