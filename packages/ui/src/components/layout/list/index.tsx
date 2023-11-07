import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'
import { ToolTip } from 'ui/src/components/tool-tip'

import * as styles from './styles.css'

interface IListProps {
	className?: ClassValue
	children?: React.ReactNode | React.ReactElement[]
}

export const List: React.FC<IListProps> = props => {
	const { className, children } = props

	return (
		<Box component="ul" className={clsx(styles.listWrapper, className)}>
			{children}
		</Box>
	)
}

interface IListItemProps {
	className?: ClassValue
	onClick?: () => void
	children?: React.ReactNode | React.ReactElement[]
	href?: string
	disabled?: boolean
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
	tooltipContent?: React.ReactNode
}

export const ListItem: React.FC<IListItemProps> = props => {
	const {
		className,
		onClick,
		children,
		href,
		disabled,
		iconLeft,
		iconRight = <ChevronRightIcon />,
		tooltipContent,
	} = props
	const hasLink = !!href

	const withToolTip = (content: React.ReactNode) =>
		!tooltipContent ? content : <ToolTip message={tooltipContent}>{content}</ToolTip>

	const wrappedChildren = (
		<Box className={styles.listItemInnerWrapper}>
			{iconLeft && <Box className={styles.listIconWrapper}>{iconLeft}</Box>}
			{withToolTip(<Box className={styles.listTextWrapper}>{children}</Box>)}
			{iconRight && <Box className={styles.listIconWrapper}>{iconRight}</Box>}
		</Box>
	)

	if (disabled)
		return (
			<Box role="button" component="li" className={clsx(styles.listItemWrapper, className)} style={{ opacity: 0.5 }}>
				{wrappedChildren}
			</Box>
		)

	if (hasLink)
		return (
			<Link href={href} className={clsx(styles.listItemWrapper, styles.listItemLink, className)} underline="never">
				{wrappedChildren}
			</Link>
		)

	return (
		<Box
			onClick={onClick}
			role="button"
			component="li"
			className={clsx(styles.listItemWrapper, !!onClick && styles.listItemLink, className)}
		>
			{wrappedChildren}
		</Box>
	)
}
