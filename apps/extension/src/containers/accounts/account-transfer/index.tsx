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
			isMessageVisible: true,
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
						<Box style={{ display: 'none' }}>
							<Text size="xxxlarge" color="strong">
								Convallis nibh mus ut tristique amet, vestibulum quisque dui pretium euismod amet laoreet fermentum
								quisque sit, hac gravida neque, enim odio vestibulum dui ut, dictumst luctus tempus ac. Egestas vel
								faucibus nam, arcu malesuada vestibulum faucibus facilisis venenatis praesent pulvinar convallis etiam
								quisque amet in. Ut est metus, praesent lacus neque nunc ut pellentesque egestas dui mi bibendum
								suspendisse ut tellus. Vulputate cursus arcu dignissim cursus habitasse eu justo duis suspendisse tellus
								mi dapibus consectetur nibh, donec tristique odio platea faucibus, imperdiet nibh. Nisi duis sed nulla
								aenean magna porttitor nunc nisl ut, ac congue. Praesent ultricies at dignissim eget sed odio blandit
								laoreet, eget suscipit sit enim aenean justo. Dapibus tristique eget dapibus at donec consectetur
								aliquet at eu porta id in. Eu adipiscing tortor lacus dolor, quis nulla elementum aenean ante eu
								suspendisse, ornare pharetra. Ligula eget lectus ac quis felis, velit metus rhoncus pharetra maximus
								eget. Vulputate rhoncus nulla tempor tristique tempor, a elit aenean velit donec sit diam mus, metus dui
								ac porta felis velit, faucibus ac penatibus, tincidunt tempor in est in in etiam. Rhoncus sapien
								elementum tincidunt dapibus lorem vulputate aenean laoreet maximus eu massa. Nisl diam ut semper
								pellentesque vivamus, aliquam dis vestibulum at ante nulla metus quis vestibulum est metus pretium
								vulputate metus eros vitae nascetur dapibus vestibulum malesuada. Eros in a, arcu dictumst luctus tortor
								sed convallis id in id lectus etiam. Montes arcu dolor dignissim molestie dignissim dui pharetra
								condimentum ligula rutrum iaculis ac nam tristique amet amet, dictum. Ac ac pulvinar suspendisse tellus
								mi est eleifend habitasse quis dui ante, ut dui vitae. Ultricies massa in, luctus vitae convallis
								molestie et eget ridiculus sit ullamcorper consequat suspendisse tristique convallis tellus metus
								consequat nibh lacus condimentum tristique quis. Finibus nam pretium dignissim ultricies porta in.
								Fringilla elementum gravida consectetur posuere convallis venenatis ipsum ipsum etiam in dapibus proin
								blandit et lorem varius suspendisse. Finibus vel tristique, integer eu nulla urna rhoncus auctor,
								eleifend mi posuere et tempor amet faucibus tincidunt et dignissim lectus condimentum montes convallis.
								Nunc arcu vestibulum non, ullamcorper lacus justo justo sed, vel arcu turpis, eget elementum nam lectus
								elementum aliquam nec,. Dignissim viverra ipsum dictumst laoreet nunc aenean suspendisse et eu, varius.
								Duis non auctor urna est est arcu nunc non id placerat eu vitae ac est tempor proin morbi dictumst purus
								fringilla dui. Sed vitae eget rhoncus id neque. Massa eu eget ipsum est facilisis, risus semper
								imperdiet vitae dis aliquam imperdiet eu libero nunc massa lectus ac nulla nunc at convallis efficitur
								suscipit in. Lorem suspendisse nunc consequat id. In imperdiet egestas magna, eleifend enim turpis
								tempus non leo ligula neque aliquam pharetra vitae feugiat justo ac id, vivamus purus donec et velit
								platea massa. Sed at tincidunt praesent sed, ac id maecenas nisl pulvinar neque gravida at dapibus.
								Ullamcorper ac malesuada quam dictumst quisque sapien libero porttitor ornare maximus auctor tempor
								dolor tristique semper at velit nullam rhoncus, nulla nibh ante nunc ultricies magnis tincidunt
								dignissim faucibus. Convallis rhoncus eleifend dignissim diam dapibus varius maecenas pellentesque
								dapibus tortor, felis imperdiet euismod elit. Ac porta nunc posuere montes vel amet, dapibus convallis
								eget convallis urna parturient, ligula eleifend placerat imperdiet ac eget nunc purus tincidunt eget
								amet. Eget varius ut turpis dignissim ante turpis nunc erat ut nam cras condimentum in etiam finibus
								justo ipsum tempus, suspendisse eros etiam nec nullam lectus magna ut consequat. Ipsum consectetur
								turpis ultrices, vel vitae tempor sed tincidunt libero eu sed tristique tempor convallis magna faucibus
								lectus auctor laoreet tempor lectus. Dignissim nisl pellentesque ac vel dictumst condimentum eleifend
								ante faucibus ut nibh habitasse proin eleifend, ante faucibus ultricies in. Ipsum convallis pulvinar et
								ac et maximus ante vitae vitae, urna eget. Purus finibus in faucibus, ante morbi ut convallis ut,
								curabitur congue hac porta nullam cras. Praesent turpis nullam. Id lectus ridiculus est, nullam mi dolor
								habitasse, eleifend nulla eget, nunc eleifend pulvinar condimentum, justo mi lacus velit imperdiet
								suspendisse egestas dignissim nisi. Tristique lacus ac nam, nec mi vestibulum, faucibus tempor sem
								placerat ultricies praesent. Enim sapien ipsum aliquam ex dui donec, dapibus et sed faucibus rutrum
								euismod nunc nisl nullam laoreet ipsum est cras platea feugiat orci tincidunt urna suspendisse hac eget
								quis lacus. Diam nunc tortor cras erat id imperdiet etiam egestas dignissim etiam, curabitur tempor
								tempor vestibulum pellentesque convallis placerat nibh varius, feugiat orci urna et libero laoreet eget
								elementum, suspendisse. Suscipit faucibus consectetur sed, est. Purus et quis nulla convallis eget dui
								pellentesque venenatis eleifend, non habitasse. Nulla eget augue posuere. Enim vel tortor egestas nunc
								tempor proin feugiat non, arcu quis eget gravida sagittis sit, augue eu morbi neque duis massa
								pellentesque, ac malesuada magnis tempor bibendum magna arcu tempor. Nam praesent lectus faucibus
								nascetur dictum viverra metus porttitor porttitor congue est nullam, nisi velit molestie eget dui sed
								pretium consequat nunc imperdiet sed suspendisse,. Nisl massa nisi nisi vestibulum posuere tempor quis,
								nunc eros. Elementum ut platea ut pellentesque elit, pellentesque nunc nam nunc maximus laoreet nibh,
								magnis nulla gravida sed tellus dignissim porta dui hac aliquet sed. Arcu vestibulum dolor dapibus
								pulvinar at vel porttitor, dui ut et. Eu elit laoreet dignissim ac id dignissim dis odio in sed metus
								dui nunc, faucibus montes. Pulvinar varius aenean arcu turpis pharetra lectus pretium lacus ullamcorper
								nunc nisl lectus ac quis tortor egestas. Sed ultrices sit et ullamcorper nascetur ac aliquam, cras
								vestibulum venenatis tristique fringilla id pretium eget id urna et et dui dictumst velit nisl, in eu
								suspendisse eget dignissim. Faucibus sed eget enim id porttitor cursus porta eu efficitur ut semper eu
								ipsum libero id in diam efficitur aenean, donec. Vitae vitae massa odio ut vestibulum nulla orci, sed
								venenatis vel vestibulum,. Nibh dignissim ipsum, est eros posuere magna donec integer arcu in, tellus
								vestibulum morbi suspendisse velit finibus dui dapibus nec nam malesuada eleifend feugiat praesent
								praesent, at in. Elit sapien auctor libero, magna etiam ut urna eu nunc ultricies, varius ipsum vitae
								convallis integer vel, efficitur dis magnis sit tempor purus, vel nullam eros felis turpis.
							</Text>
						</Box>
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
												<Box style={{ width: '24px', height: '24px', background: '#F99', borderRadius: '50%' }} />
											</Box>
										}
										rightIcon={<ChevronDown2Icon />}
									>
										<Box display="flex" alignItems="center" width="full" textAlign="left" paddingLeft="medium">
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
							{/* <Input */}
							{/* 	sizeVariant="large" */}
							{/* 	value="Address here" */}
							{/* 	placeholder={capitalizeFirstLetter(`${t('global.search')}`)} */}
							{/* 	onChange={handleOnChange} */}
							{/* /> */}
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
						<Box width="full">
							<Input
								styleVariant="secondary"
								sizeVariant="large"
								value={undefined}
								placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
								onChange={handleOnChange}
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
