/* eslint-disable react/jsx-no-useless-fragment, @typescript-eslint/no-unused-vars */
import clsx, { ClassValue } from 'clsx'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEventListener } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { FormElement, Input } from 'ui/src/components-v2/input'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Close2Icon, SearchIcon } from 'ui/src/components/icons'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Button } from '@src/components/button'
import Translation from '@src/components/translation'

import * as styles from './account-asset.css'

interface IAccountAssetSearchRequiredProps {
	searchTitle: string
	onChange: (value: String) => void
	balance: React.ReactNode
}

interface IAccountAssetSearchOptionalProps {
	className?: ClassValue
}

interface IAccountAssetSearchProps extends IAccountAssetSearchRequiredProps, IAccountAssetSearchOptionalProps {}

const defaultProps: IAccountAssetSearchOptionalProps = {
	className: undefined,
}

export const AccountAssetSearch: React.FC<IAccountAssetSearchProps> = props => {
	const { onChange, className, searchTitle, balance } = props

	const { t } = useTranslation()

	const [isInputVisible, setIsInputVisible] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')
	const inputRef = useRef(null)

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

	useEventListener('keydown', e => {
		if (e.key === 'Escape') {
			inputRef.current.blur()
			handleCloseSearch()
		}
	})

	return (
		<Box className={clsx(styles.accountAssetWrapperWrapper, className)}>
			<Box display="flex" alignItems="center" position="relative" gap="large">
				<Box className={clsx(styles.accountSearchWrapper)}>
					{!isInputVisible ? (
						<Box flexShrink={0}>
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
