import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Close2Icon, ShareIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { config } from 'ui/src/constants/config'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import * as styles from './styles.css'

const messages = defineMessages({
	explorer: {
		id: 'YnOdQH',
		defaultMessage: 'Open in explorer',
	},
	close: {
		id: 'rbrahO',
		defaultMessage: 'Close',
	},
})

interface IProps {
	open: boolean
	children: React.ReactNode
	id: string
	onClose: () => void
}

export const SlideOutDialog: React.FC<IProps> = props => {
	const { children, open, id, onClose } = props

	const intl = useIntl()
	const isMobile = useIsMobileWidth()

	// const [isScrolled, setIsScrolled] = useState<boolean>(false)

	const navigateBack = () => {
		onClose()
	}

	const handleEscapeKeyDown = () => {
		navigateBack()
	}

	const handleOnInteractOutside = () => {
		navigateBack()
	}

	// useEffect(() => {
	// 	if (!id) {
	// 		setIsScrolled(false)
	// 	}
	// }, [id])

	return (
		<DialogRoot open={open}>
			<DialogPortal>
				{isMobile ? <DialogOverlay className={dialogStyles.dialogOverlay} /> : null}
				<DialogContent
					className={clsx(
						isMobile && dialogStyles.dialogContent,
						isMobile && styles.transactionContent,
						!isMobile && styles.transactionContentSlideOutDialogContent,
					)}
					onEscapeKeyDown={handleEscapeKeyDown}
					onInteractOutside={handleOnInteractOutside}
				>
					<Box className={clsx(styles.transactionHeaderWrapper)}>
						<Box flexGrow={1} />
						<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
							<ToolTip message={intl.formatMessage(messages.explorer)}>
								<Button
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to={`${config.defaultExplorerURL}/transaction/${id}`}
									target="_blank"
								>
									<ShareIcon />
								</Button>
							</ToolTip>
							<ToolTip message={intl.formatMessage(messages.close)}>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
									<Close2Icon />
								</Button>
							</ToolTip>
						</Box>
					</Box>
					<ScrollArea className={styles.transactionScrollWrapper}>
						<Box>
							<Box>{children}</Box>
							{/* <Box>
								<Box>
									{Array.from({ length: 20 }, (_, i) => (
										<Text size="xlarge" key={i}>
											Lorum ipsumIn convallis vel neque facilisis est mi in varius gravida eget convallis convallis ut
											velit lacus, eros faucibus odio. Varius dui porttitor eu ac egestas in tempus nisi suscipit fusce
											urna. Vitae semper velit facilisis nunc, suspendisse vivamus duis vestibulum ullamcorper dui
											lectus sapien tempus sit eu dapibus arcu pellentesque.
										</Text>
									))}
								</Box>
							</Box> */}
						</Box>
					</ScrollArea>
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}
