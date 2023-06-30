/* eslint-disable @typescript-eslint/no-unused-vars */
import BigNumber from 'bignumber.js'
import clsx, { type ClassValue } from 'clsx'
import { TokenPrice } from 'packages/ui/src/components/token-price'
import { TransactionManifest } from 'packages/ui/src/components/transaction-manifest'
import { config } from 'packages/ui/src/constants/config'
import { useTransaction } from 'packages/ui/src/hooks/dapp/use-transactions'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Close2Icon, ShareIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { ACCOUNT_PARAM_ACTIVITY, ACCOUNT_PARAM_ASSET, ACCOUNT_PARAM_TRANSACTION_ID } from 'ui/src/constants/accounts'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { AccountsTransactionInfo } from './account-transaction-info'
import * as styles from './account-transaction.css'

export const AccountTransaction = () => {
	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()
	const { pathname } = useLocation()

	const asset = searchParams.get(ACCOUNT_PARAM_ASSET)
	const transactionId = searchParams.get(ACCOUNT_PARAM_TRANSACTION_ID)
	const isActivityLink = searchParams.get(ACCOUNT_PARAM_ACTIVITY)
	const { data } = useTransaction(transactionId)
	const isAccountTransactionVisible = !!asset && !!transactionId

	const navigateBack = () => {
		navigate(`${pathname}${isActivityLink ? `?${ACCOUNT_PARAM_ACTIVITY}=true` : ''}`)
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
		<DialogRoot open={isAccountTransactionVisible}>
			<DialogPortal>
				<DialogOverlay className={dialogStyles.dialogOverlay} />
				<DialogContent
					className={clsx(dialogStyles.dialogContent, styles.transactionContent)}
					onEscapeKeyDown={navigateBack}
				>
					<ScrollArea onScroll={handleScroll}>
						<Box className={styles.transactionBodyScrollWrapper}>
							<Box display="flex" flexDirection="column" alignItems="center">
								<TransactionIcon
									transactionIconBorderColor="borderDividerSecondary"
									transactionIconSize="large"
									transactionType="deposit"
								/>
								<Box marginTop="small">
									<Text size="small" color="strong">
										<Translation capitalizeFirstLetter text="global.fee" />
									</Text>
								</Box>
								<Box marginTop="xxsmall">
									<Text size="xxxlarge" color="strong">
										{formatBigNumber(new BigNumber((data?.transaction.fee_paid as any)?.value || 0), 'XRD', 8)}
									</Text>
								</Box>
								<Box marginTop="xxsmall">
									<Text size="xlarge">
										<TokenPrice amount={new BigNumber((data?.transaction.fee_paid as any)?.value || 0)} symbol="XRD" />
									</Text>
								</Box>
							</Box>
							<Box className={styles.transactionDetailsWrapper}>
								<Box marginTop="xsmall" paddingBottom="medium">
									<Text size="xlarge" color="strong">
										<Translation capitalizeFirstLetter text="global.transaction" />{' '}
										<Translation text="global.details" />
									</Text>
								</Box>
								<Box display="flex" flexDirection="column" gap="medium" width="full">
									<AccountsTransactionInfo
										leftTitle={<Translation capitalizeFirstLetter text="global.id" />}
										rightData={
											<Box display="flex" alignItems="flex-end" gap="xsmall">
												<Box className={styles.transactionInfoCopyBtnWrapper}>
													<CopyAddressButton
														styleVariant="ghost"
														address={data?.transaction.intent_hash_hex}
														iconOnly
														rounded={false}
														tickColor="colorStrong"
													/>
												</Box>
												<ToolTip message={data?.transaction.intent_hash_hex}>
													<Box>
														<Text size="small">{getShortAddress(data?.transaction.intent_hash_hex)}</Text>
													</Box>
												</ToolTip>
											</Box>
										}
									/>

									<AccountsTransactionInfo
										leftTitle={<Translation capitalizeFirstLetter text="global.transaction_status" />}
										rightData={<Text size="small">{data?.transaction.transaction_status}</Text>}
									/>

									{/* <AccountsTransactionInfo
											leftTitle={<Translation capitalizeFirstLetter text="global.status" />}
											rightData={<Text size="small">{data?.transaction.receipt?.status}</Text>}
										/> */}

									<AccountsTransactionInfo
										leftTitle={<Translation capitalizeFirstLetter text="global.state_version" />}
										rightData={<Text size="small">{data?.transaction.state_version}</Text>}
									/>

									<AccountsTransactionInfo
										leftTitle={<Translation capitalizeFirstLetter text="global.epoch" />}
										rightData={<Text size="small">{data?.transaction.epoch}</Text>}
									/>

									<AccountsTransactionInfo
										leftTitle={<Translation capitalizeFirstLetter text="global.round" />}
										rightData={<Text size="small">{data?.transaction.round}</Text>}
									/>

									<AccountsTransactionInfo
										leftTitle={<Translation capitalizeFirstLetter text="global.date" />}
										rightData={
											<Box display="flex">
												{/* TODO: need date hook based on settings  */}
												<Text size="small">{data?.transaction.confirmed_at.toLocaleString()}</Text>
											</Box>
										}
									/>

									<AccountsTransactionInfo
										leftTitle={<Translation capitalizeFirstLetter text="global.affected_global_entities" />}
										rightData={
											<Box display="flex" alignItems="flex-end" gap="xsmall">
												{data?.transaction.affected_global_entities?.map(entity => (
													<Box>
														<Box className={styles.transactionInfoCopyBtnWrapper}>
															<CopyAddressButton
																styleVariant="ghost"
																address={entity}
																iconOnly
																rounded={false}
																tickColor="colorStrong"
															/>
														</Box>
														<ToolTip message={entity}>
															<Box>
																<Text size="small">{getShortAddress(entity)}</Text>
															</Box>
														</ToolTip>
													</Box>
												))}
											</Box>
										}
									/>

									{data?.transaction.message_hex && (
										<>
											<Box position="relative" width="full">
												<Box display="flex" alignItems="center" gap="xsmall">
													<Text size="small" color="strong">
														Message
													</Text>
													<CopyAddressButton
														styleVariant="ghost"
														address="Copy message"
														iconOnly
														rounded={false}
														tickColor="colorStrong"
													/>
												</Box>
											</Box>
											<Box position="relative" width="full">
												<Text size="xsmall">{Buffer.from(data?.transaction.message_hex, 'hex').toString()}</Text>
											</Box>
										</>
									)}

									<Box position="relative" width="full">
										<Box display="flex" alignItems="center" gap="xsmall">
											<Text size="small" color="strong">
												Transaction manifest
											</Text>
											<CopyAddressButton
												styleVariant="ghost"
												address="Copy transaction manifest"
												iconOnly
												rounded={false}
												tickColor="colorStrong"
											/>
										</Box>
									</Box>
									<Box position="relative" width="full">
										<TransactionManifest manifestHex={data?.transaction.raw_hex} size="xsmall" />
									</Box>
								</Box>
							</Box>
						</Box>
					</ScrollArea>
					<Box className={clsx(styles.transactionHeaderWrapper, isScrolled && styles.transactionHeaderWrapperShadow)}>
						<Box flexGrow={1} />
						<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
							<ToolTip message={<Translation capitalizeFirstLetter text="global.explorer" />}>
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
							<ToolTip message={<Translation capitalizeFirstLetter text="global.close" />}>
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
