import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef, useState } from 'react'
import useMeasure from 'react-use-measure'
import { Virtuoso } from 'react-virtuoso'

import { Check2Icon } from '../../components/icons'
import { Box } from '../box'
import SimpleBar from '../simple-bar'
import { Text } from '../typography'
import * as styles from './dropdown-menu.css'

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

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

export const DropdownMenuSeparator = () => <DropdownMenuPrimitive.Separator className={styles.dropdownMenuSeperator} />

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

// Virtuoso menu
interface IDropdownMenuVirtuosoRequiredProps {
	trigger: React.ReactNode
	value: string
	data: Array<{ id: string; title: string }>
	onValueChange: (value: string) => void
}

interface IDropdownMenuVirtuosoOptionalProps {
	className?: ClassValue
	itemContentRenderer?: (index: number, item: { id: string; title: string }) => React.ReactNode
}

interface IDropdownMenuVirtuosoProps extends IDropdownMenuVirtuosoRequiredProps, IDropdownMenuVirtuosoOptionalProps {}

const defaultProps: IDropdownMenuVirtuosoOptionalProps = {
	className: undefined,
	itemContentRenderer: (index, { id, title }) => (
		<DropdownMenuRadioItem value={id} key={index}>
			<Box flexGrow={1}>
				<Text>{title}</Text>
			</Box>
			<DropdownMenuItemIndicator>
				<Check2Icon />
			</DropdownMenuItemIndicator>
		</DropdownMenuRadioItem>
	),
}

export const DropdownMenuVirtuoso: React.FC<IDropdownMenuVirtuosoProps> = ({
	trigger,
	className,
	data,
	value,
	itemContentRenderer,
	onValueChange,
}) => {
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | undefined>(undefined)
	const [measureRef, { width: triggerWidth }] = useMeasure()

	return (
		<Box className={clsx(styles.dropdownMenuVirtuosoWrapper, className)}>
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
									<Virtuoso data={data} itemContent={itemContentRenderer} customScrollParent={customScrollParent} />
								</DropdownMenuRadioGroup>
							</Box>
						</SimpleBar>
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenu>
		</Box>
	)
}

DropdownMenuVirtuoso.defaultProps = defaultProps
