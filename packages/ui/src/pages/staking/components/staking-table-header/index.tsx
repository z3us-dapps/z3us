import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

const messages = defineMessages({
	title: {
		defaultMessage: 'Staking validators',
	},
	subtitle: {
		defaultMessage:
			'View all currently registered Radix Network validator nodes, and manage your own XRD stakes to validators',
	},
})

export const StakingTableHeader: React.FC = () => {
	const intl = useIntl()

	return (
		<Box className={styles.stakingHeaderWrapper}>
			<Text size="xxlarge" color="strong" weight="strong">
				{intl.formatMessage(messages.title)}
			</Text>
			<Box maxWidth="xsmall">
				<Text size="medium">{intl.formatMessage(messages.subtitle)}</Text>
			</Box>
		</Box>
	)
}
