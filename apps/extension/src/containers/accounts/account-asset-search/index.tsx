/* eslint-disable react/jsx-no-useless-fragment, @typescript-eslint/no-unused-vars */
import clsx, { ClassValue } from 'clsx'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEventListener } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { FormElement, Input } from 'ui/src/components-v2/input'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { ArrowUpIcon, Close2Icon, SearchIcon } from 'ui/src/components/icons'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Button } from '@src/components/button'
import Translation from '@src/components/translation'

import * as styles from './account-asset.css'

interface IAccountAssetSearchRequiredProps {
	searchTitle: string
	onChange: (value: String) => void
	balance: React.ReactNode
	scrollableNode: HTMLElement
}

interface IAccountAssetSearchOptionalProps {
	className?: ClassValue
}

interface IAccountAssetSearchProps extends IAccountAssetSearchRequiredProps, IAccountAssetSearchOptionalProps {}

const defaultProps: IAccountAssetSearchOptionalProps = {
	className: undefined,
}

export const AccountAssetSearch: React.FC<IAccountAssetSearchProps> = props => {
	const { onChange, className, searchTitle, balance, scrollableNode } = props
	const { t } = useTranslation()
	const [isInputVisible, setIsInputVisible] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')
	const inputRef = useRef(null)
	const isScrolled = scrollableNode?.scrollTop > 0

	const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
		const { value } = event.target

		setInputValue(value)
		onChange(value)
	}

	const handleCloseSearch = () => {
		setIsInputVisible(false)
		setInputValue('')
		onChange('')
	}

	const handleSearchClick = () => {
		setIsInputVisible(true)
		inputRef.current.focus()
	}

	const handleUpClick = () => {
		if (!scrollableNode) return
		scrollableNode.scrollTo({ top: 0, behavior: 'smooth' })
	}

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			inputRef.current.blur()
			handleCloseSearch()
		}
	})

	return (
		<Box className={clsx(styles.accountAssetWrapperWrapper, className)}>
			<Box display="flex" alignItems="center" position="relative" gap="large">
				<Box className={styles.accountSearchWrapper}>
					{!isInputVisible ? (
						<Box className={styles.accountBalanceWrapper}>
							<>{balance}</>
						</Box>
					) : null}
					<Box className={clsx(styles.inputWrapper, isInputVisible && styles.inputWrapperVisible)}>
						<Input
							value={inputValue}
							ref={inputRef}
							className={styles.inputElement}
							placeholder={capitalizeFirstLetter(`${t('global.search')} ${searchTitle || ''}`)}
							onChange={handleOnChange}
						/>
						<Button
							className={styles.accountCloseSearchButton}
							styleVariant="ghost"
							sizeVariant="small"
							onClick={handleCloseSearch}
							iconOnly
						>
							<Close2Icon />
						</Button>
					</Box>
					<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.up" />}>
						<Button
							className={clsx(styles.accountUpButton, isScrolled && styles.accountUpButtonVisible)}
							styleVariant="ghost"
							sizeVariant="small"
							onClick={handleUpClick}
							iconOnly
						>
							<ArrowUpIcon />
						</Button>
					</ToolTip>
					<ToolTip theme="backgroundPrimary" message={<Translation capitalizeFirstLetter text="global.search" />}>
						<Button
							className={clsx(styles.accountSearchButton, isInputVisible && styles.accountSearchButtonHidden)}
							styleVariant="ghost"
							sizeVariant="small"
							onClick={handleSearchClick}
							iconOnly
						>
							<SearchIcon />
						</Button>
					</ToolTip>
				</Box>
			</Box>
		</Box>
	)
}

AccountAssetSearch.defaultProps = defaultProps
