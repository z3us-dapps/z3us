import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface IProps {
	title: React.ReactElement | string
	subTitle?: React.ReactElement | string
}

export const Title: React.FC<IProps> = props => {
	const { title, subTitle } = props

	return (
		<Box className={styles.keystoreNewTextWrapper}>
			{typeof title === 'string' ? (
				<Text size="xxlarge" weight="strong" color="strong">
					{title}
				</Text>
			) : (
				title
			)}
			{typeof subTitle === 'string' ? <Text>{subTitle}</Text> : subTitle}
		</Box>
	)
}
