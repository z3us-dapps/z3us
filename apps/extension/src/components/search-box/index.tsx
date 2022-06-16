import React, { useRef, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useDebounce } from 'usehooks-ts'
import { Box } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import Input from 'ui/src/components/input'

interface IProps {
	css?: any
	placeholder?: string
	size?: string
	value?: string
	showCancelButton?: boolean
	showCancelOnlyWithValueButton?: boolean
	debounce?: number
	focusOnMount?: boolean
	onCancelSearch?: () => void
	onSearch: (value: string) => void
}

const defaultProps = {
	css: {},
	placeholder: undefined,
	size: '1',
	value: '',
	showCancelButton: false,
	showCancelOnlyWithValueButton: false,
	debounce: 500,
	focusOnMount: false,
	onCancelSearch: () => {},
}

export const SearchBox: React.FC<IProps> = ({
	css,
	placeholder,
	size,
	value,
	debounce,
	showCancelButton,
	showCancelOnlyWithValueButton,
	onCancelSearch,
	onSearch,
	focusOnMount,
}) => {
	const inputSearchRef = useRef(null)
	const [state, setState] = useImmer({
		value,
	})
	const debouncedValue = useDebounce<string>(state.value, debounce)

	const handleCancelSearchBox = () => {
		setState(draft => {
			draft.value = ''
		})
		onSearch('')
		onCancelSearch()
		setTimeout(() => {
			inputSearchRef?.current?.focus()
		}, 0)
	}

	const handleUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.value = event.target.value
		})
	}

	useEffect(() => {
		if (focusOnMount) {
			inputSearchRef.current.focus()
		}
	}, [])

	useEffect(() => {
		onSearch(state.value)
	}, [debouncedValue])

	return (
		<Box
			css={{
				position: 'relative',
				...(css as any),
			}}
		>
			<Input
				ref={inputSearchRef}
				type="text"
				size={size}
				placeholder={placeholder}
				value={state.value}
				onChange={handleUpdateSearch}
			/>
			{showCancelButton || (showCancelOnlyWithValueButton && state.value.length > 0) ? (
				<Button
					color="ghost"
					iconOnly
					aria-label="close search box"
					size="1"
					css={{ position: 'absolute', top: '6px', right: '6px', color: '$txtHelp' }}
					onClick={handleCancelSearchBox}
				>
					<Cross2Icon />
				</Button>
			) : null}
		</Box>
	)
}

SearchBox.defaultProps = defaultProps
