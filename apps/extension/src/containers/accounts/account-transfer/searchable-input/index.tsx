import clsx, { type ClassValue } from 'clsx'
import React, { useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components-v2/box'
import { type FormElement, Input, type TSizeVariant, type TStyleVariant } from 'ui/src/components-v2/input'
import { PopoverAnchor, PopoverContent, PopoverPortal, PopoverRoot } from 'ui/src/components-v2/popover'
import SimpleBar from 'ui/src/components-v2/simple-bar'
import { Text } from 'ui/src/components-v2/typography'
import { Check2Icon, ChevronDown2Icon } from 'ui/src/components/icons'

import * as styles from './searchable-input.css'

interface ISearchableInputRequiredProps {
	value: string
	data: Array<{ id: string; title: string }>
	onValueChange: (value: string) => void
}

interface ISearchableInputOptionalProps {
	className?: ClassValue
	styleVariant?: TStyleVariant
	sizeVariant?: TSizeVariant
	placeholder?: string
}

interface ISearchableInputProps extends ISearchableInputRequiredProps, ISearchableInputOptionalProps {}

const defaultProps: ISearchableInputOptionalProps = {
	className: undefined,
	styleVariant: 'primary',
	sizeVariant: 'large',
	placeholder: undefined,
}

export const SearchableInput: React.FC<ISearchableInputProps> = props => {
	const { className, data, value, onValueChange, styleVariant, sizeVariant, placeholder } = props
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | undefined>(undefined)
	const [measureRef, { width: triggerWidth }] = useMeasure()
	const inputWrapperRef = useRef<HTMLInputElement>(null)

	const closePopover = () => {
		setIsPopoverOpen(false)
	}

	const handleItemSelected = (val: string) => {
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
									data={data}
									// eslint-disable-next-line react/no-unstable-nested-components
									itemContent={(index, { id, title }) => (
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
												<Text>{title}</Text>
											</Box>
											<Box flexShrink={0} display="flex" alignItems="center" justifyContent="center">
												<Check2Icon />
											</Box>
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

SearchableInput.defaultProps = defaultProps
