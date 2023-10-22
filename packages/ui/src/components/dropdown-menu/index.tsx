import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import clsx, { type ClassValue } from 'clsx'
import type { ForwardedRef } from 'react'
import React, { forwardRef, useCallback, useState } from 'react'
import useMeasure from 'react-use-measure'
import { Virtuoso } from 'react-virtuoso'

import { Box } from '../box'
import { Check2Icon } from '../icons'
import SimpleBar from '../simple-bar'
import { Text } from '../typography'
import * as styles from './styles.css'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
export const DropdownMenuSub = DropdownMenuPrimitive.Sub

export const DropdownMenuContent = forwardRef<HTMLDivElement, DropdownMenuPrimitive.DropdownMenuContentProps>(
	({ children, className, ...props }, ref) => (
		<DropdownMenuPrimitive.Content ref={ref} className={clsx(styles.dropdownMenuContent, className)} {...props}>
			{children}
		</DropdownMenuPrimitive.Content>
	),
)

export const DropdownMenuItem = ({ children, ...props }) => (
	<DropdownMenuPrimitive.Item className={styles.dropdownMenuItem} {...props}>
		{children}
	</DropdownMenuPrimitive.Item>
)

export const DropdownMenuSeparator = forwardRef<HTMLDivElement, DropdownMenuPrimitive.DropdownMenuSeparatorProps>(
	({ className, ...props }, ref) => (
		<DropdownMenuPrimitive.Separator ref={ref} className={clsx(styles.dropdownMenuSeparator, className)} {...props} />
	),
)

export const DropdownMenuArrow = () => <DropdownMenuPrimitive.Arrow className={styles.dropdownMenuArrow} />

export const DropdownMenuLabel = ({ children, ...props }) => (
	<DropdownMenuPrimitive.Label className={styles.dropdownMenuLabel} {...props}>
		{children}
	</DropdownMenuPrimitive.Label>
)

export const DropdownMenuRadioGroup = ({ children, ...props }) => (
	<DropdownMenuPrimitive.RadioGroup className={styles.dropdownMenuRadioGroup} {...props}>
		{children}
	</DropdownMenuPrimitive.RadioGroup>
)

export const DropdownMenuRadioItem = ({ children, value, ...props }) => (
	<DropdownMenuPrimitive.RadioItem className={styles.dropdownMenuRadioItem} value={value} {...props}>
		{children}
	</DropdownMenuPrimitive.RadioItem>
)

export const DropdownMenuItemIndicator = ({ children, ...props }) => (
	<DropdownMenuPrimitive.ItemIndicator className={styles.dropdownMenuItemIndicator} {...props}>
		{children}
	</DropdownMenuPrimitive.ItemIndicator>
)

export const DropdownMenuSubTrigger = ({ children, ...props }) => (
	<DropdownMenuPrimitive.SubTrigger className={styles.dropdownMenuSubTrigger} {...props}>
		{children}
	</DropdownMenuPrimitive.SubTrigger>
)

export const DropdownMenuSubContent = forwardRef<HTMLDivElement, DropdownMenuPrimitive.DropdownMenuContentProps>(
	({ children, className, ...props }, ref) => (
		<DropdownMenuPrimitive.SubContent ref={ref} className={clsx(styles.dropdownMenuSubContent, className)} {...props}>
			{children}
		</DropdownMenuPrimitive.SubContent>
	),
)

export const DropdownMenuRightSlot = ({ children, ...props }) => (
	<Box className={styles.dropdownMenuItemRightSlot} {...props}>
		{children}
	</Box>
)

export const DropdownMenuLeftSlot = ({ children, ...props }) => (
	<Box className={styles.dropdownMenuItemLeftSlot} {...props}>
		{children}
	</Box>
)

interface IItemProps {
	id: string
	title: string
}

const DefaultItemContent: React.FC<IItemProps> = ({ id, title }) => (
	<DropdownMenuRadioItem value={id}>
		<Box flexGrow={1}>
			<Text>{title}</Text>
		</Box>
		<DropdownMenuItemIndicator>
			<Check2Icon />
		</DropdownMenuItemIndicator>
	</DropdownMenuRadioItem>
)

export interface IDropdownMenuVirtuosoProps {
	trigger: React.ReactNode
	value: string
	data: Array<{ id: string; title: string }>
	onValueChange: (value: string) => void
	className?: ClassValue
	itemContentRenderer?: (index: number, item: { id: string; title: string }) => React.ReactNode
}

export const DropdownMenuVirtuoso = forwardRef((props: IDropdownMenuVirtuosoProps, ref: ForwardedRef<any>) => {
	const { trigger, className, data, value, itemContentRenderer, onValueChange } = props
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | undefined>(undefined)
	const [measureRef, { width: triggerWidth }] = useMeasure()

	const itemRenderer = useCallback(
		(idx: number, itemData: any) =>
			itemContentRenderer ? (
				itemContentRenderer(idx, itemData)
			) : (
				<DefaultItemContent key={itemData.id} id={itemData.id} title={itemData.title} />
			),
		[itemContentRenderer],
	)

	return (
		<Box className={clsx(styles.dropdownMenuVirtuosoWrapper, className)} ref={ref}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild ref={measureRef}>
					{trigger}
				</DropdownMenuTrigger>
				<DropdownMenuPortal>
					<DropdownMenuContent
						align="start"
						sideOffset={0}
						className={styles.dropdownMenuVirtuosoContentWrapper}
						style={{ width: `${triggerWidth}px` }}
					>
						<SimpleBar
							className={styles.dropdownMenuVirtuosoSimpleBarWrapper}
							scrollableNodeProps={{ ref: setCustomScrollParent }}
						>
							<Box className={styles.dropdownMenuVirtuosoScrollAreaWrapper}>
								<DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
									<Virtuoso data={data} itemContent={itemRenderer} customScrollParent={customScrollParent} />
								</DropdownMenuRadioGroup>
							</Box>
						</SimpleBar>
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenu>
		</Box>
	)
})
