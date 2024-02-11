import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './show-hide-panel.css'

interface IShowHidePanelProps {
	children: React.ReactNode
	className?: ClassValue
	isChildrenVisible?: boolean
}
export const ShowHidePanel: React.FC<IShowHidePanelProps> = props => {
	const { children, isChildrenVisible = false, className } = props

	return (
		<Box className={clsx(styles.showHidePanelWrapper, className)}>
			{isChildrenVisible && <Box component="section">{children}</Box>}
		</Box>
	)
}
