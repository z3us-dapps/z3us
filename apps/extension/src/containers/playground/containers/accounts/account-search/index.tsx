/* eslint-disable */
import clsx from 'clsx'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useEventListener } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { FormElement, Input } from 'ui/src/components-v2/input'
import { Text } from 'ui/src/components-v2/typography'
import { Close2Icon, SearchIcon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'

import * as styles from './account-search.css'

interface IAccountSearchRequiredProps {
	placeholder: string
}

interface IAccountSearchOptionalProps {
	className?: number
	onChange?: (value: String) => void
}

interface IAccountSearchProps extends IAccountSearchRequiredProps, IAccountSearchOptionalProps {}

const defaultProps: IAccountSearchOptionalProps = {
	className: undefined,
	onChange: undefined,
}

export const AccountSearch = forwardRef<HTMLElement, IAccountSearchProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { placeholder, onChange, className } = props

		const [isInputVisible, setIsInputVisible] = useState<boolean>(false)
		const [inputValue, setInputValue] = useState<string>('')
		const inputRef = useRef(null)

		const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
			const value = event.target.value

			setInputValue(value)
			onChange(value)
		}

		const handleCloseSearch = () => {
			setIsInputVisible(false)
			setInputValue('')
		}

		useEventListener('keydown', e => {
			if (e.key === 'Escape') {
				inputRef.current.blur()
				handleCloseSearch()
			}
		})

		return (
			<Box ref={ref} className={styles.accountSearchWrapper}>
				<Box className={clsx(styles.inputWrapper, isInputVisible && styles.inputWrapperVisible)}>
					<Input
						value={inputValue}
						ref={inputRef}
						className={styles.inputElement}
						placeholder={placeholder}
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
					className={clsx(styles.accountSearchButton, isInputVisible && styles.accountSearchButtonHidden)}
					styleVariant="ghost"
					sizeVariant="small"
					onClick={() => {
						setIsInputVisible(true)
						inputRef.current.focus()
					}}
					iconOnly
				>
					<SearchIcon />
				</Button>
			</Box>
		)
	},
)

AccountSearch.defaultProps = defaultProps
