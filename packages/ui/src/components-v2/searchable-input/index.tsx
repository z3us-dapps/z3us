/* eslint-disable @typescript-eslint/no-unused-vars */
import * as PopoverPrimative from '@radix-ui/react-popover'
import clsx, { type ClassValue } from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { Virtuoso } from 'react-virtuoso'

import { Check2Icon } from '../../components/icons'
import { Box } from '../box'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItemIndicator,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from '../dropdown-menu'
import { Input } from '../input'
import SimpleBar from '../simple-bar'
import { Text } from '../typography'
import * as styles from './searchable-input.css'

// Virtuoso menu
interface ISearchableInputRequiredProps {
	// input: React.ReactNode
	value: string
	data: Array<{ id: string; title: string }>
	onValueChange: (value: string) => void
}

interface ISearchableInputOptionalProps {
	className?: ClassValue
	itemContentRenderer?: (index: number, item: { id: string; title: string }) => React.ReactNode
}

interface ISearchableInputProps extends ISearchableInputRequiredProps, ISearchableInputOptionalProps {}

const defaultProps: ISearchableInputOptionalProps = {
	className: undefined,
	itemContentRenderer: (index, { id, title }) => (
		<Box value={id} key={index} display="flex">
			<Box flexGrow={1}>
				<Text>{title}</Text>
			</Box>
			<Box>
				<Check2Icon />
			</Box>
		</Box>
	),
}

export const SearchableInput: React.FC<ISearchableInputProps> = props => {
	const { className, data, value, itemContentRenderer, onValueChange } = props
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | undefined>(undefined)
	const [measureRef, { width: triggerWidth }] = useMeasure()
	const inputWrapperRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		if (isPopoverOpen) {
			// console.log('GETTTING')
			// inputWrapperRef?.current?.focus()
		}
	}, [isPopoverOpen])

	return (
		<Box className={clsx(styles.searchableInputWrapper, className)}>
			<PopoverPrimative.Root open={isPopoverOpen}>
				<PopoverPrimative.Anchor asChild>
					<Box ref={measureRef} className={styles.inputWrapper}>
						<Input
							ref={inputWrapperRef}
							styleVariant="secondary"
							sizeVariant="large"
							value={undefined}
							placeholder="rdx1..."
							// placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
							onChange={() => {}}
							onFocus={() => {
								setIsPopoverOpen(true)
							}}
							onBlur={() => {
								setIsPopoverOpen(false)
							}}
						/>
					</Box>
				</PopoverPrimative.Anchor>
				<PopoverPrimative.Portal>
					<PopoverPrimative.Content
						className={styles.popoverContentWrapper}
						align="start"
						sideOffset={0}
						onOpenAutoFocus={e => {
							e.preventDefault()
						}}
						style={{ width: `${triggerWidth}px` }}
					>
						<SimpleBar
							className={styles.searchableInputSimpleBarWrapper}
							scrollableNodeProps={{ ref: setCustomScrollParent }}
						>
							<Box className={styles.searchableInputScrollAreaWrapper}>
								<Virtuoso data={data} itemContent={itemContentRenderer} customScrollParent={customScrollParent} />
							</Box>
						</SimpleBar>
					</PopoverPrimative.Content>
				</PopoverPrimative.Portal>
			</PopoverPrimative.Root>
		</Box>
	)
}

SearchableInput.defaultProps = defaultProps
