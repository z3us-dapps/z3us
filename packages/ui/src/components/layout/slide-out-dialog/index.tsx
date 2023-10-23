import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Close2Icon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { ToolTip } from 'ui/src/components/tool-tip'

import * as styles from './styles.css'

const messages = defineMessages({
	close: {
		id: 'rbrahO',
		defaultMessage: 'Close',
	},
})

interface IProps {
	open: boolean
	children: React.ReactNode
	headerButtons: React.ReactNode
	onClose: () => void
}

export const SlideOutDialog: React.FC<IProps> = props => {
	const { children, open, headerButtons, onClose } = props

	const intl = useIntl()

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
				<DialogOverlay className={styles.dialogOverlay} />
				<DialogContent
					className={styles.transactionContentSlideOutDialogContent}
					onEscapeKeyDown={handleEscapeKeyDown}
					onInteractOutside={handleOnInteractOutside}
				>
					<Box className={clsx(styles.transactionHeaderWrapper)}>
						<Box flexGrow={1} />
						<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
							{headerButtons}
							<ToolTip message={intl.formatMessage(messages.close)}>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
									<Close2Icon />
								</Button>
							</ToolTip>
						</Box>
					</Box>
					<ScrollArea className={styles.transactionScrollWrapper}>{children}</ScrollArea>
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}
