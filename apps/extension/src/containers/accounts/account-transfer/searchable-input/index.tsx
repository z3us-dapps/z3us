/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx, { type ClassValue } from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { Virtuoso } from 'react-virtuoso'

import { Check2Icon, ChevronDown2Icon } from 'ui/src/components/icons'
import { Box } from 'ui/src/components-v2/box'
import { Input } from 'ui/src/components-v2/input'
import SimpleBar from 'ui/src/components-v2/simple-bar'
import { Text } from 'ui/src/components-v2/typography'
import { PopoverRoot, PopoverAnchor, PopoverPortal, PopoverContent } from 'ui/src/components-v2/popover'
import * as styles from './searchable-input.css'

interface ISearchableInputRequiredProps {
	value: string
	data: Array<{ id: string; title: string }>
	onValueChange: (value: string) => void
}

interface ISearchableInputOptionalProps {
	className?: ClassValue
}

interface ISearchableInputProps extends ISearchableInputRequiredProps, ISearchableInputOptionalProps {}

const defaultProps: ISearchableInputOptionalProps = {
	className: undefined,
}

export const SearchableInput: React.FC<ISearchableInputProps> = props => {
	const { className, data, value, onValueChange } = props
	const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | undefined>(undefined)
	const [measureRef, { width: triggerWidth }] = useMeasure()
	const inputWrapperRef = useRef<HTMLInputElement>(null)

	const closePopover = () => {
		setIsPopoverOpen(false)
	}

	const handleItemSelected = (id: string) => {
		// eslint-disable-next-line
		console.log('id:', id)
		closePopover()
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
							styleVariant="secondary"
							sizeVariant="large"
							value={undefined}
							placeholder="rdx1..."
							// placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
							onChange={() => {}}
							onFocus={() => {
								setIsPopoverOpen(true)
							}}
							rightIcon={
								<Box display="flex" alignItems="center" gap="small">
									<Box>pill</Box>
									<ChevronDown2Icon />
								</Box>
							}
							// onBlur={() => {
							// 	setIsPopoverOpen(false)
							// }}
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
