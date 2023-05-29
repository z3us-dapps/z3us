import clsx from 'clsx'
import React, { useState } from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from 'ui/src/components-v2/dialog'
import { Text } from 'ui/src/components-v2/typography'
import { ArrowLeftIcon, ChevronDown2Icon, LockIcon } from 'ui/src/components/icons'

import * as dialogStyles from '@src/components/styles/dialog-styles.css'
import { TokenImageIcon } from '@src/components/token-image-icon'
import Translation from '@src/components/translation'
import { Z3usLoading } from '@src/components/z3us-loading'

import * as styles from './review-transfer.css'

interface IReviewTransferRequiredProps {
	onNavigateBack: () => void
}

interface IReviewTransferOptionalProps {}

interface IReviewTransferProps extends IReviewTransferRequiredProps, IReviewTransferOptionalProps {}

const defaultProps: IReviewTransferOptionalProps = {}

export const ReviewTransfer: React.FC<IReviewTransferProps> = props => {
	const { onNavigateBack } = props

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleOpenSendingDialog = () => {
		setIsOpen(true)
	}

	const handleNaviateBack = () => {
		onNavigateBack()
	}

	return (
		<>
			<Box position="relative">
				<Box display="flex" alignItems="center" paddingBottom="large" gap="medium">
					<Button onClick={handleNaviateBack} sizeVariant="small" styleVariant="ghost" iconOnly>
						<ArrowLeftIcon />
					</Button>
					<Text size="xxxlarge" weight="strong" color="strong">
						Review transaction
					</Text>
				</Box>
				<Box display="flex" flexDirection="column" gap="large">
					{/* START FROM */}
					<Box display="flex" flexDirection="column" gap="small">
						<Box display="flex" gap="xsmall">
							<Text color="strong" size="xlarge" weight="strong">
								From
							</Text>
						</Box>
						<Box>
							<Button
								disabled
								styleVariant="secondary"
								sizeVariant="xlarge"
								fullWidth
								leftIcon={
									<TokenImageIcon
										imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
										imgAlt="btc token image"
										fallbackText="btc"
									/>
								}
							>
								<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
									<Text size="large" color="strong">
										Savings account rdx1...3343
									</Text>
								</Box>
							</Button>
						</Box>
					</Box>
					{/* END FROM */}
					{/* START MESSAGE */}
					<Box display="flex" flexDirection="column" gap="small">
						<Box display="flex" gap="xsmall" width="full">
							<Text color="strong" size="xlarge" weight="strong">
								Message
							</Text>
							<Box display="flex" alignItems="center">
								<Text size="xlarge" weight="strong">
									(encrypted)
								</Text>
								<LockIcon />
							</Box>
							<Box display="flex" alignItems="center" justifyContent="flex-end" flexGrow={1}>
								<Button sizeVariant="small" styleVariant="ghost" iconOnly>
									<ChevronDown2Icon />
								</Button>
							</Box>
						</Box>
						<Box className={styles.messageWrapper}>
							<Text size="xsmall">
								Lorem ipsum dolor sitOdio magna suspendisse consequat, lectus eu convallis faucibus nisl efficitur
								penatibus pellentesque velit nunc arcu. Lorem adipiscing ut tincidunt ligula faucibus, consequat et
								finibus id rutrum vitae praesent porttitor aliquam finibus, arcu in nunc phasellus congue quisque dictum
								elit luctus lectus facilisis pellentesque augue iaculis. Malesuada vel suscipit cras convallis eget,
								elit auctor aliquet
							</Text>
						</Box>
					</Box>
					{/* END START MESSAGE */}

					{/* START TO */}
					<Box display="flex" flexDirection="column" gap="small">
						<Box display="flex" gap="xsmall">
							<Text color="strong" size="xlarge" weight="strong">
								To
							</Text>
						</Box>
						<Box>
							<Button
								disabled
								styleVariant="secondary"
								sizeVariant="xlarge"
								fullWidth
								leftIcon={
									<TokenImageIcon
										imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
										imgAlt="btc token image"
										fallbackText="btc"
									/>
								}
							>
								<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
									<Text size="large" color="strong">
										Savings account rdx1...3343
									</Text>
								</Box>
							</Button>
						</Box>

						<Box>
							<Box display="flex" gap="xsmall">
								<Text color="strong" size="xlarge" weight="strong">
									Tokens
								</Text>
							</Box>
						</Box>

						<Box className={styles.tokensWrapper}>
							<Box className={styles.tokenRowWrapper}>
								<TokenImageIcon
									imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
									imgAlt="btc token image"
									fallbackText="btc"
								/>
								<Text size="small" weight="medium">
									XRD 454.33 - ($10.24 USD)
								</Text>
							</Box>
							<Box className={styles.tokenRowWrapper}>
								<TokenImageIcon
									imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
									imgAlt="btc token image"
									fallbackText="btc"
								/>
								<Text size="small" weight="medium">
									XRD 454.33 - ($10.24 USD)
								</Text>
							</Box>
							<Box className={styles.tokenRowWrapper}>
								<TokenImageIcon
									imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
									imgAlt="btc token image"
									fallbackText="btc"
								/>
								<Text size="small" weight="medium">
									XRD 454.33 - ($10.24 USD)
								</Text>
							</Box>
						</Box>
					</Box>
					{/* END TO */}
				</Box>

				<Box display="flex" paddingTop="xlarge" width="full">
					<Button
						styleVariant="primary"
						sizeVariant="xlarge"
						fullWidth
						onClick={handleOpenSendingDialog}
						// disabled
						// rightIcon={
						// 	<Box marginLeft="small">
						// 		<LoadingBarsIcon />
						// 	</Box>
						// }
					>
						<Translation capitalizeFirstLetter text="global.send" />
					</Button>
				</Box>
			</Box>
			<Dialog open={isOpen}>
				<DialogPortal>
					<DialogOverlay className={dialogStyles.dialogOverlay} />
					<DialogContent
						className={clsx(
							dialogStyles.dialogContent,
							dialogStyles.dialogContentFixedHeight,
							styles.transferSendingDialog,
						)}
					>
						<Box width="full" height="full" display="flex" alignItems="center" justifyContent="center">
							<Box display="flex" flexDirection="column" gap="medium" alignItems="center">
								<Z3usLoading message="Sending" />
								<Text>confirm transaction on your device</Text>
							</Box>
						</Box>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		</>
	)
}

ReviewTransfer.defaultProps = defaultProps
