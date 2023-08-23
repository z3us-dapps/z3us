import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface IProps {
	title: string
	subTitle?: string
}

export const EmptyState: React.FC<IProps> = props => {
	const { title, subTitle } = props

	return (
		<Box className={styles.emptyStateWrapper}>
			<Text size="xsmall" color="red">
				{title}
			</Text>
			{subTitle && (
				<Text size="xsmall" color="red">
					{subTitle}
				</Text>
			)}
		</Box>
	)
}
