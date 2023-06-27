import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import { useResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNetworkId } from 'packages/ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { useWalletAccounts } from 'packages/ui/src/hooks/use-wallet-account'
import React, { forwardRef } from 'react'
import useMeasure from 'react-use-measure'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { useImmer } from 'use-immer'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { LoadingBarsIcon } from 'ui/src/components/icons'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import { defaultToken } from './account-transfer-constants'
import { type IAccountTransferImmer } from './account-transfer-types'
import { validateTransferForm } from './account-transfer-utils'
import * as styles from './account-transfer.css'
import { GroupTransactionButton } from './group-transaction-button'
import { GroupTransfer } from './group-transfer'
import { ReviewTransfer } from './review-transfer'
import { TransferPageAnimation } from './transfer-page-animation'

interface IAccountTransferRequiredProps {}

interface IAccountTransferOptionalProps {
	className?: string
}

interface IAccountTransferProps extends IAccountTransferRequiredProps, IAccountTransferOptionalProps {}

const defaultProps: IAccountTransferOptionalProps = {
	className: undefined,
}

export const AccountTransfer = forwardRef<HTMLElement, IAccountTransferProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props
		const [measureRef, { height: slideWrapperHeight }] = useMeasure()

		const networkId = useNetworkId()
		const { addressBook, selectedAccount } = useNoneSharedStore(state => ({
			addressBook: state.addressBook[networkId] || {},
			selectedAccount: state.selectedAccount,
		}))
		const balances = useResourceBalances()
		const accounts = useWalletAccounts()

		const [state, setState] = useImmer<IAccountTransferImmer>({
			transaction: {
				from: selectedAccount,
				isMessageEncrypted: false,
				message: '',
				sends: [{ to: '', tokens: [defaultToken] }],
			},
			slides: [0, 0],
			isMessageUiVisible: false,
			isSubmittingReview: false,
			initValidation: false,
			validation: undefined,
		})

		useDeepCompareEffect(() => {
			if (state.initValidation) {
				setState(draft => {
					draft.validation = validateTransferForm(state.transaction)
				})
			}
		}, [state.transaction])

		const [page, direction] = state.slides

		const handleUpdateFromAccount = (account: string) => {
			setState(draft => {
				draft.transaction.from = account
			})
		}

		const paginate = (newDirection: number) => {
			setState(draft => {
				draft.slides = [page + newDirection, newDirection]
			})
		}

		const handleContinue = () => {
			const validation = validateTransferForm(state.transaction)

			setState(draft => {
				draft.initValidation = true
				draft.validation = validation
			})

			if (!validation.success) {
				return
			}

			// DEMO FOR SUBMIT AND REVIEW...
			setState(draft => {
				draft.isSubmittingReview = true
			})

			setTimeout(() => {
				setState(draft => {
					draft.isSubmittingReview = false
				})
				paginate(1)
			}, 2000)
		}

		const handleRemoveGroupTransaction = (sendIndex: number) => {
			setState(draft => {
				if (sendIndex === 0) {
					draft.transaction.sends = [{ to: '', tokens: [defaultToken] }]
				} else {
					draft.transaction.sends = state.transaction.sends.filter((_, index) => index !== sendIndex)
				}
			})
		}

		const handleAddToken = (sendIndex: number) => {
			setState(draft => {
				draft.transaction.sends[sendIndex].tokens = [...state.transaction.sends[sendIndex].tokens, defaultToken]
			})
		}

		const handleAddGroup = () => {
			setState(draft => {
				draft.transaction.sends = [...state.transaction.sends, { to: '', tokens: [defaultToken] }]
			})
		}

		const handleUpdateToAccount = (sendIndex: number) => (value: string) => {
			setState(draft => {
				draft.transaction.sends[sendIndex].to = value
			})
		}

		const handleUpdateTokenValue = (sendIndex: number) => (tokenIndex: number) => (tokenValue: number) => {
			setState(draft => {
				draft.transaction.sends[sendIndex].tokens[tokenIndex].amount = tokenValue
			})
		}

		const handleUpdateToken =
			(sendIndex: number) => (tokenIndex: number) => (address: string, symbol: string, name: string) => {
				setState(draft => {
					draft.transaction.sends[sendIndex].tokens[tokenIndex] = {
						...draft.transaction.sends[sendIndex].tokens[tokenIndex],
						address,
						name,
						symbol,
					}
				})
			}

		const handleToggleMessageUi = () => {
			setState(draft => {
				draft.isMessageUiVisible = !state.isMessageUiVisible
			})
		}

		const handleUpdateMessage = (message: string) => {
			setState(draft => {
				draft.transaction.message = message
			})
		}

		const handleUpdateIsMessageEncrypted = (isEncrypted: boolean) => {
			setState(draft => {
				draft.transaction.isMessageEncrypted = isEncrypted
			})
		}

		return (
			<Box ref={ref} className={clsx(styles.transferWrapper, className)}>
				<Box ref={measureRef} position="relative">
					<TransferPageAnimation slideWrapperHeight={slideWrapperHeight} page={page} direction={direction}>
						{page === 0 && (
							<Box position="relative">
								<Box paddingBottom="large">
									<Text size="xxxlarge" weight="strong" color="strong">
										Send
									</Text>
								</Box>
								<Box position="relative">
									<AnimatePresence initial={false}>
										<AnimatedPage>
											<GroupTransfer
												transaction={state.transaction}
												isMessageUiVisible={state.isMessageUiVisible}
												fromAccount={state.transaction.from}
												accounts={accounts}
												addressBook={addressBook}
												balances={balances}
												validation={state.validation}
												onUpdateFromAccount={handleUpdateFromAccount}
												onUpdateToAccount={handleUpdateToAccount}
												onRemoveGroupTransaction={handleRemoveGroupTransaction}
												onUpdateTokenValue={handleUpdateTokenValue}
												onUpdateToken={handleUpdateToken}
												onAddToken={handleAddToken}
												onToggleMessageUi={handleToggleMessageUi}
												onUpdateMessage={handleUpdateMessage}
												onUpdateIsMessageEncrypted={handleUpdateIsMessageEncrypted}
											/>
										</AnimatedPage>
									</AnimatePresence>
								</Box>
								<Box paddingTop="large" display="flex" flexDirection="column" gap="medium">
									<GroupTransactionButton onAddGroup={handleAddGroup} />
									<Button
										styleVariant="primary"
										sizeVariant="xlarge"
										fullWidth
										onClick={handleContinue}
										disabled={state.isSubmittingReview}
										rightIcon={
											state.isSubmittingReview && (
												<Box marginLeft="small">
													<LoadingBarsIcon />
												</Box>
											)
										}
									>
										<Translation capitalizeFirstLetter text="global.continue" />
									</Button>
								</Box>
							</Box>
						)}
						{page === 1 && (
							<ReviewTransfer
								onNavigateBack={() => {
									paginate(-1)
								}}
							/>
						)}
					</TransferPageAnimation>
				</Box>
			</Box>
		)
	},
)

AccountTransfer.defaultProps = defaultProps
