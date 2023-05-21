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
import { GroupTransfer } from './group-transfer'
import { SingleTransfer } from './single-transfer'
import { TransferPageAnimation } from './transfer-page-animation'

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

interface IImmer {
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

		const [state, setState] = useImmer<IImmer>({
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

		const handleOnChange = (value: number) => {
			// eslint-disable-next-line
			console.log('value:', value)

			// setInputValue(value)
		}

		const handleGroupTransaction = () => {
			setState(draft => {
				draft.isGroupUiVisible = true
			})
		}

		const handleRemoveGroupTransaction = () => {
			setState(draft => {
				draft.isGroupUiVisible = false
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
										isMessageUiVisible={state.isMessageUiVisible}
										onToggleMessageUi={handleToggleMessageUi}
									/>
								</ShowHidePanel>
								<ShowHidePanel isChildrenVisible={state.isGroupUiVisible}>
									<GroupTransfer onRemoveGroupTransaction={handleRemoveGroupTransaction} />
								</ShowHidePanel>
								<Box paddingTop="large" display="flex" flexDirection="column" gap="medium">
									<ToolTip
										disabled={state.isGroupUiVisible}
										sideOffset={10}
										side="top"
										theme="backgroundPrimary"
										message={
											<>
												<span>Group transaction to send multiple</span>
												<br />
												<span>tokens to the same address.</span>
											</>
										}
									>
										<Button
											styleVariant="tertiary"
											sizeVariant="xlarge"
											fullWidth
											onClick={handleGroupTransaction}
											leftIcon={
												<Box marginLeft="small">
													<PlusIcon />
												</Box>
											}
										>
											{state.isGroupUiVisible ? 'Add another group' : 'Group transaction'}
										</Button>
									</ToolTip>
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
