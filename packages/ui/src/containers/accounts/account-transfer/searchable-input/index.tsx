import clsx, { type ClassValue } from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { Virtuoso } from 'react-virtuoso'
import { useDebounce } from 'use-debounce'

import { Box } from 'ui/src/components/box'
import { Check2Icon, ChevronDown2Icon } from 'ui/src/components/icons'
import { type FormElement, Input, type TSizeVariant, type TStyleVariant } from 'ui/src/components/input'
import { PopoverAnchor, PopoverContent, PopoverPortal, PopoverRoot } from 'ui/src/components/popover'
import SimpleBar from 'ui/src/components/simple-bar'
import { Text } from 'ui/src/components/typography'

import * as styles from './searchable-input.css'

type TData = Array<{ id: string; account: string; alias: string }>

export interface ISearchableInputProps {
	value: string
	data: TData
	onValueChange: (value: string) => void
	className?: ClassValue
	styleVariant?: TStyleVariant
	sizeVariant?: TSizeVariant
	placeholder?: string
}

export const SearchableInput: React.FC<ISearchableInputProps> = props => {
	const { className, data, value, onValueChange, styleVariant = 'primary', sizeVariant = 'large', placeholder } = props
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | undefined>(undefined)
	const [localData, setLocalData] = useState<TData>(data)
	const [measureRef, { width: triggerWidth }] = useMeasure()
	const inputWrapperRef = useRef<HTMLInputElement>(null)

	const [debouncedValue] = useDebounce<string>(value, 200)

	const searchArray = (input: string, array: TData) => {
		const lowerCaseInput = input.toLowerCase()

		return array.filter(item =>
			Object.values(item).some(_value => {
				if (typeof value === 'string' && (_value as string).toLowerCase().includes(lowerCaseInput)) {
					return true
				}
				return false
			}),
		)
	}

	useEffect(() => {
		setLocalData(searchArray(debouncedValue, data))
	}, [data])

	useEffect(() => {
		if (!isPopoverOpen) return
		setLocalData(searchArray(debouncedValue, data))
	}, [debouncedValue])

	const closePopover = () => {
		setIsPopoverOpen(false)
	}

	const handleItemSelected = (val: string) => {
		setLocalData(data)
		onValueChange(val)
		closePopover()
	}

	const handleOnChange = (e: React.ChangeEvent<FormElement>) => {
		const val = e.currentTarget.value
		onValueChange(val)
	}

	const handleOnEscapeKeyDown = () => {
		closePopover()
	}

	const handleOnPointerDownOutside = (e: any) => {
		// Do nothing if clicking ref's element or descendent elements
		if (!inputWrapperRef || inputWrapperRef.current.contains(e.target as Node)) {
			return
		}
		closePopover()
	}

	return (
		<Box className={clsx(styles.searchableInputWrapper, className)}>
			<PopoverRoot open={isPopoverOpen}>
				<PopoverAnchor asChild>
					<Box ref={measureRef} className={styles.inputWrapper}>
						<Input
							ref={inputWrapperRef}
							styleVariant={styleVariant}
							sizeVariant={sizeVariant}
							value={value}
							placeholder={placeholder}
							onChange={handleOnChange}
							onFocus={() => {
								setIsPopoverOpen(true)
							}}
							rightIconClassName={styles.searchableInputRightIconWrapper}
							rightIcon={<ChevronDown2Icon />}
						/>
					</Box>
				</PopoverAnchor>
				<PopoverPortal>
					<PopoverContent
						align="start"
						sideOffset={2}
						onOpenAutoFocus={e => {
							e.preventDefault()
						}}
						onEscapeKeyDown={handleOnEscapeKeyDown}
						onPointerDownOutside={handleOnPointerDownOutside}
						style={{ width: `${triggerWidth}px` }}
					>
						<SimpleBar
							className={styles.searchableInputSimpleBarWrapper}
							scrollableNodeProps={{ ref: setCustomScrollParent }}
						>
							<Box className={styles.searchableInputScrollAreaWrapper}>
								<Virtuoso
									data={localData}
									// eslint-disable-next-line react/no-unstable-nested-components
									itemContent={(index, { id, account, alias }) => (
										<Box
											component="button"
											className={styles.searchableInputButtonWrapper}
											value={id}
											key={index}
											display="flex"
											onClick={() => {
												handleItemSelected(id)
											}}
										>
											<Box flexGrow={1}>
												<Text color="strong" truncate>
													{alias}
												</Text>
											</Box>
											<Box flexGrow={1}>
												<Text truncate>{account}</Text>
											</Box>
											{id === value && (
												<Box flexShrink={0} display="flex" alignItems="center" justifyContent="center">
													<Check2Icon />
												</Box>
											)}
										</Box>
									)}
									customScrollParent={customScrollParent}
								/>
							</Box>
						</SimpleBar>
					</PopoverContent>
				</PopoverPortal>
			</PopoverRoot>
		</Box>
	)
}
