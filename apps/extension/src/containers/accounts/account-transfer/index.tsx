/* eslint-disable @typescript-eslint/no-unused-vars */

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useImmer } from 'use-immer'
import { Box } from 'ui/src/components-v2/box'
import { TokenImageIcon } from '@src/components/token-image-icon'
import { Button } from 'ui/src/components-v2/button'
import { Checkbox } from 'ui/src/components-v2/checkbox'
import {
	DropdownMenuVirtuoso,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
} from 'ui/src/components-v2/dropdown-menu'
import { FormElement, Input } from 'ui/src/components-v2/input'
import { Text } from 'ui/src/components-v2/typography'
import {
	AtSignIcon,
	CheckCircleIcon,
	ChevronDown2Icon,
	CoinsIcon,
	LoadingBarsIcon,
	WriteNoteIcon,
	Check2Icon,
	ArrowLeftIcon,
} from 'ui/src/components/icons'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'
import { Link } from '@src/components/link'
import { accountMenuSlugs } from '@src/constants'
import * as plainButtonStyles from '@src/components/styles/plain-button-styles.css'
import Translation from '@src/components/translation'

// TODO: move this to compoennts
import { TokenSelectorDialog } from '@src/containers/accounts/token-selector-dialog'
import * as styles from './account-transfer.css'



interface IAccountTransferRequiredProps { }

interface IAccountTransferOptionalProps {
	className?: string
	scrollableNode?: HTMLElement | null
}

interface IAccountTransferProps extends IAccountTransferRequiredProps, IAccountTransferOptionalProps { }

const defaultProps: IAccountTransferOptionalProps = {
	className: undefined,
	scrollableNode: undefined,
}

interface IImmer {
	isMessageVisible: boolean
	slides: [number, number]
	isSubmittingReview: boolean
}

