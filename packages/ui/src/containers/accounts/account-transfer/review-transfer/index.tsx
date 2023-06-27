/* eslint-disable react/no-array-index-key */
import BigNumber from 'bignumber.js'
import clsx from 'clsx'
import { Amount } from 'packages/ui/src/components/amount'
import { ResourceImageIcon } from 'packages/ui/src/components/resource-image-icon'
import { TokenPrice } from 'packages/ui/src/components/token-price'
import { useSendTransaction } from 'packages/ui/src/hooks/dapp/use-send-transaction'
import { sendTokens } from 'packages/ui/src/manifests/tokens'
import type { AddressBookEntry } from 'packages/ui/src/store/types'
import { getShortAddress } from 'packages/ui/src/utils/string-utils'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { ArrowLeftIcon, ChevronDown2Icon, LockIcon } from 'ui/src/components/icons'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { Z3usLoading } from 'ui/src/components/z3us-loading'

import type { TTransferSchema } from '../account-transfer-types'
import * as styles from './review-transfer.css'

interface IReviewTransferRequiredProps {
	accounts: { [key: string]: AddressBookEntry }
	addressBook: { [key: string]: AddressBookEntry }
	transaction: TTransferSchema
	onNavigateBack: () => void
}

interface IReviewTransferOptionalProps {}

interface IReviewTransferProps extends IReviewTransferRequiredProps, IReviewTransferOptionalProps {}

const defaultProps: IReviewTransferOptionalProps = {}

export const ReviewTransfer: React.FC<IReviewTransferProps> = props => {
	const { transaction, accounts, addressBook, onNavigateBack } = props

	const sendTransaction = useSendTransaction()

	const knownAddresses = { ...accounts, ...addressBook }

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleOpenSendingDialog = () => {
		setIsOpen(true)

		const fungibles = transaction.sends.map(({ to, tokens }) =>
			tokens.map(token => ({ amount: token.amount, resource: token.address, to })),
		)

		const transactionManifest = sendTokens(transaction.from).fungible(fungibles.flat())

		sendTransaction({
			version: 0,
			transactionManifest,
		})
			.andThen(response => {
				console.log(response)
				setIsOpen(false)
			})
			.mapErr(error => {
				console.error(error)
				setIsOpen(false)
			})
	}

	const handleNavigateBack = () => {
		onNavigateBack()
	}

	return (
		<>
			<Box position="relative">
				<Box display="flex" alignItems="center" paddingBottom="large" gap="medium">
					<Button onClick={handleNavigateBack} sizeVariant="small" styleVariant="ghost" iconOnly>
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
								leftIcon={<ResourceImageIcon address={transaction.from} />}
							>
								<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
									<Text size="large" color="strong">
										{knownAddresses[transaction.from]?.name || getShortAddress(transaction.from)}
									</Text>
								</Box>
							</Button>
						</Box>
					</Box>
					{/* END FROM */}

					{/* START MESSAGE */}
					{transaction.message && (
						<Box display="flex" flexDirection="column" gap="small">
							<Box display="flex" gap="xsmall" width="full">
								<Text color="strong" size="xlarge" weight="strong">
									Message
								</Text>
								{transaction.isMessageEncrypted && (
									<Box display="flex" alignItems="center">
										<Text size="xlarge" weight="strong">
											(encrypted)
										</Text>
										<LockIcon />
									</Box>
								)}
								<Box display="flex" alignItems="center" justifyContent="flex-end" flexGrow={1}>
									<Button sizeVariant="small" styleVariant="ghost" iconOnly>
										<ChevronDown2Icon />
									</Button>
								</Box>
							</Box>
							<Box className={styles.messageWrapper}>
								<Text size="xsmall">{transaction.message}</Text>
							</Box>
						</Box>
					)}
					{/* END START MESSAGE */}

					{/* START TO */}
					{transaction.sends.map((send, sendIdx) => (
						<Box display="flex" flexDirection="column" gap="small" key={`group-${sendIdx}`}>
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
									leftIcon={<ResourceImageIcon address={send.to} />}
								>
									<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
										<Text size="large" color="strong">
											{knownAddresses[send.to]?.name || getShortAddress(send.to)}
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
								{send.tokens.map((token, tokenIdx) => (
									<Box className={styles.tokenRowWrapper} key={`tokens-${sendIdx}-${tokenIdx}`}>
										<ResourceImageIcon address={token.address} />
										<Text size="small" weight="medium">
											{token.symbol.toUpperCase()} <Amount value={new BigNumber(token.amount)} />
											{' - '}
											<TokenPrice amount={new BigNumber(token.amount)} symbol={token.symbol} />
										</Text>
									</Box>
								))}
							</Box>
						</Box>
					))}
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
			<DialogRoot open={isOpen}>
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
			</DialogRoot>
		</>
	)
}

ReviewTransfer.defaultProps = defaultProps
