/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Dialog, DialogContent, DialogOverlay, DialogPortal } from 'ui/src/components-v2/dialog'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'
import { Text } from 'ui/src/components-v2/typography'
import { Close2Icon, ShareIcon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import { TransactionIcon } from '@src/components/transaction-icon'

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

		// TODO: move to constants
		const asset = searchParams.get('asset')
		const transactionId = searchParams.get('transactionId')
		const isActivityLink = searchParams.get('activity')

		const navigateBack = () => {
			navigate(`${pathname}${isActivityLink ? '?activity=true' : ''}`)
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
							<Box className={styles.transactionBodyScrollWrapper}>
								<Box display="flex" flexDirection="column" alignItems="center">
									<TransactionIcon transactionType="deposit" />
									<Box marginTop="small">
										<Text size="small">Received XRD</Text>
									</Box>
									<Box marginTop="xsmall">
										<Text size="xxlarge" color="strong">
											0.0014
										</Text>
									</Box>
									<Box marginTop="xsmall">
										<Text size="xlarge">$24,000</Text>
									</Box>
								</Box>
								<Box
									display="flex"
									flexDirection="column"
									alignItems="flex-start"
									borderTop={1}
									borderStyle="solid"
									// TODO: need a nother border divider color here
									borderColor="borderDivider"
									marginTop="xlarge"
									// TODO: needs to be `large` for mobile
									paddingX="xlarge"
									paddingTop="xlarge"
								>
									<Box marginTop="xsmall" paddingBottom="medium">
										<Text size="xlarge" color="strong">
											Transaction details
										</Text>
									</Box>
									<Box display="flex" flexDirection="column" gap="medium" width="full">
										{[...Array(10)].map((_, i) => (
											// eslint-disable-next-line
											<Box key={i} display="flex" width="full">
												<Box display="flex" flexGrow={1}>
													<Text size="small" color="strong">
														Type
													</Text>
													<Box className={styles.transactionRowDotted} />
												</Box>
												<Box display="flex">
													<Text size="small">Deposit</Text>
												</Box>
											</Box>
										))}
									</Box>
								</Box>
							</Box>
						</ScrollArea>
						<Box className={clsx(styles.transactionHeaderWrapper, isScrolled && styles.transactionHeaderWrapperShadow)}>
							<Box flexGrow={1} />
							<Box flexGrow={1} display="flex" justifyContent="flex-end" gap="small">
								<Button
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://explorer.radixdlt.com/"
									target="_blank"
								>
									<ShareIcon />
								</Button>
								<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
									<Close2Icon />
								</Button>
							</Box>
						</Box>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		) : null
	},
)

AccountTransaction.defaultProps = defaultProps
