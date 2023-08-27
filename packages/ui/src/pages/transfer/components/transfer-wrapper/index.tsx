import type { WalletSdk as WalletSdkType } from '@radixdlt/wallet-sdk'
import clsx from 'clsx'
import { useSendTransaction } from 'packages/ui/src/hooks/dapp/use-send-transaction'
import type { PropsWithChildren } from 'react'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Close2Icon, InformationIcon, LoadingBarsIcon } from 'ui/src/components/icons'
import MotionBox from 'ui/src/components/motion-box'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'ui/src/components/popover'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { Z3usLoading } from 'ui/src/components/z3us-loading'

import * as styles from './styles.css'

export type TransactionDetails = Parameters<WalletSdkType['sendTransaction']>[0]

export type TransactionDetailsGetter = () => TransactionDetails | null

export type SetTransaction = (input: TransactionDetails | TransactionDetailsGetter) => void

export interface ITransferWrapperProps {
	title: string | React.ReactElement
	titleSuffix?: string | React.ReactElement
	description?: string | React.ReactElement
	transaction: TransactionDetails | TransactionDetailsGetter
	helpTitle?: string | React.ReactElement
	help?: string | React.ReactElement
}

export const TransferWrapper: React.FC<PropsWithChildren<ITransferWrapperProps>> = props => {
	const { title, titleSuffix, description, helpTitle, help, transaction, children } = props
	const sendTransaction = useSendTransaction()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [txError, setTxError] = useState<string>('')

	const handleClose = () => {
		setIsOpen(false)
		setIsLoading(false)
		setTxError('')
	}

	const handleEscapeKeyDown = () => {
		if (txError) {
			handleClose()
		}
	}

	const handleOpenSendingDialog = () => {
		setIsOpen(true)
		setIsLoading(true)

		const input = typeof transaction === 'function' ? transaction() : transaction
		if (!input) return

		sendTransaction(input)
			// TODO:
			// @ts-ignore
			.andThen(() => {
				setIsLoading(false)
				setTxError('')
			})
			.mapErr(error => {
				setIsLoading(false)

				// TODO:
				// @ts-ignore
				setTxError(error.message || 'Action failed')
			})
	}

	return (
		<>
			<MotionBox>
				<ScrollPanel>
					<Box className={styles.transferDesktopWrapper}>
						<Box width="full">
							<Box display="flex" alignItems="flex-end" paddingBottom="xxsmall">
								<Box display="flex" paddingTop="xxsmall" alignItems="center">
									<Text size="xxlarge" weight="strong" color="strong">
										{title}
									</Text>
									&nbsp;
									{titleSuffix && (
										<Text size="xxlarge" weight="strong">
											({titleSuffix})
										</Text>
									)}
								</Box>
								{(helpTitle || help) && (
									<PopoverRoot>
										<PopoverTrigger asChild>
											<Box marginBottom="xxsmall">
												<Button styleVariant="ghost" sizeVariant="xsmall" iconOnly aria-label="TODO">
													<InformationIcon />
												</Button>
											</Box>
										</PopoverTrigger>
										<PopoverPortal>
											<PopoverContent align="start" sideOffset={2} style={{ maxWidth: '300px' }}>
												<Box padding="medium" display="flex" flexDirection="column" gap="small">
													<Text size="xsmall" color="strong" weight="medium">
														{helpTitle}
													</Text>
													<Text size="xsmall">{help}</Text>
												</Box>
											</PopoverContent>
										</PopoverPortal>
									</PopoverRoot>
								)}
							</Box>
							<Box>
								<Text size="small">{description}</Text>
							</Box>
							<Box marginTop="large">{children}</Box>
							{/* <Box display="flex" paddingTop="xlarge" width="full">
								<Button
									styleVariant="primary"
									sizeVariant="xlarge"
									fullWidth
									onClick={handleOpenSendingDialog}
									disabled={isOpen || isLoading || !transaction}
									rightIcon={
										isOpen ? (
											<Box marginLeft="small">
												<LoadingBarsIcon />
											</Box>
										) : null
									}
								>
									<Translation capitalizeFirstLetter text="global.send" />
								</Button>
							</Box> */}
						</Box>
					</Box>
				</ScrollPanel>
			</MotionBox>

			<DialogRoot open={isOpen}>
				<DialogPortal>
					<DialogOverlay className={dialogStyles.dialogOverlay} />
					<DialogContent
						onEscapeKeyDown={handleEscapeKeyDown}
						className={clsx(
							dialogStyles.dialogContent,
							dialogStyles.dialogContentFixedHeight,
							styles.transferSendingDialog,
						)}
					>
						{txError ? (
							<Box className={styles.transferSendingDialogCloseBtn}>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={handleClose}>
									<Close2Icon />
								</Button>
							</Box>
						) : null}
						<Box width="full" height="full" display="flex" alignItems="center" justifyContent="center">
							<Box display="flex" flexDirection="column" gap="medium" alignItems="center">
								{isLoading && (
									<Box>
										<Z3usLoading message={<Translation capitalizeFirstLetter text="global.send" />} />
										<Text>
											{' '}
											<Translation capitalizeFirstLetter text="global.confirmDevice" />
										</Text>
									</Box>
								)}
								{txError && <Text color="red">{txError}</Text>}
							</Box>
						</Box>
					</DialogContent>
				</DialogPortal>
			</DialogRoot>
		</>
	)
}
