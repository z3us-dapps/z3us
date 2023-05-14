/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { Checkbox } from 'ui/src/components-v2/checkbox'
import { DropdownMenuVirtuoso } from 'ui/src/components-v2/dropdown-menu'
import { FormElement, Input } from 'ui/src/components-v2/input'
import { Text } from 'ui/src/components-v2/typography'
import {
	AtSignIcon,
	CheckCircleIcon,
	ChevronDown2Icon,
	CoinsIcon,
	LoadingBarsIcon,
	WriteNoteIcon,
} from 'ui/src/components/icons'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Link } from '@src/components/link'
import * as plainButtonStyles from '@src/components/styles/plain-button-styles.css'
import Translation from '@src/components/translation'
import { accountMenuSlugs } from '@src/constants'

import * as styles from './account-transfer.css'

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
	isMessageVisible: boolean
}

export const AccountTransfer = forwardRef<HTMLElement, IAccountTransferProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, scrollableNode } = props

		const [state, setState] = useImmer<IImmer>({
			isMessageVisible: false,
		})

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

		return (
			<Box ref={ref} className={clsx(styles.transferWrapper, className)}>
				<Box className={styles.transferFlexColWrapper}>
					<Box>
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
								trigger={
									<Button
										styleVariant="secondary"
										sizeVariant="xlarge"
										fullWidth
										leftIcon={
											<Box>
												<Box
													style={{
														width: '24px',
														height: '24px',
														background: '#F99',
														borderRadius: '50%',
														marginLeft: '6px',
													}}
												/>
											</Box>
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
					</Box>

					<Box>
						<Box display="flex" paddingBottom="medium">
							<Box display="flex" alignItems="center" width="full">
								<Box display="flex" alignItems="center" flexGrow={1}>
									<Text size="medium" color="strong">
										To: known address
									</Text>
									<Box display="flex" alignItems="center" color="green500" marginRight="xxsmall">
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
									<Button styleVariant="secondary" sizeVariant="xlarge" fullWidth rightIcon={<ChevronDown2Icon />}>
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
					<Box>
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
							<Button
								className={styles.tokenSelectBtnWrapper}
								styleVariant="tertiary"
								sizeVariant="medium"
								rightIcon={<ChevronDown2Icon />}
								leftIcon={
									<Box>
										<Box
											style={{
												width: '24px',
												height: '24px',
												background: '#F99',
												borderRadius: '50%',
												marginLeft: '0px',
												marginRight: '10px',
											}}
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
					</Box>
					<Box display="flex" paddingTop="medium" width="full">
						<Button
							styleVariant="primary"
							sizeVariant="xlarge"
							fullWidth
							disabled
							rightIcon={
								<Box marginLeft="small">
									<LoadingBarsIcon />
								</Box>
							}
						>
							<Translation capitalizeFirstLetter text="global.continue" />
						</Button>
					</Box>

					{/* {[...Array(30)].map((_, i) => ( */}
					{/* 	// eslint-disable-next-line */}
					{/* 	<Box key={i}> */}
					{/* 		<Text size="xxxlarge">transfer</Text> */}
					{/* 	</Box> */}
					{/* ))} */}
				</Box>
			</Box>
		)
	},
)

AccountTransfer.defaultProps = defaultProps
