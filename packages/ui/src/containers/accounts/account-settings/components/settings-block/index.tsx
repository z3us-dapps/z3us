import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './settings-block.css'

export interface ISettingsBlock {
	leftCol: React.ReactElement
	rightCol: React.ReactElement
	isBottomBorderVisible?: boolean
}

export const SettingsBlock: React.FC<ISettingsBlock> = props => {
	const { leftCol, rightCol, isBottomBorderVisible = true } = props

	return (
		<Box className={clsx(styles.settingsSectionWrapper, isBottomBorderVisible && styles.settingsSectionBorderWrapper)}>
			<Box className={styles.settingsSectionGridBasic}>
				<Box display="flex" flexDirection="column">
					{leftCol}
				</Box>
				<Box display="flex" flexDirection="column" gap="small">
					{rightCol}
				</Box>
			</Box>
		</Box>
	)
}
