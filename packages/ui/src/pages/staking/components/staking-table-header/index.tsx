import { Box } from 'packages/ui/src/components/box'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'

import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

const messages = defineMessages({
	title: {
		id: 'staking.table_header.title',
		defaultMessage: 'Staking validators',
	},
	subtitle: {
		id: 'staking.table_header.subtitle',
		defaultMessage:
			'View all currently registered Radix Network validator nodes, and manage your own XRD stakes to validators',
	},
})

export const StakingTableHeader: React.FC = () => {
	const intl = useIntl()
	const { validatorId } = useParams()

	const navigate = useNavigate()

	const navigateBack = () => {
		navigate('/staking')
	}

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
