import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'

import * as styles from './settings-title.css'

export interface ISettingsTitle {
	title: string | React.ReactElement
	subTitle: string | React.ReactElement
	isBottomBorderVisible?: boolean
	backLink?: string
}

export const SettingsTitle: React.FC<ISettingsTitle> = props => {
	const { backLink, title, subTitle, isBottomBorderVisible = true } = props

	return (
		<Box
			className={clsx(
				styles.settingsTitleWrapper,
				isBottomBorderVisible ? styles.settingsSectionBorderWrapper : styles.settingsSectionWrapper,
			)}
		>
			{backLink && (
				<Box className={styles.settingsTitleBackLinkWrapper}>
					<Button to={backLink} styleVariant="secondary" sizeVariant="medium" iconOnly>
						<ArrowLeftIcon />
					</Button>
				</Box>
			)}
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
