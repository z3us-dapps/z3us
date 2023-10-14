import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { FormattedNumber, defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Close2Icon, ShareIcon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { Button } from 'ui/src/components/router-button'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { TimeFromNow } from 'ui/src/components/time-from-now'
import { TokenPrice } from 'ui/src/components/token-price'
import { ToolTip } from 'ui/src/components/tool-tip'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { StyledTransactionManifest, TransactionManifest } from 'ui/src/components/transaction-manifest'
import { Text } from 'ui/src/components/typography'
import { config } from 'ui/src/constants/config'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useTransaction } from 'ui/src/hooks/dapp/use-transactions'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { TransactionLoadingSkeleton } from './components/transaction-loading-skeleton'
import * as styles from './styles.css'

const messages = defineMessages({
	fee: {
		id: 'transaction.fee',
		defaultMessage: 'Fee',
	},
	details: {
		id: 'transaction.details',
		defaultMessage: 'Details',
	},
	id: {
		id: 'transaction.id',
		defaultMessage: 'ID',
	},
	status: {
		id: 'transaction.status',
		defaultMessage: 'Status',
	},
	version: {
		id: 'transaction.version',
		defaultMessage: 'State version',
	},
	epoch: {
		id: 'transaction.epoch',
		defaultMessage: 'Epoch',
	},
	round: {
		id: 'transaction.round',
		defaultMessage: 'Round',
	},
	date: {
		id: 'transaction.date',
		defaultMessage: 'Date',
	},
	affected_global_entities: {
		id: 'transaction.affected_global_entities',
		defaultMessage: 'Affected global entities',
	},
	message: {
		id: 'transaction.message',
		defaultMessage: 'Message',
	},
	manifest: {
		id: 'transaction.manifest',
		defaultMessage: 'Transaction manifest',
	},
	explorer: {
		id: 'transaction.explorer',
		defaultMessage: 'Open in explorer',
	},
	close: {
		id: 'transaction.close',
		defaultMessage: 'Close',
	},
})

