import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

export interface ISettingsTitle {
	title: string | React.ReactElement
	subTitle: string | React.ReactElement
	isBottomBorderVisible?: boolean
	backLink?: string
}

export const SettingsTitle: React.FC<ISettingsTitle> = props => {
	const { backLink, title, subTitle, isBottomBorderVisible = true } = props

	return (
		<Box className={clsx(styles.settingsTitleWrapper, isBottomBorderVisible && styles.settingsSectionBorderWrapper)}>
			<Box display="flex" flexDirection="column" gap="xsmall">
				<Box display="flex" gap="small">
					{backLink && (
						<Box className={styles.settingsTitleBackLinkWrapper}>
							<ToolTip message="global.back">
								<Button to={backLink} styleVariant="ghost" sizeVariant="small" iconOnly>
									<ArrowLeftIcon />
								</Button>
							</ToolTip>
						</Box>
					)}
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
