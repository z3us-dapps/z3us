import clsx from 'clsx'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Virtuoso } from 'react-virtuoso'
import { useDebounce } from 'use-debounce'

import { Box } from 'ui/src/components/box'
import {
	DialogClose,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	DialogRoot,
	DialogTrigger,
} from 'ui/src/components/dialog'
import { EmptyState } from 'ui/src/components/empty-state'
import { Close2Icon, SearchIcon, ShareIcon } from 'ui/src/components/icons'
import type { FormElement } from 'ui/src/components/input'
import { Input } from 'ui/src/components/input'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Button } from 'ui/src/components/router-button'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useEntityMetadata } from 'ui/src/hooks/dapp/use-entity-metadata'
import { useDashboardUrl } from 'ui/src/hooks/dapp/use-network'
import { findMetadataValue } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string'

import * as styles from './styles.css'

const messages = defineMessages({
	close: {
		id: 'rbrahO',
		defaultMessage: 'Close',
	},
	token_placeholder: {
		id: 'i1L/jc',
		defaultMessage: 'Search token...',
	},
	no_results_title: {
		id: 'bsP4f3',
		defaultMessage: 'No tokens found',
	},
	no_results_subtitle: {
		id: 'QZa33P',
		defaultMessage: 'Please refine search',
	},
})

const searchAndFilterArray = (array: Array<any>, searchString: string) =>
	searchString
		? array.filter(item => {
				const nameMatch = item.name?.toLowerCase().includes(searchString.toLowerCase())
				const addressMatch = item.address?.toLowerCase().includes(searchString.toLowerCase())
				const symbolMatch = item.symbol?.toLowerCase().includes(searchString.toLowerCase())

				return nameMatch || addressMatch || symbolMatch
		  })
		: array

interface ISelectItemProps {
	address: string
	selected?: string
	onSelect: (address: string) => void
}

const SelectItem: React.FC<ISelectItemProps> = ({ selected, address, onSelect }) => {
	const dashboardUrl = useDashboardUrl()
	const { data } = useEntityMetadata(address)

	const name = findMetadataValue('name', data)
	const symbol = findMetadataValue('symbol', data)

	const handleSelect = () => {
		onSelect(address)
	}

	return (
		<Box value={address} className={styles.tokenListItemWrapper}>
			<Box
				component="button"
				className={clsx(
					styles.tokenListItemWrapperButton,
					address === selected && styles.tokenListItemWrapperButtonSelected,
				)}
				onClick={handleSelect}
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
								to={`${dashboardUrl}/resource/${address}`}
								target="_blank"
							>
								{getShortAddress(address)}
							</Button>
						</ToolTip>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export interface ITokenSelectorDialogProps {
	trigger: React.ReactNode
	resourceAddresses: string[]
	onTokenUpdate: (address: string) => void
	tokenAddress?: string
}

export const TokenSelectorDialog: React.FC<ITokenSelectorDialogProps> = props => {
	const { trigger, resourceAddresses, tokenAddress, onTokenUpdate } = props
	const intl = useIntl()
	const inputRef = useRef(null)
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const [data, setData] = useState<string[]>(resourceAddresses)
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')
	const [debouncedInputValue] = useDebounce<string>(inputValue, 500)

	const selected = resourceAddresses.find(address => address === tokenAddress)

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
		if (inputRef?.current && isOpen) {
			inputRef?.current?.focus()
		}
		if (!isOpen) {
			setIsScrolled(false)
		}
	}, [isOpen, inputRef?.current])

	useEffect(() => {
		setData(searchAndFilterArray(resourceAddresses, debouncedInputValue))
	}, [resourceAddresses, debouncedInputValue])

	const renderItem = useCallback(
		(_: number, address: string) => (
			<SelectItem key={address} selected={selected} address={address} onSelect={handleSelectToken} />
		),
		[handleSelectToken, selected],
	)

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
										ref={inputRef}
										value={inputValue}
										styleVariant="secondary"
										className={styles.searchElement}
										leftIcon={<SearchIcon />}
										placeholder={intl.formatMessage(messages.token_placeholder)}
										onChange={handleOnChange}
									/>
								</Box>
								<Box flexShrink={0} display="flex" justifyContent="flex-end" gap="small">
									<ToolTip message={intl.formatMessage(messages.close)}>
										<DialogClose asChild>
											<Button styleVariant="ghost" sizeVariant="medium" iconOnly>
												<Close2Icon />
											</Button>
										</DialogClose>
									</ToolTip>
								</Box>
							</Box>
							{/* // TODO: this will be the star'd/ tokens section from user settings */}
							{/* // */}
							{/* {selected && (
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
							)} */}
						</Box>
						<Box>
							{data?.length === 0 && (
								<Box display="flex" alignItems="center" justifyContent="center" width="full" paddingTop="xxlarge">
									<EmptyState
										title={intl.formatMessage(messages.no_results_title)}
										subTitle={intl.formatMessage(messages.no_results_subtitle)}
									/>
								</Box>
							)}
							<Virtuoso data={data} itemContent={renderItem} customScrollParent={customScrollParent} />
						</Box>
					</ScrollArea>
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}
