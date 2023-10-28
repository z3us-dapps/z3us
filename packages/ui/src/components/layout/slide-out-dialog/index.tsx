import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { DialogClose, DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Close2Icon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'

import * as styles from './styles.css'

interface IProps {
	open: boolean
	children: React.ReactNode
	headerButtons?: React.ReactNode
	onClose: () => void
}

export const SlideOutDialog: React.FC<IProps> = props => {
	const { children, open, headerButtons, onClose } = props

	const navigateBack = () => {
		onClose()
	}

	const handleEscapeKeyDown = () => {
		navigateBack()
	}

	const handleOnInteractOutside = () => {
		navigateBack()
	}

	return (
		<DialogRoot open={open}>
			<DialogPortal>
				<DialogOverlay className={styles.slideOutDialogOverlay} />
				<DialogContent
					className={styles.slideOutDialogContent}
					onEscapeKeyDown={handleEscapeKeyDown}
					onInteractOutside={handleOnInteractOutside}
					onOpenAutoFocus={e => {
						e.preventDefault()
					}}
				>
					<Box className={clsx(styles.slideOutDialogHeaderWrapper)}>
						<Box flexGrow={1} />
						<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
							{headerButtons}
							<DialogClose asChild>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
									<Close2Icon />
								</Button>
							</DialogClose>
						</Box>
					</Box>
					<ScrollArea className={styles.slideOutDialogScrollWrapper}>{children}</ScrollArea>
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}
