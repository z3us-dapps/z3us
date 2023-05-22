/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useMeasure from 'react-use-measure'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { ArrowLeftIcon, LoadingBarsIcon, PlusIcon } from 'ui/src/components/icons'

import { ShowHidePanel } from '@src/components/show-hide-panel'
import Translation from '@src/components/translation'

import * as styles from './account-transfer.css'
import { GroupTransactionButton } from './group-transaction-button'
import { GroupTransfer } from './group-transfer'
import { SingleTransfer } from './single-transfer'
import { TransferPageAnimation } from './transfer-page-animation'

// TODO: temp accounts
const ACCOUNTS = Array.from({ length: 500 }).map((_, i, a) => ({
	id: `v1.2.0-beta.${a.length - i}`,
	title: `v1.2.0-beta.${a.length - i}`,
	test: 'heheh',
}))

const ADDRESS_BOOK = Array.from({ length: 500 }).map((_, i, a) => ({
	id: `v1.2.0-beta.${a.length - i}`,
	title: `v1.2.0-beta.${a.length - i}`,
	test: 'heheh',
}))

const TOKENS = Array.from({ length: 500 }).map((_, i, a) => ({
	id: `v1.2.0-TOKENS.${a.length - i}`,
	title: `v1.2.0-TOKENS.${a.length - i}`,
	test: 'heheh',
}))

interface IAccountTransferRequiredProps {}

interface IAccountTransferOptionalProps {
	className?: string
	scrollableNode?: HTMLElement | null
}

interface IAccountTransferProps extends IAccountTransferRequiredProps, IAccountTransferOptionalProps {}

const defaultProps: IAccountTransferOptionalProps = {
	className: undefined,
	scrollableNode: undefined,
}

interface IAccountTransferImmer {
	isMessageUiVisible: boolean
	isMessageEncrypted: boolean
	slides: [number, number]
	isSubmittingReview: boolean
	isGroupUiVisible: boolean
	transaction: any
}

export const AccountTransfer = forwardRef<HTMLElement, IAccountTransferProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollableNode } = props
		const [measureRef, { height: slideWrapperHeight }] = useMeasure()

		const [state, setState] = useImmer<IAccountTransferImmer>({
			slides: [0, 0],
			transaction: {
				from: '',
				message: '',
				sends: [
					{
						to: '',
						tokens: [{ token: '', amount: '' }],
					},
				],
			},
			isMessageEncrypted: false,
			isGroupUiVisible: false,
			isMessageUiVisible: false,
			isSubmittingReview: false,
		})

		const [page, direction] = state.slides

		const { t } = useTranslation()
		const inputRef = useRef(null)

		const handleGroupTransaction = () => {
			setState(draft => {
				draft.isGroupUiVisible = true
			})
		}

		const handleAddGroup = () => {
			console.log('handl add group')
			// setState(draft => {
			// 	draft.isGroupUiVisible = true
			// })
		}

		const handleRemoveGroupTransaction = () => {
			setState(draft => {
				draft.isGroupUiVisible = false
			})
		}

		const handleUpdateFromAccount = (account: string) => {
			setState(draft => {
				draft.transaction.from = account
			})
		}

		const handleAddToken = (sendIndex: number) => {
			setState(draft => {
				draft.transaction.sends[sendIndex].tokens = [
					...state.transaction.sends[sendIndex].tokens,
					// TODO: use default
					{ token: '', amount: '' },
				]
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

		const handleUpdateToken = (sendIndex: number) => (tokenIndex: number) => (token: string) => {
			setState(draft => {
				draft.transaction.sends[sendIndex].tokens[tokenIndex].token = token
			})
		}

		const handleToggleMessageUi = () => {
			setState(draft => {
				draft.isMessageUiVisible = !state.isMessageUiVisible
			})
		}

		const paginate = (newDirection: number) => {
			setState(draft => {
				draft.slides = [page + newDirection, newDirection]
			})
		}

		const handleClickContinue = () => {
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

		const handleReviewBack = () => {
			paginate(-1)
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
								<ShowHidePanel isChildrenVisible={!state.isGroupUiVisible}>
									<SingleTransfer
										transaction={state.transaction}
										isMessageUiVisible={state.isMessageUiVisible}
										fromAccount={state.transaction.from}
										accounts={ACCOUNTS}
										addressBook={ADDRESS_BOOK}
										tokens={TOKENS}
										onToggleMessageUi={handleToggleMessageUi}
										onUpdateFromAccount={handleUpdateFromAccount}
										onUpdateToAccount={handleUpdateToAccount}
										onUpdateTokenValue={handleUpdateTokenValue}
										onUpdateToken={handleUpdateToken}
									/>
								</ShowHidePanel>
								<ShowHidePanel isChildrenVisible={state.isGroupUiVisible}>
									<GroupTransfer
										transaction={state.transaction}
										fromAccount={state.transaction.from}
										addressBook={ADDRESS_BOOK}
										tokens={TOKENS}
										onUpdateToAccount={handleUpdateToAccount}
										onRemoveGroupTransaction={handleRemoveGroupTransaction}
										onUpdateTokenValue={handleUpdateTokenValue}
										onUpdateToken={handleUpdateToken}
										onAddToken={handleAddToken}
									/>
								</ShowHidePanel>
								<Box paddingTop="large" display="flex" flexDirection="column" gap="medium">
									<GroupTransactionButton
										isGroupUiVisible={state.isGroupUiVisible}
										onGroupTransaction={handleGroupTransaction}
										onAddGroup={handleAddGroup}
									/>
									<Button
										styleVariant="primary"
										sizeVariant="xlarge"
										fullWidth
										onClick={handleClickContinue}
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
							<Box position="relative">
								<Box display="flex" alignItems="center" paddingBottom="large" gap="medium">
									<Button onClick={handleReviewBack} sizeVariant="small" styleVariant="ghost" iconOnly>
										<ArrowLeftIcon />
									</Button>
									<Text size="xxxlarge" weight="strong" color="strong">
										Review send
									</Text>
								</Box>
								<Box>
									PAGE 1 Nibh nibh quisque ligula ultrices est, non turpis vel turpis ac lectus, dolor et sapien, ipsum
									ante consectetur,. Eu gravida leo dignissim diam massa laoreet euismod magnis elementum ac dignissim
									tempor pharetra iaculis bibendum ipsum eleifend euismod, finibus auctor. Lectus fringilla suscipit
									ante tempor consectetur donec vel nunc sem pharetra.
								</Box>

								<Box display="flex" paddingTop="xlarge" width="full">
									<Button
										styleVariant="primary"
										sizeVariant="xlarge"
										fullWidth
										onClick={handleClickContinue}
										// disabled
										// rightIcon={
										// 	<Box marginLeft="small">
										// 		<LoadingBarsIcon />
										// 	</Box>
										// }
									>
										<Translation capitalizeFirstLetter text="global.continue" />
									</Button>
								</Box>
							</Box>
						)}
					</TransferPageAnimation>
				</Box>
			</Box>
		)
	},
)

AccountTransfer.defaultProps = defaultProps
