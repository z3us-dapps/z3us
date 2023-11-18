import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { LayoutCenterCard } from 'ui/src/components/layout/layout-center-card'
import { Button } from 'ui/src/components/router-button'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

const messages = defineMessages({
	not_found_404_title: {
		defaultMessage: '404',
		id: 'DRXWXB',
	},
	not_found_404_sub_title: {
		defaultMessage: 'This page has gone missing, or you have assembled the link incorrectly.',
		id: 'Jcsbsk',
	},
	not_found_404_button: {
		defaultMessage: ' Navigate to home',
		id: 'SJBoe2',
	},
})

const NoMatch = () => {
	const intl = useIntl()

	return (
		<LayoutCenterCard>
			<Text align="center" size="xxxlarge" color="strong" weight="stronger">
				{intl.formatMessage(messages.not_found_404_title)}
			</Text>
			<Text size="xlarge">{intl.formatMessage(messages.not_found_404_sub_title)}</Text>
			<Box className={styles.notFound404ButtonWrapper}>
				<Button fullWidth sizeVariant="large" styleVariant="primary" to="accounts">
					{intl.formatMessage(messages.not_found_404_button)}
				</Button>
			</Box>
		</LayoutCenterCard>
	)
}

export default NoMatch