export const Transaction = () => {
	const intl = useIntl()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [searchParams] = useSearchParams()
	const isMobile = useIsMobileWidth()
	const { data: knownAddresses } = useKnownAddresses()

	const transactionId = searchParams.get('tx')
	const isTransactionVisible = !!transactionId
	const { data, isLoading } = useTransaction(transactionId)

	const [isScrolled, setIsScrolled] = useState<boolean>(false)

	const navigateBack = () => {
		navigate(pathname)
	}

	const handleEscapeKeyDown = () => {
		navigateBack()
	}

	const handleOnInteractOutside = () => {
		if (isMobile) {
			navigateBack()
		}
	}

	const handleScroll = (event: Event) => {
		const target = event.target as Element
		const { scrollTop } = target

		setIsScrolled(scrollTop > 0)
	}

	useEffect(() => {
		if (!transactionId) {
			setIsScrolled(false)
		}
	}, [transactionId])

	return (
		<DialogRoot open={isTransactionVisible} modal={isMobile}>
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
					<ScrollArea onScroll={handleScroll}>
						<Box className={styles.transactionBodyScrollWrapper}>
							{isLoading ? (
								<TransactionLoadingSkeleton />
							) : (
								<>
									<Box display="flex" flexDirection="column" alignItems="center">
										<TransactionIcon
											transactionIconBorderColor="borderDividerSecondary"
											transactionIconSize="medium"
											transactionType="deposit"
										/>
										<Box marginTop="small">
											<Text size="small">{intl.formatMessage(messages.fee)}</Text>
										</Box>
										<Box marginTop="xxsmall">
											<Text size="xxxlarge" color="strong">
												<FormattedNumber
													value={parseFloat(data?.transaction.fee_paid) || 0}
													style="decimal"
													maximumFractionDigits={8}
												/>
											</Text>
										</Box>
										<Box>
											<Text size="xlarge">
												<TokenPrice
													amount={parseFloat(data?.transaction.fee_paid) || 0}
													address={knownAddresses?.resourceAddresses.xrd}
												/>
											</Text>
										</Box>
									</Box>
									<Box className={styles.transactionDetailsWrapper}>
										<Box marginTop="xsmall" paddingBottom="medium">
											<Text size="medium" weight="medium" color="strong">
												{intl.formatMessage(messages.details)}
											</Text>
										</Box>
										<Box display="flex" flexDirection="column" gap="medium" width="full">
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.id)}
												rightData={
													<Box display="flex" alignItems="flex-end" gap="small">
														<ToolTip message={data?.transaction.intent_hash}>
															<Box>
																<Text size="xsmall">{getShortAddress(data?.transaction.intent_hash)}</Text>
															</Box>
														</ToolTip>
														<Box className={styles.transactionInfoCopyBtnWrapper}>
															<CopyAddressButton
																styleVariant="ghost"
																address={data?.transaction.intent_hash}
																sizeVariant="xsmall"
																iconOnly
																rounded={false}
																tickColor="colorStrong"
															/>
														</Box>
													</Box>
												}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.status)}
												rightData={<Text size="xsmall">{data?.transaction.transaction_status}</Text>}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.version)}
												rightData={<Text size="xsmall">{data?.transaction.state_version}</Text>}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.epoch)}
												rightData={<Text size="xsmall">{data?.transaction.epoch}</Text>}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.round)}
												rightData={<Text size="xsmall">{data?.transaction.round}</Text>}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.date)}
												rightData={
													<Text size="xsmall">
														<TimeFromNow date={data?.transaction.confirmed_at} />
													</Text>
												}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.affected_global_entities)}
												rightData={
													<Box display="flex" flexDirection="column" gap="xsmall">
														{[data?.transaction.affected_global_entities?.[0]]?.map(entity => (
															<Box
																key={entity}
																display="flex"
																alignItems="flex-end"
																gap="small"
																justifyContent="flex-end"
															>
																<ToolTip message={entity}>
																	<Box>
																		<Text size="xsmall">{getShortAddress(entity, 8)}</Text>
																	</Box>
																</ToolTip>
																<Box className={styles.transactionInfoCopyBtnWrapper}>
																	<CopyAddressButton
																		styleVariant="ghost"
																		sizeVariant="xsmall"
																		address={entity}
																		iconOnly
																		rounded={false}
																		tickColor="colorStrong"
																	/>
																</Box>
															</Box>
														))}
													</Box>
												}
											/>

											<Box className={styles.transactionExtraRowsWrapper}>
												{data?.transaction.affected_global_entities?.slice(1)?.map(entity => (
													<Box key={entity} display="flex" alignItems="flex-end" gap="small" justifyContent="flex-end">
														<ToolTip message={entity}>
															<Box>
																<Text size="xsmall">{getShortAddress(entity, 8)}</Text>
															</Box>
														</ToolTip>
														<Box className={styles.transactionInfoCopyBtnWrapper}>
															<CopyAddressButton
																styleVariant="ghost"
																sizeVariant="xsmall"
																address={entity}
																iconOnly
																rounded={false}
																tickColor="colorStrong"
															/>
														</Box>
													</Box>
												))}
											</Box>

											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.manifest)}
												rightData={
													<Box display="flex" alignItems="flex-end" gap="xsmall">
														<Box className={styles.transactionInfoCopyBtnWrapper}>
															<CopyAddressButton
																styleVariant="ghost"
																sizeVariant="xsmall"
																address="Copy transaction manifest"
																iconOnly
																rounded={false}
																tickColor="colorStrong"
															/>
														</Box>
													</Box>
												}
											/>
											<Box paddingY="xsmall">
												<StyledTransactionManifest manifestHex={data?.transaction.raw_hex} />
											</Box>
										</Box>
									</Box>
								</>
							)}
						</Box>
					</ScrollArea>
					<Box className={clsx(styles.transactionHeaderWrapper, isScrolled && styles.transactionHeaderWrapperShadow)}>
						<Box flexGrow={1} />
						<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
							<ToolTip message={intl.formatMessage(messages.explorer)}>
								<Button
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to={`${config.defaultExplorerURL}/transaction/${transactionId}`}
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
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}
