import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './styles.css'

interface IProps {
	className?: ClassValue
	children?: React.ReactElement | React.ReactElement[]
}

export const LayoutCenterCard: React.FC<IProps> = props => {
	const { className, children } = props

	return (
		<Box className={clsx(styles.layoutCenterCardWrapper, className)}>
			<Box className={styles.layoutCenterCardInnerWrapper}>
				<Box className={styles.layoutCenterCardTextWrapper}>{children}</Box>
			</Box>
		</Box>
	)
}
