/* eslint-disable react/jsx-no-useless-fragment, @typescript-eslint/no-unused-vars */
import clsx, { ClassValue } from 'clsx'
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useEventListener, useIntersectionObserver } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { FormElement, Input } from 'ui/src/components-v2/input'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { ArrowUpIcon, Close2Icon, SearchIcon } from 'ui/src/components/icons'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import { Button } from '@src/components/button'
import Translation from '@src/components/translation'

import * as styles from './account-search.css'

interface IAccountActivitySearchRequiredProps {
	scrollableNode: HTMLElement
	searchTitle: string
	onChange: (value: String) => void
}

interface IAccountActivitySearchOptionalProps {
	className?: ClassValue
}

interface IAccountActivitySearchProps
	extends IAccountActivitySearchRequiredProps,
		IAccountActivitySearchOptionalProps {}

const defaultProps: IAccountActivitySearchOptionalProps = {
	className: undefined,
}

export const AccountActivitySearch: React.FC<IAccountActivitySearchProps> = props => {
	const { onChange, className, searchTitle, scrollableNode } = props

	const { t } = useTranslation()

	const [isInputVisible, setIsInputVisible] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')
	const inputRef = useRef(null)

	const elementRef = useRef<HTMLDivElement | null>(null)
	const entry = useIntersectionObserver(elementRef, { threshold: [1] })
	const isSticky = !entry?.isIntersecting

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
		<Box
			ref={elementRef}
			className={clsx(
				styles.accountSearchWrapperWrapperSticky,
				isSticky && styles.accountSearchWrapperWrapperStickyShadow,
				className,
			)}
		>
			<Box display="flex" alignItems="center" position="relative" gap="large">
				<Box className={clsx(styles.accountSearchWrapper)}>
					{!isInputVisible ? (
						<Box flexShrink={0}>
							<Text capitalizeFirstLetter size="large" weight="medium" color="strong">
								{searchTitle}
							</Text>
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
					<Button
						className={clsx(styles.accountUpButton, (isInputVisible || !isSticky) && styles.accountUpButtonHidden)}
						styleVariant="ghost"
						sizeVariant="small"
						onClick={handleUpClick}
						iconOnly
					>
						<ArrowUpIcon />
					</Button>
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

AccountActivitySearch.defaultProps = defaultProps
