import clsx from 'clsx'
import { config } from 'packages/ui/src/constants/config'
import type { ResourceBalance } from 'packages/ui/src/types/types'
import React, { useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components/box'
import {
	DialogClose,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	DialogRoot,
	DialogTrigger,
} from 'ui/src/components/dialog'
import { Close2Icon, SearchIcon, ShareIcon } from 'ui/src/components/icons'
import type { FormElement } from 'ui/src/components/input'
import { Input } from 'ui/src/components/input'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from './styles.css'

interface ITokenSelectorDialogProps {
	trigger: React.ReactNode
	balances: ResourceBalance[]
	onTokenUpdate: (address: string) => void
	tokenAddress?: string
}

export const TokenSelectorDialog: React.FC<ITokenSelectorDialogProps> = props => {
	const { trigger, balances, tokenAddress, onTokenUpdate } = props
	const inputRef = useRef(null)
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)

	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')

	const selected = balances.find(resource => resource.address === tokenAddress)

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

	const handleSelectToken = (selectedToken: string) => {
		onTokenUpdate(selectedToken)
		setIsOpen(false)
	}

	useEffect(() => {
		if (inputRef?.current) {
			inputRef?.current?.focus()
		}
		if (!isOpen) {
			setIsScrolled(false)
		}
	}, [isOpen])

	return (
		<DialogRoot open={isOpen} onOpenChange={handleOnOpenChange}>
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
							className={clsx(styles.tokenSelectorHeaderWrapper, isScrolled && styles.tokenSelectorHeaderWrapperShadow)}
						>
							<Box display="flex" width="full" alignItems="center" gap="medium">
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
									<ToolTip message="global.close">
										<DialogClose asChild>
											<Button styleVariant="ghost" sizeVariant="medium" iconOnly>
												<Close2Icon />
											</Button>
										</DialogClose>
									</ToolTip>
								</Box>
							</Box>
							{selected && (
								<Box display="flex" width="full" gap="small" flexWrap="wrap">
									<Button styleVariant="tertiary" sizeVariant="small">
										<Text size="small" capitalize>
											{selected.symbol || selected.name}
										</Text>
									</Button>
									<Button
										leftIcon={<ResourceImageIcon size="small" address={selected.address} />}
										styleVariant="tertiary"
										sizeVariant="small"
									>
										<Text size="small" capitalize>
											{selected.name}
										</Text>
									</Button>
								</Box>
							)}
						</Box>
						<Box>
							<Virtuoso
								data={balances}
								// eslint-disable-next-line react/no-unstable-nested-components
								itemContent={(index, { symbol, name, address }) => (
									<Box value={address} key={index} className={styles.tokenListItemWrapper}>
										<Box
											component="button"
											className={styles.tokenListItemWrapperButton}
											onClick={() => {
												handleSelectToken(address)
											}}
										>
											<Box className={styles.tokenListItemWrapperInnerButton}>
												<ResourceImageIcon address={address} size="large" />
												<Box className={styles.tokenListItemTextWrapper}>
													<Text size="medium" color="strong" truncate>
														{symbol}
													</Text>
													<Text size="small" truncate>
														{name}
													</Text>
												</Box>
												<Box className={styles.tokenListTagWrapper}>
													<ToolTip message={address}>
														<Button
															leftIcon={<ShareIcon />}
															styleVariant="tertiary"
															sizeVariant="small"
															to={`${config.defaultExplorerURL}/resource/${address}`}
															target="_blank"
														>
															{getShortAddress(address)}
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
		</DialogRoot>
	)
}
