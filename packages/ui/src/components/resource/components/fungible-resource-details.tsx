import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { Text } from 'ui/src/components/typography'

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
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.divisibility)}
					</Text>
				}
				rightData={<Text size="xsmall">{details.divisibility}</Text>}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.total_supply)}
					</Text>
				}
				rightData={
					<Text size="xsmall">
						{intl.formatNumber(parseFloat(details.total_supply) || 0, {
							style: 'decimal',
							maximumFractionDigits: 8,
						})}
					</Text>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.total_minted)}
					</Text>
				}
				rightData={
					<Text size="xsmall">
						{intl.formatNumber(parseFloat(details.total_minted) || 0, {
							style: 'decimal',
							maximumFractionDigits: 8,
						})}
					</Text>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.total_burned)}
					</Text>
				}
				rightData={
					<Text size="xsmall">
						{intl.formatNumber(parseFloat(details.total_burned) || 0, {
							style: 'decimal',
							maximumFractionDigits: 8,
						})}
					</Text>
				}
			/>
		</Box>
	)
}

export default FungibleResourceDetails