export const AccountTransfer = forwardRef<HTMLElement, IAccountTransferProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollableNode } = props
		const [measureRef, { height: slideWrapperHeight }] = useMeasure()

		const [state, setState] = useImmer<IImmer>({
			isMessageVisible: false,
			slides: [0, 0],
			isSubmittingReview: false,
		})

		const [page, direction] = state.slides

		const { t } = useTranslation()
		const inputRef = useRef(null)

		const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
			const { value } = event.target

			// setInputValue(value)
		}

		const handleAddMessage = () => {
			setState(draft => {
				draft.isMessageVisible = !state.isMessageVisible
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

			// if (page === 0) {
			// 	paginate(1)
			// } else {
			// 	paginate(-1)
			// }
		}

		const handleReviewBack = () => {
			paginate(-1)
		}

		return (
			<Box ref={ref} className={clsx(styles.transferWrapper, className)}>
				<Box ref={measureRef} position="relative">
					<AnimatePresence initial={false} custom={direction}>
						<motion.div
							key={page}
							custom={direction}
							variants={{
								initial: (_direction: number) => ({
									x: _direction > 0 ? 40 : -40,
									opacity: 0,
									position: 'absolute',
									height: `${slideWrapperHeight}px`,
								}),
								animate: {
									zIndex: 1,
									x: 0,
									opacity: 1,
									position: 'relative',

									height: 'auto',
								},
								exit: (_direction: number) => ({
									zIndex: 0,
									x: _direction < 0 ? 40 : -40,
									opacity: 0,
									position: 'absolute',
									height: `${slideWrapperHeight}px`,
								}),
							}}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={{
								x: { type: 'spring', stiffness: 150, damping: 30 },
								opacity: { duration: 0.3 },
							}}
						>
							{page === 0 && (
								<Box position="relative">
									<Box paddingBottom="large">
										<Text size="xxxlarge" weight="strong" color="strong">
											Send
										</Text>
									</Box>
									<Box display="flex" paddingBottom="medium" alignItems="center">
										<Box flexGrow={1} alignItems="center">
											<Text size="medium" color="strong">
												From
											</Text>
										</Box>
										<Box
											component="button"
											type="button"
											className={plainButtonStyles.plainButtonHoverWrapper}
											onClick={handleAddMessage}
											display="flex"
											alignItems="center"
										>
											<Box component="span" display="flex" alignItems="center" marginRight="xxsmall">
												<WriteNoteIcon />
											</Box>
											<Text inheritColor component="span" size="medium" underline="always" truncate>
												Add message
											</Text>
										</Box>
									</Box>
									<Box width="full">
										<DropdownMenuVirtuoso
											value="light"
											onValueChange={(value: string) => {
												// eslint-disable-next-line
												console.log('onValueChange', value)
											}}
											data={Array.from({ length: 500 }).map((_, i, a) => ({
												id: i === 0 ? 'light' : `v1.2.0-beta.${a.length - i}`,
												title: `v1.2.0-beta.${a.length - i}`,
												test: 'heheh',
											}))}
											// eslint-disable-next-line react/no-unstable-nested-components
											itemContentRenderer={(index, { id, title }) => (
												<DropdownMenuRadioItem value={id} key={index}>
													<Box display="flex" alignItems="center" gap="medium">
														<Box flexShrink={0}>
															<TokenImageIcon
																imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
																imgAlt="btc token image"
																fallbackText="btc"
															/>
														</Box>
														<Box flexGrow={1} minWidth={0}>
															<Text truncate>
																{title}
																Quisque felis sapien, sed purus sed tristique eros felis ante porttitor et, semper metus
																nisl ut pellentesque euismod. Purus bibendum posuere donec eget, ac imperdiet rhoncus
																nunc nisi
															</Text>
														</Box>
													</Box>
													<DropdownMenuItemIndicator>
														<Check2Icon />
													</DropdownMenuItemIndicator>
												</DropdownMenuRadioItem>
											)}
											trigger={
												<Button
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
													rightIcon={<ChevronDown2Icon />}
												>
													<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="xsmall">
														<Text size="large" color="strong">
															Savings 765x...75jf
														</Text>
													</Box>
												</Button>
											}
										/>
									</Box>

									{/* START: this is the message box */}
									<AnimatePresence initial={false}>
										{state.isMessageVisible && (
											<motion.section
												initial="closed"
												animate="open"
												exit="closed"
												variants={{
													open: {
														opacity: 1,
														height: 'auto',
														transition: {
															type: 'spring',
															bounce: 0,
															duration: 0.7,
															delayChildren: 0.2,
														},
													},
													closed: {
														opacity: 1,
														height: 0,
														transition: {
															delay: 0.3,
															type: 'spring',
															bounce: 0,
															duration: 0.3,
														},
													},
												}}
											>
												<motion.div
													variants={{
														open: {
															opacity: 1,
															transition: { type: 'spring', stiffness: 300, damping: 24 },
														},
														closed: { opacity: 0, transition: { duration: 0.2 } },
													}}
												>
													<Box display="flex" flexDirection="column" gap="small">
														<Box paddingTop="large">
															<Box display="flex">
																<Box display="flex" alignItems="center" gap="small" width="full">
																	<Box flexGrow={1}>
																		<Text size="medium" truncate>
																			Enter transaction message
																		</Text>
																	</Box>
																	<Text size="medium" truncate>
																		Encrypt
																	</Text>
																	<Checkbox />
																</Box>
															</Box>
														</Box>
														<Input
															className={styles.transferUiTextAreaMessage}
															elementType="textarea"
															sizeVariant="large"
															styleVariant="secondary"
															value={undefined}
															placeholder="Enter message"
															onChange={handleOnChange}
														/>
													</Box>
												</motion.div>
											</motion.section>
										)}
									</AnimatePresence>
									{/* END: this is the message box */}
									<Box display="flex" paddingBottom="medium" paddingTop="large">
										<Box display="flex" alignItems="center" width="full">
											<Box display="flex" alignItems="center" flexGrow={1}>
												<Text size="medium" color="strong">
													To: known address
												</Text>
												<Box display="flex" alignItems="center" color="green500" marginLeft="xxsmall">
													<CheckCircleIcon />
												</Box>
											</Box>
											<Box display="flex" alignItems="center" gap="medium">
												<Box
													component="button"
													type="button"
													className={plainButtonStyles.plainButtonHoverWrapper}
													onClick={handleAddMessage}
													display="flex"
													alignItems="center"
												>
													<Box component="span" display="flex" alignItems="center" marginRight="xxsmall">
														<AtSignIcon />
													</Box>
													<Text inheritColor component="span" size="medium" underline="always" truncate>
														Send to multiple
													</Text>
												</Box>
											</Box>
										</Box>
									</Box>
									<Box>
										<Box width="full">
											<DropdownMenuVirtuoso
												value="light"
												onValueChange={(value: string) => {
													// eslint-disable-next-line
													console.log('onValueChange', value)
												}}
												data={Array.from({ length: 500 }).map((_, i, a) => ({
													id: `v1.2.0-beta.${a.length - i}`,
													title: `v1.2.0-beta.${a.length - i}`,
													test: 'heheh',
												}))}
												trigger={
													<Button
														styleVariant="secondary"
														sizeVariant="xlarge"
														fullWidth
														rightIcon={<ChevronDown2Icon />}
													>
														<Box display="flex" alignItems="center" width="full" textAlign="left">
															<Text size="large" color="strong">
																Savings 765x...75jf
															</Text>
														</Box>
													</Button>
												}
											/>
										</Box>
									</Box>
									<Box paddingTop="large">
										<Box display="flex" paddingBottom="medium">
											<Box flexGrow={1}>
												<Text size="medium" color="strong">
													Amount
												</Text>
											</Box>
										</Box>
										{/* TODO: create wrapper component for this */}
										<Box width="full" position="relative">
											<Input
												styleVariant="secondary"
												sizeVariant="large"
												value={undefined}
												placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
												onChange={handleOnChange}
											/>
											<TokenSelectorDialog
												trigger={
													<Button
														className={styles.tokenSelectBtnWrapper}
														styleVariant="tertiary"
														sizeVariant="medium"
														rightIcon={<ChevronDown2Icon />}
														leftIcon={
															<Box marginRight="small">
																<TokenImageIcon
																	imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
																	imgAlt="btc token image"
																	fallbackText="btc"
																/>
															</Box>
														}
													>
														<Box display="flex" alignItems="center" width="full" textAlign="left">
															<Text size="medium" color="strong">
																BTC
															</Text>
														</Box>
													</Button>
												}
												data={Array.from({ length: 500 }).map((_, i, a) => ({
													id: i === 0 ? 'light' : `v1.2.0-beta.${a.length - i}`,
													title: `v1.2.0-beta.${a.length - i}`,
													test: 'heheh',
												}))}
											/>
										</Box>
										<Box display="flex" paddingTop="small">
											<Box display="flex" alignItems="center" flexGrow={1} gap="medium">
												<Box display="flex" alignItems="center">
													<Text size="medium" truncate>
														Available:&nbsp;
													</Text>
													<Link to={accountMenuSlugs.ACCOUNTS}>
														<Text size="medium" truncate>
															3.13 BTC
														</Text>
													</Link>
												</Box>
												<Box className={styles.transferUiTextSeperator} />
												<Link to={accountMenuSlugs.ACCOUNTS} underline="hover">
													<Box display="flex" gap="xxsmall" alignItems="center">
														<Text size="medium">$70,887 USD</Text>
														<ChevronDown2Icon />
													</Box>
												</Link>
											</Box>
											<Box display="flex" alignItems="center">
												<Box
													component="button"
													type="button"
													className={plainButtonStyles.plainButtonHoverWrapper}
													onClick={handleAddMessage}
													display="flex"
													alignItems="center"
												>
													<Box component="span" display="flex" alignItems="center" marginRight="xxsmall">
														<CoinsIcon />
													</Box>
													<Text inheritColor component="span" size="medium" underline="always" truncate>
														Send another token
													</Text>
												</Box>
											</Box>
										</Box>
										<Box display="flex" paddingTop="xlarge" width="full">
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
										PAGE 1 Nibh nibh quisque ligula ultrices est, non turpis vel turpis ac lectus, dolor et sapien,
										ipsum ante consectetur,. Eu gravida leo dignissim diam massa laoreet euismod magnis elementum ac
										dignissim tempor pharetra iaculis bibendum ipsum eleifend euismod, finibus auctor. Lectus fringilla
										suscipit ante tempor consectetur donec vel nunc sem pharetra.
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
						</motion.div>
					</AnimatePresence>
				</Box>

				{/* {[...Array(30)].map((_, i) => ( */}
				{/* 	// eslint-disable-next-line */}
				{/* 	<Box key={i}> */}
				{/* 		<Text size="xxxlarge">transfer</Text> */}
				{/* 	</Box> */}
				{/* ))} */}
			</Box>
		)
	},
)

AccountTransfer.defaultProps = defaultProps
