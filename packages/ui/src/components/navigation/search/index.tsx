import React, { useCallback, useEffect, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Close2Icon, SearchIcon } from 'ui/src/components/icons'
import type { FormElement } from 'ui/src/components/input'
import { Input } from 'ui/src/components/input'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'

import * as styles from './styles.css'

const messages = defineMessages({
	clear: {
		defaultMessage: 'Clear',
		id: '/GCoTA',
	},
	search: {
		defaultMessage: 'Search...',
		id: '0BUTMv',
	},
})

export const SearchResource: React.FC = () => {
	const intl = useIntl()
	const location = useLocation()
	const navigate = useNavigate()
	const inputRef = useRef(null)

	const [value, setValue] = useState<string>('')

	useEffect(() => {
		inputRef?.current?.focus()
	}, [])

	const handleSearch = () => {
		const [, params] = location.search.split('?')
		const query = new URLSearchParams(params)
		query.set('query', `${value}`)
		navigate(`${location.pathname}?${query}`)
	}

	const handleKeyPress = useCallback(
		({ key }: React.KeyboardEvent) => {
			if (key === 'Enter') {
				handleSearch()
			}
		},
		[value],
	)

	const handleValueChange = (e: React.ChangeEvent<FormElement>) => {
		setValue(e.currentTarget.value)
	}

	const handleClear = () => {
		setValue('')
	}

	return (
		<Box className={styles.searchWrapper} onKeyDown={handleKeyPress}>
			<Input
				ref={inputRef}
				sizeVariant="small"
				styleVariant="secondary"
				className={styles.inputSearch}
				placeholder={intl.formatMessage(messages.search)}
				rounded
				value={value}
				leftIcon={
					<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={handleSearch}>
						<SearchIcon />
					</Button>
				}
				rightIcon={
					<ToolTip message={intl.formatMessage(messages.clear)}>
						<Button iconOnly sizeVariant="small" styleVariant="ghost" rounded onClick={handleClear}>
							<Close2Icon />
						</Button>
					</ToolTip>
				}
				rightIconClassName={styles.inputSearchClearBtn}
				onChange={handleValueChange}
			/>
		</Box>
	)
}
