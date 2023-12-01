import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { DECIMAL_STYLES, TOOLTIP_DECIMAL_STYLES } from 'ui/src/constants/number'

const messages = defineMessages({
	title: {
		id: 'Lv0zJu',
		defaultMessage: 'Details',
	},
	divisibility: {
		id: '3ngJR6',
		defaultMessage: 'Divisibility',
	},
	total_supply: {
		id: '/kI0V9',
		defaultMessage: 'Total supply',
	},
	total_minted: {
		id: 'ZYosl3',
		defaultMessage: 'Total minted',
	},
	total_burned: {
		id: '/B/zOD',
		defaultMessage: 'Total burned',
	},
})

interface IProps {
	details: StateEntityDetailsResponseFungibleResourceDetails
}

const FungibleResourceDetails: React.FC<IProps> = ({ details }) => {
	const intl = useIntl()

	return (
		<Box display="flex" flexDirection="column">
			<Box paddingTop="xlarge">
				<Text size="large" weight="medium" color="strong">
					{intl.formatMessage(messages.title)}
				</Text>
			</Box>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.divisibility)}
					</Text>
				}
				rightData={
					<Text size="xxsmall" truncate>
						{details.divisibility}
					</Text>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.total_supply)}
					</Text>
				}
				rightData={
					<ToolTip message={intl.formatNumber(parseFloat(details.total_supply) || 0, TOOLTIP_DECIMAL_STYLES)}>
						<Box>
							<Text size="xxsmall" truncate>
								{intl.formatNumber(parseFloat(details.total_supply) || 0, DECIMAL_STYLES)}
							</Text>
						</Box>
					</ToolTip>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.total_minted)}
					</Text>
				}
				rightData={
					<ToolTip message={intl.formatNumber(parseFloat(details.total_minted) || 0, TOOLTIP_DECIMAL_STYLES)}>
						<Box>
							<Text size="xxsmall" truncate>
								{intl.formatNumber(parseFloat(details.total_minted) || 0, DECIMAL_STYLES)}
							</Text>
						</Box>
					</ToolTip>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.total_burned)}
					</Text>
				}
				rightData={
					<ToolTip message={intl.formatNumber(parseFloat(details.total_burned) || 0, TOOLTIP_DECIMAL_STYLES)}>
						<Box>
							<Text size="xxsmall" truncate>
								{intl.formatNumber(parseFloat(details.total_burned) || 0, DECIMAL_STYLES)}
							</Text>
						</Box>
					</ToolTip>
				}
			/>
		</Box>
	)
}

export default FungibleResourceDetails
