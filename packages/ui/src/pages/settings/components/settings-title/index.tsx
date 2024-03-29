import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

export interface ISettingsTitle {
	title: string | React.ReactElement
	subTitle: string | React.ReactElement
	isBottomBorderVisible?: boolean
}

export const SettingsTitle: React.FC<ISettingsTitle> = props => {
	const { title, subTitle, isBottomBorderVisible = true } = props

	return (
		<Box className={clsx(styles.settingsTitleWrapper, isBottomBorderVisible && styles.settingsSectionBorderWrapper)}>
			<Box display="flex" flexDirection="column" gap="xsmall">
				<Box display="flex" gap="small">
					<Text size="xxlarge" weight="strong" color="strong">
						{title}
					</Text>
				</Box>
				<Box className={styles.settingsSubTitleWrapper}>
					<Text size="small">{subTitle}</Text>
				</Box>
			</Box>
		</Box>
	)
}
