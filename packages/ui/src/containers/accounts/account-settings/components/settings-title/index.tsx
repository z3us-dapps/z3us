import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './settings-title.css'

export interface ISettingsTitle {
	title: string | React.ReactElement
	subTitle: string | React.ReactElement
	isBottomBorderVisible?: boolean
}

export const SettingsTitle: React.FC<ISettingsTitle> = props => {
	const { title, subTitle, isBottomBorderVisible = true } = props

	return (
		<Box className={clsx(isBottomBorderVisible ? styles.settingsSectionBorderWrapper : styles.settingsSectionWrapper)}>
			<Box display="flex" flexDirection="column" gap="small">
				<Text size="xxlarge" weight="strong" color="strong">
					{title}
				</Text>
				<Box>
					<Text>{subTitle}</Text>
				</Box>
			</Box>
		</Box>
	)
}
