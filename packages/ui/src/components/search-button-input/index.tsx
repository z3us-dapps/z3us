import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Close2Icon, SearchIcon } from 'ui/src/components/icons'
import type { FormElement } from 'ui/src/components/input'
import { Input } from 'ui/src/components/input'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'

import * as styles from './styles.css'

const messages = defineMessages({
	searchButtonInputClearToolTip: {
		defaultMessage: 'Clear',
		id: '/GCoTA',
	},
})

interface IProps {
	className?: string
	searchBtnToolTipMsg: string
	inputPlaceholder: string
	value?: string
	closeOnCommit?: boolean
	onCommitSearch: (search: string) => void
	onSearchVisible: (visible: boolean) => void
}

export const SearchButtonInput: React.FC<IProps> = props => {
	const {
		className,
		searchBtnToolTipMsg,
		inputPlaceholder,
		value = '',
		closeOnCommit = true,
		onCommitSearch,
		onSearchVisible,
	} = props

	const intl = useIntl()
	const inputRef = useRef(null)
	const [isSearchVisible, setIsSearchVisible] = useState<boolean>(false)
	const [internalValue, setInternalValue] = useState<string>(value)
	const hasInternalValue = internalValue?.length > 0

	const handleClickSearch = () => {
		setIsSearchVisible(true)
		onSearchVisible(true)
	}

	const handleClickClose = () => {
		setIsSearchVisible(false)
		setInternalValue('')
		onSearchVisible(false)
	}

	const handleClickClear = () => {
		setInternalValue('')
	}

	const handleCloseOnCommit = () => {
		if (closeOnCommit) {
			handleClickClose()
		}
	}

	const handleClickCommitSearch = () => {
		onCommitSearch(internalValue)
		handleCloseOnCommit()
	}

	const handleValueChange = (e: React.ChangeEvent<FormElement>) => {
		setInternalValue(e.currentTarget.value)
	}

	const handleOnKeyDown = (event: KeyboardEvent<FormElement>) => {
		if (event.key === 'Enter') {
			onCommitSearch(internalValue)
			handleCloseOnCommit()
		}
	}

	useEffect(() => {
		inputRef?.current?.focus()
	}, [isSearchVisible])

	return (
		<Box className={clsx(styles.searchWrapper, className)}>
			<Box className={clsx(styles.inputSearchButtonWrapper, isSearchVisible && styles.inputSearchHidden)}>
				<ToolTip message={searchBtnToolTipMsg}>
					<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={handleClickSearch}>
						<SearchIcon />
					</Button>
				</ToolTip>
			</Box>
			<Box
				className={clsx(
					styles.inputSearchInputWrapper,
					isSearchVisible && styles.inputSearchVisible,
					hasInternalValue && styles.inputSearchInputValueWrapper,
				)}
			>
				<Input
					ref={inputRef}
					sizeVariant="small"
					styleVariant="primary"
					placeholder={inputPlaceholder}
					value={internalValue}
					onKeyDown={handleOnKeyDown}
					leftIcon={
						<Button styleVariant="ghost" sizeVariant="xsmall" iconOnly onClick={handleClickCommitSearch}>
							<SearchIcon />
						</Button>
					}
					rightIconClassName={styles.inputSearchClearBtn}
					onChange={handleValueChange}
				/>
				<Box className={styles.inputSearchAbsoluteCloseWrapper}>
					{hasInternalValue && (
						<Box className={styles.inputSearchClearWrapper}>
							<ToolTip message={intl.formatMessage(messages.searchButtonInputClearToolTip)}>
								<Button styleVariant="ghost" sizeVariant="xsmall" onClick={handleClickClear}>
									Clear
								</Button>
							</ToolTip>
						</Box>
					)}
					<Button styleVariant="ghost" sizeVariant="xsmall" iconOnly onClick={handleClickClose}>
						<Close2Icon />
					</Button>
				</Box>
			</Box>
		</Box>
	)
}
