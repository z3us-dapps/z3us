import * as TabsPrimitive from '@radix-ui/react-tabs'
import clsx from 'clsx'
import React from 'react'

import * as styles from './styles.css'

export const TabsRoot = TabsPrimitive.Root
export const TabsList = TabsPrimitive.List
export const TabTrigger = TabsPrimitive.TabsTrigger
export const TabsContent = TabsPrimitive.Content

interface ITabsProps extends TabsPrimitive.TabsProps {
	className?: string
	list: {
		value: string
		label: string
	}[]
	sizeVariant?: 'small' | 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
}

export const Tabs = (props: ITabsProps) => {
	const { className, children, list, sizeVariant = 'medium', styleVariant = 'primary', ...rest } = props

	return (
		<TabsRoot {...rest} className={className}>
			<TabsList
				className={clsx(
					styles.tabsListRootWrapper,
					styles.tabsListRecipe({
						sizeVariant,
						styleVariant,
					}),
				)}
			>
				{list.map(({ label, value }) => (
					<TabTrigger
						key={value}
						value={value}
						className={clsx(
							styles.tabsTriggerRecipe({
								sizeVariant,
								styleVariant,
							}),
							styles.tabsTriggerRoot,
						)}
					>
						{label}
					</TabTrigger>
				))}
			</TabsList>
			{children}
		</TabsRoot>
	)
}
