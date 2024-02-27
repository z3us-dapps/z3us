import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'

import type { Change } from '@src/types/transaction'

const messages = defineMessages({
	customize_guarantees_button_title: {
		id: 'xbqYy7',
		defaultMessage: 'Customize Guarantees',
	},
})

interface IProps {
	change: Change
	onClick: (change: Change) => void
}

export const CustomizeGuaranteeTrigger: React.FC<IProps> = ({ change, onClick }) => {
	const intl = useIntl()
	const { data, isLoading } = useEntityDetails(change.resource)

	const handleCustomizeGuarantees = () => {
		onClick(change)
	}

	if (isLoading) return <FallbackLoading />
	if (data?.details.type !== 'FungibleResource') return null

	return (
		<Box
			component="button"
			display="inline-flex"
			alignItems="center"
			onClick={handleCustomizeGuarantees}
			className={clsx(plainButtonStyles.plainButtonHoverWrapper, plainButtonStyles.plainButtonHoverUnderlineWrapper)}
		>
			<Text color="inherit" size="xsmall">
				{intl.formatMessage(messages.customize_guarantees_button_title)}
			</Text>
		</Box>
	)
}
