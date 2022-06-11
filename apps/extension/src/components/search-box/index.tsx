import React, { useRef, useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useDebounce } from 'usehooks-ts'
import { Box } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { Cross2Icon } from '@radix-ui/react-icons'
import Input from 'ui/src/components/input'

interface IProps {
	onSearch: (value: string) => void
	css?: any
	placeholder?: string
	size?: string
	value?: string
	showCancelButton?: boolean
	onCancelSearch?: () => void
	debounce?: number
}

const defaultProps = {
	css: {},
	placeholder: undefined,
	size: '1',
	value: '',
	showCancelButton: true,
	debounce: 500,
}

export const SearchBox: React.FC<IProps> = ({
	css,
	placeholder,
	size,
	value,
	debounce,
	showCancelButton,
	onCancelSearch,
	onSearch,
}) => {
	const inputSearchRef = useRef(null)
	const [state, setState] = useImmer({
		value: value,
	})
	const debouncedValue = useDebounce<string>(state.value, debounce)

	const handleCloseSearchBox = () => {
		onCancelSearch()
	}

	const handleUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setState(draft => {
			draft.value = event.target.value
		})
	}

	useEffect(() => {
		inputSearchRef.current.focus()
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
				focusOnMount
				ref={inputSearchRef}
				type="text"
				size={size}
				placeholder={placeholder}
				value={state.value}
				onChange={handleUpdateSearch}
			/>
			{showCancelButton ? (
				<Button
					color="ghost"
					iconOnly
					aria-label="close search box"
					size="1"
					css={{ position: 'absolute', top: '6px', right: '6px', color: '$txtHelp' }}
					onClick={handleCloseSearchBox}
				>
					<Cross2Icon />
				</Button>
			) : null}
		</Box>
	)
}

SearchBox.defaultProps = defaultProps
