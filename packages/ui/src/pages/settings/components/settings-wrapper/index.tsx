import React from 'react'

import { Box } from 'ui/src/components/box'
import MotionBox from 'ui/src/components/motion-box'
import { ScrollPanel } from 'ui/src/components/scroll-panel'

import * as styles from './styles.css'

interface IProps {
	children: React.ReactNode
}

export const SettingsWrapper: React.FC<IProps> = props => {
	const { children } = props

	return (
		<MotionBox>
			<ScrollPanel>
				<Box className={styles.settingsSectionFlexColumnWrapper}>{children}</Box>
			</ScrollPanel>
		</MotionBox>
	)
}
