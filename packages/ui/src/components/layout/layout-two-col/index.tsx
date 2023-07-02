import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './layout-two-col.css'

export interface ILayoutTwoCol {
	className?: ClassValue
	leftCol?: React.ReactElement
	rightCol?: React.ReactElement
}

export const LayoutTwoCol: React.FC<ILayoutTwoCol> = props => {
	const { className, leftCol, rightCol } = props

	return (
		<Box position="relative" className={clsx(styles.layoutTwoColWrapper, className)}>
			<Box className={styles.layoutTwoColInnerWrapper}>
				<Box className={styles.layoutTwoColLeftWrapper}>{leftCol}</Box>
				<Box className={styles.layoutTwoColRightWrapper}>{rightCol}</Box>
			</Box>
		</Box>
	)
}
