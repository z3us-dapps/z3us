import * as AlertDialogPrimitive from '@radix-ui/react-dialog'
import React from 'react'

import { LoadingBarsIcon } from '../../components/icons'
import { Box } from '../box'
import { Button, type TStyleVariant } from '../button'
import { Text } from '../typography'
import * as styles from './dialog-alert.css'

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogPortal = AlertDialogPrimitive.Portal
export const AlertDialogOverlay = AlertDialogPrimitive.Overlay
export const AlertDialogContent = AlertDialogPrimitive.Content
export const AlertDialogTitle = AlertDialogPrimitive.Title
export const AlertDialogDescription = AlertDialogPrimitive.Description
export const AlertDialogClose = AlertDialogPrimitive.Close

interface IAlertProps {
	open?: boolean
	trigger?: React.ReactNode
	footer?: React.ReactNode
	title?: string | React.ReactNode
	description?: string | React.ReactNode
	cancelButtonText?: string
	confirmButtonText?: string
	confirmActionLoding?: boolean
	confirmButtonStyleVariant?: TStyleVariant
	onCancel?: () => void
	onConfirm?: () => void
}

export const DialogAlert: React.FC<IAlertProps> = props => {
	const {
		open,
		trigger,
		title,
		description,
		footer,
		cancelButtonText = 'Cancel',
		confirmButtonText = 'Confirm',
		confirmActionLoding = false,
		confirmButtonStyleVariant = 'destructive',
		onCancel = () => {},
		onConfirm = () => {},
	} = props

	const handleCancelButtonClicked = () => {
		onCancel()
	}

	const handleConfirmButtonClicked = () => {
		onConfirm()
	}

	return (
		<AlertDialog open={open}>
			{trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
			<AlertDialogPortal>
				<AlertDialogOverlay className={styles.alertDialogOverlay} />
				<AlertDialogContent className={styles.alertDialogContent}>
					{title && (
						<AlertDialogTitle>
							<Text size="xlarge" weight="strong" color="strong">
								{title}
							</Text>
						</AlertDialogTitle>
					)}
					{description && (
						<AlertDialogDescription className={styles.alertDialogDescriptionWrapper}>
							<Text>{description}</Text>
						</AlertDialogDescription>
					)}
					{footer || (
						<Box className={styles.alertDialogFooterWrapper}>
							<AlertDialogClose asChild>
								<Button
									sizeVariant="small"
									styleVariant="secondary"
									onClick={handleCancelButtonClicked}
									disabled={confirmActionLoding}
								>
									{cancelButtonText}
								</Button>
							</AlertDialogClose>
							<Button
								sizeVariant="small"
								styleVariant={confirmButtonStyleVariant}
								onClick={handleConfirmButtonClicked}
								disabled={confirmActionLoding}
								rightIcon={
									confirmActionLoding && (
										<Box marginLeft="small">
											<LoadingBarsIcon />
										</Box>
									)
								}
							>
								{confirmButtonText}
							</Button>
						</Box>
					)}
				</AlertDialogContent>
			</AlertDialogPortal>
		</AlertDialog>
	)
}
