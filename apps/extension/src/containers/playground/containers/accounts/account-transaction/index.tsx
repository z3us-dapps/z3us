/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from 'ui/src/components-v2/dialog'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { Close2Icon, ShareIcon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import { TransactionIcon } from '@src/components/transaction-icon'
import Translation from '@src/components/translation'
import { CopyAddressButton } from '@src/containers/playground/components/copy-address-button'
import {
	ACCOUNT_PARAM_ACTIVITY,
	ACCOUNT_PARAM_ASSET,
	ACCOUNT_PARAM_TRANSACTION_ID,
} from '@src/containers/playground/constants'
import { getShortAddress } from '@src/utils/string-utils'

import { AccountsTransactionInfo } from './account-transaction-info'
import * as styles from './account-transaction.css'

interface IAccountTransactionRequiredProps {}

interface IAccountTransactionOptionalProps {
	className?: number
}

interface IAccountTransactionProps extends IAccountTransactionRequiredProps, IAccountTransactionOptionalProps {}

const defaultProps: IAccountTransactionOptionalProps = {
	className: undefined,
}

export const AccountTransaction = forwardRef<HTMLElement, IAccountTransactionProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const [isScrolled, setIsScrolled] = useState<boolean>(false)
		const [searchParams] = useSearchParams()
		const navigate = useNavigate()
		const { pathname } = useLocation()

		const asset = searchParams.get(ACCOUNT_PARAM_ASSET)
		const transactionId = searchParams.get(ACCOUNT_PARAM_TRANSACTION_ID)
		const isActivityLink = searchParams.get(ACCOUNT_PARAM_ACTIVITY)

		// TODO: temp
		const accountAddress =
			'ardx1qspt0lthflcd45zhwvrxkqdrv5ne5avsgarjcpfatyw7n7n93v38dhcdtlag0sdfalksjdhf7d8f78d7f8d7f8d7f8d7f'

		const navigateBack = () => {
			navigate(`${pathname}${isActivityLink ? `?${ACCOUNT_PARAM_ACTIVITY}=true` : ''}`)
		}

		const handleScroll = (event: Event) => {
			const target = event.target as Element
			const { scrollTop } = target

			setIsScrolled(scrollTop > 0)
		}

		return asset && transactionId ? (
			<Dialog open>
				<DialogPortal>
					<DialogOverlay className={styles.transactionOverlay} />
					<DialogContent className={clsx(styles.transactionContent, className)} onEscapeKeyDown={navigateBack}>
						<ScrollArea onScroll={handleScroll}>
							<Box ref={ref} className={styles.transactionBodyScrollWrapper}>
								<Box display="flex" flexDirection="column" alignItems="center">
									<TransactionIcon transactionIconSize="large" transactionType="deposit" />
									<Box marginTop="small">
										<Text size="small" color="strong">
											<Translation capitalizeFirstLetter text="global.received" /> XRD
										</Text>
									</Box>
									<Box marginTop="xxsmall">
										<Text size="xxxlarge" color="strong">
											0.0014
										</Text>
									</Box>
									<Box marginTop="xxsmall">
										<Text size="xlarge">$24,000</Text>
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
											leftTitle={<Translation capitalizeFirstLetter text="global.type" />}
											rightData={
												<Text size="small">
													{/* TODO:  */}
													<Translation text="global.deposit" />
												</Text>
											}
										/>
										<AccountsTransactionInfo
											leftTitle={<Translation capitalizeFirstLetter text="global.date" />}
											rightData={
												<Box display="flex">
													{/* TODO: need date hook based on settings  */}
													<Text size="small">07/04/2023, 08:45:34</Text>
												</Box>
											}
										/>
										<AccountsTransactionInfo
											leftTitle={<Translation capitalizeFirstLetter text="global.id" />}
											rightData={
												<Box display="flex">
													<ToolTip message={accountAddress}>
														<Box>
															<Text size="small">{getShortAddress(accountAddress)}</Text>
														</Box>
													</ToolTip>
												</Box>
											}
										/>
										<AccountsTransactionInfo
											leftTitle={
												<>
													<Translation capitalizeFirstLetter text="global.from" /> <Translation text="global.address" />
												</>
											}
											rightData={
												<Box display="flex" alignItems="flex-end" gap="xsmall">
													<Box className={styles.transactionInfoCopyBtnWrapper}>
														<CopyAddressButton
															styleVariant="ghost"
															address={accountAddress}
															iconOnly
															rounded={false}
															tickColor="colorStrong"
														/>
													</Box>
													<ToolTip message={accountAddress}>
														<Box>
															<Text size="small">{getShortAddress(accountAddress)}</Text>
														</Box>
													</ToolTip>
												</Box>
											}
										/>
										<AccountsTransactionInfo
											leftTitle={
												<>
													<Translation capitalizeFirstLetter text="global.to" /> <Translation text="global.address" />
												</>
											}
											rightData={
												<Box display="flex" alignItems="flex-end" gap="xsmall">
													<Box className={styles.transactionInfoCopyBtnWrapper}>
														<CopyAddressButton
															styleVariant="ghost"
															address={accountAddress}
															iconOnly
															rounded={false}
															tickColor="colorStrong"
														/>
													</Box>
													<ToolTip message={accountAddress}>
														<Box>
															<Text size="small">{getShortAddress(accountAddress)}</Text>
														</Box>
													</ToolTip>
												</Box>
											}
										/>
										{/* message */}
										<Box position="relative" width="full">
											<Box display="flex" alignItems="center" gap="xsmall">
												<Text size="small" color="strong">
													Message (encryped)
												</Text>
												<CopyAddressButton
													styleVariant="ghost"
													address="messssageeeaskjdfhlsakjdhflksjdhfg lkjhlkjh"
													iconOnly
													rounded={false}
													tickColor="colorStrong"
													toolTipDisabled
												/>
											</Box>
										</Box>
										<Box position="relative" width="full">
											<Text size="xsmall">
												Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
												thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
												scrambled it to make a type specimen book. It has survived not only five centuries, but also the
												leap into electronic typesetting, remaining essentially unchanged. It was popularised in the
												1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently
												with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
											</Text>
										</Box>
									</Box>
								</Box>
							</Box>
						</ScrollArea>
						<Box className={clsx(styles.transactionHeaderWrapper, isScrolled && styles.transactionHeaderWrapperShadow)}>
							<Box flexGrow={1} />
							<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
								<ToolTip
									theme="backgroundPrimary"
									message={<Translation capitalizeFirstLetter text="global.explorer" />}
								>
									<Button
										sizeVariant="small"
										styleVariant="ghost"
										iconOnly
										to="https://explorer.radixdlt.com/"
										target="_blank"
									>
										<ShareIcon />
									</Button>
								</ToolTip>
								<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.close" />}>
									<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
										<Close2Icon />
									</Button>
								</ToolTip>
							</Box>
						</Box>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		) : null
	},
)

AccountTransaction.defaultProps = defaultProps
