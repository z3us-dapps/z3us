/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx, { type ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'
import { useTimeout } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	DialogTrigger,
} from 'ui/src/components-v2/dialog'
import { FormElement, Input } from 'ui/src/components-v2/input'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { Close2Icon, SearchIcon, ShareIcon } from 'ui/src/components/icons'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Button } from '@src/components/button'
import { CopyAddressButton } from '@src/components/copy-address-button'
import * as dialogStyles from '@src/components/styles/dialog-styles.css'
import { TokenImageIcon } from '@src/components/token-image-icon'
import { TransactionIcon } from '@src/components/transaction-icon'
import Translation from '@src/components/translation'
import {
	ACCOUNT_PARAM_ACTIVITY,
	ACCOUNT_PARAM_ASSET,
	ACCOUNT_PARAM_QUERY,
	ACCOUNT_PARAM_TRANSACTION_ID,
} from '@src/constants'
import { getShortAddress } from '@src/utils/string-utils'

import * as styles from './token-selector-dialog.css'

interface ITokenSelectorDialogRequiredProps {
	trigger: React.ReactNode
	data: Array<{ id: string; title: string }>
}

interface ITokenSelectorDialogOptionalProps {}

interface ITokenSelectorDialogProps extends ITokenSelectorDialogRequiredProps, ITokenSelectorDialogOptionalProps {}

const defaultProps: ITokenSelectorDialogOptionalProps = {}

export const TokenSelectorDialog = forwardRef<HTMLElement, ITokenSelectorDialogProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { trigger, data } = props
		const { t } = useTranslation()
		const [searchParams] = useSearchParams()
		const navigate = useNavigate()
		const { pathname } = useLocation()
		const inputRef = useRef(null)
		const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)

		const [isScrolled, setIsScrolled] = useState<boolean>(false)
		const [isOpen, setIsOpen] = useState<boolean>(false)
		const [inputValue, setInputValue] = useState<string>('')

		const handleScroll = (event: Event) => {
			const target = event.target as Element
			const { scrollTop } = target

			setIsScrolled(scrollTop > 0)
		}

		const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
			const { value } = event.target

			setInputValue(value)
		}

		const handleOnOpenChange = (open: boolean) => {
			setIsOpen(open)
		}

		useEffect(() => {
			if (inputRef?.current) {
				inputRef?.current?.focus()
			}
			if (!isOpen) {
				setIsScrolled(false)
			}
		}, [isOpen])

		// TODO: temp
		const accountAddress =
			'ardx1qspt0lthflcd45zhwvrxkqdrv5ne5avsgarjcpfatyw7n7n93v38dhcdtlag0sdfalksjdhf7d8f78d7f8d7f8d7f8d7f'

		return (
			<Dialog onOpenChange={handleOnOpenChange}>
				<DialogTrigger asChild>{trigger}</DialogTrigger>
				<DialogPortal>
					<DialogOverlay className={dialogStyles.dialogOverlay} />
					<DialogContent className={clsx(dialogStyles.dialogContent, styles.tokenSelectorContent)}>
						<ScrollArea
							isTopShadowVisible={false}
							onScroll={handleScroll}
							scrollableNodeProps={{ ref: setCustomScrollParent }}
						>
							<Box
								className={clsx(
									styles.tokenSelectorHeaderWrapper,
									isScrolled && styles.tokenSelectorHeaderWrapperShadow,
								)}
							>
								<Box display="flex" width="full" alignItems="center" gap="small">
									<Box flexGrow={1}>
										<Input
											value={inputValue}
											styleVariant="secondary"
											ref={inputRef}
											className={styles.searchElement}
											placeholder="Search token or paste address"
											leftIcon={<SearchIcon />}
											// placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
											onChange={handleOnChange}
										/>
									</Box>
									<Box flexShrink={0} display="flex" justifyContent="flex-end" gap="small">
										<ToolTip
											theme="backgroundPrimary"
											message={<Translation capitalizeFirstLetter text="global.close" />}
										>
											<DialogClose asChild>
												<Button styleVariant="ghost" sizeVariant="medium" iconOnly>
													<Close2Icon />
												</Button>
											</DialogClose>
										</ToolTip>
									</Box>
								</Box>
								<Box display="flex" width="full" gap="small" flexWrap="wrap">
									<Button styleVariant="tertiary" sizeVariant="small">
										<Text size="small" capitalize>
											xrd
										</Text>
									</Button>
									<Button
										leftIcon={
											<TokenImageIcon
												size="small"
												imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
												imgAlt="btc token image"
												fallbackText="btc"
											/>
										}
										styleVariant="tertiary"
										sizeVariant="small"
									>
										<Text size="small" capitalize>
											oci
										</Text>
									</Button>
								</Box>
							</Box>
							<Box ref={ref}>
								<Virtuoso
									data={data}
									// eslint-disable-next-line react/no-unstable-nested-components
									itemContent={(index, { id, title }) => (
										<Box value={id} key={index} className={styles.tokenListItemWrapper}>
											<Box component="button" className={styles.tokenListItemWrapperButton}>
												<Box className={styles.tokenListItemWrapperInnerButton}>
													<TokenImageIcon
														imgSrc="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
														imgAlt="btc token image"
														fallbackText="btc"
														size="large"
													/>
													<Box className={styles.tokenListItemTextWrapper}>
														<Text size="medium" color="strong" truncate>
															{title} Lorum ipsum
														</Text>
														<Text size="small" truncate>
															{title} Lorum ipsum
														</Text>
													</Box>
													<Box className={styles.tokenListTagWrapper}>
														<ToolTip message={accountAddress}>
															<Button
																leftIcon={<ShareIcon />}
																styleVariant="tertiary"
																sizeVariant="small"
																to="https://explorer.radixdlt.com/#"
																target="_blank"
															>
																{getShortAddress(accountAddress)}
															</Button>
														</ToolTip>
													</Box>
												</Box>
											</Box>
										</Box>
									)}
									customScrollParent={customScrollParent}
								/>
							</Box>
						</ScrollArea>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		)
	},
)

TokenSelectorDialog.defaultProps = defaultProps
