import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { CheckCircleIcon, Close2Icon, CloseCircleIcon, ShareIcon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { Button } from 'ui/src/components/router-button'
import { Link } from 'ui/src/components/router-link'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { Text } from 'ui/src/components/typography'
import { config } from 'ui/src/constants/config'
import { useTransaction } from 'ui/src/hooks/dapp/use-transactions'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { ValidatorLoadingSkeleton } from './components/validator-loading-skeleton'
import * as styles from './styles.css'

const messages = defineMessages({
	na: {
		defaultMessage: 'N/A',
	},
	details: {
		defaultMessage: 'Details',
	},
	address: {
		defaultMessage: 'Address',
	},
	total_stake: {
		defaultMessage: 'Total stake',
	},
	owner_stake: {
		defaultMessage: 'Owner stake',
	},
	fee: {
		defaultMessage: 'Fee',
	},
	apy: {
		defaultMessage: 'APY',
	},
	accepts_stake: {
		defaultMessage: 'Accepts stake',
	},
	registration_stake: {
		defaultMessage: 'Registration stake',
	},
	explorer: {
		defaultMessage: 'Show in explorer',
	},
	close: {
		defaultMessage: 'Close',
	},
})

export const ValidatorPanel = () => {
	const intl = useIntl()
	const isMobile = useIsMobileWidth()
	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	// START DEMO LOADING
	const [isLoading, setIsLoading] = useState<boolean>(true)
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false)
		}, 1500)

		return () => {
			clearTimeout(timer)
		}
	}, [])
	// END DEMO LOADING
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const transactionId = searchParams.get('validator')
	const { data } = useTransaction(transactionId)
	const isValidatorVisible = !!transactionId

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
		<DialogRoot open={isValidatorVisible} modal={isMobile}>
			<DialogPortal>
				{isMobile ? <DialogOverlay className={dialogStyles.dialogOverlay} /> : null}
				<DialogContent
					className={clsx(
						isMobile && dialogStyles.dialogContent,
						isMobile && styles.validatorContent,
						!isMobile && styles.validatorContentSlideOutDialogContent,
					)}
					onEscapeKeyDown={handleEscapeKeyDown}
					onInteractOutside={handleOnInteractOutside}
				>
					<ScrollArea onScroll={handleScroll}>
						<Box className={styles.validatorBodyScrollWrapper}>
							{isLoading ? (
								<ValidatorLoadingSkeleton />
							) : (
								<>
									<Box display="flex" flexDirection="column" alignItems="center">
										<TransactionIcon
											transactionIconBorderColor="borderDividerSecondary"
											transactionIconSize="large"
											transactionType="deposit"
										/>
										<Box marginTop="small">
											<Link size="small" to="http://www.sundaevalidator.xrd" underline="hover">
												http://www.sundaevalidator.xrd
											</Link>
										</Box>
										<Box marginTop="xxsmall" width="full" paddingX="large">
											<Text size="xxlarge" color="strong" truncate>
												Sundae Validator Sundae Validator
											</Text>
										</Box>
									</Box>
									<Box className={styles.validatorDetailsWrapper}>
										<Box marginTop="xsmall" paddingBottom="medium">
											<Text size="medium" weight="medium" color="strong">
												{intl.formatMessage(messages.details)}
											</Text>
										</Box>
										<Box display="flex" flexDirection="column" gap="medium" width="full">
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.address)}
												rightData={
													<Box display="flex" alignItems="flex-end" gap="xsmall">
														<Box className={styles.validatorInfoCopyBtnWrapper}>
															<CopyAddressButton
																styleVariant="ghost"
																address={data?.transaction.intent_hash}
																iconOnly
																rounded={false}
																tickColor="colorStrong"
															/>
														</Box>
														<ToolTip message={data?.transaction.intent_hash}>
															<Box>
																<Text size="small">{getShortAddress(data?.transaction.intent_hash)}</Text>
															</Box>
														</ToolTip>
													</Box>
												}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.total_stake)}
												rightData={<Text size="small">{data?.transaction.transaction_status || '5%'}</Text>}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.owner_stake)}
												rightData={<Text size="small">{data?.transaction.transaction_status || '5%'}</Text>}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.fee)}
												rightData={<Text size="small">{data?.transaction.transaction_status || '5%'}</Text>}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.apy)}
												rightData={<Text size="small">{data?.transaction.transaction_status || '5%'}</Text>}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.accepts_stake)}
												rightData={<Box>{data?.transaction.confirmed_at ? <CloseCircleIcon /> : <CheckCircleIcon />}</Box>}
											/>
											<AccountsTransactionInfo
												leftTitle={intl.formatMessage(messages.registration_stake)}
												rightData={<Text size="small">{intl.formatMessage(messages.na)}</Text>}
											/>
										</Box>
									</Box>
								</>
							)}
						</Box>
					</ScrollArea>
					<Box className={clsx(styles.validatorHeaderWrapper, isScrolled && styles.validatorHeaderWrapperShadow)}>
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
