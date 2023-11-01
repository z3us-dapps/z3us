import type { StateEntityDetailsResponseComponentDetails } from '@radixdlt/babylon-gateway-api-sdk'
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
	package_address: {
		id: 'mPeS8E',
		defaultMessage: 'Package address',
	},
	blueprint_name: {
		id: 'e06NOl',
		defaultMessage: 'Blueprint name',
	},
	blueprint_version: {
		id: 'zuNWCA',
		defaultMessage: 'Blueprint version',
	},
	royalty_vault_balance: {
		id: 'LdPPhL',
		defaultMessage: 'Royalty vault balance',
	},
})

interface IProps {
	details: StateEntityDetailsResponseComponentDetails
}

const ComponentDetails: React.FC<IProps> = ({ details }) => {
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
						{intl.formatMessage(messages.package_address)}
					</Text>
				}
				rightData={<Text size="xsmall">{details.package_address}</Text>}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.blueprint_name)}
					</Text>
				}
				rightData={<Text size="xsmall">{details.blueprint_name}</Text>}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.blueprint_version)}
					</Text>
				}
				rightData={<Text size="xsmall">{details.blueprint_version}</Text>}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.royalty_vault_balance)}
					</Text>
				}
				rightData={
					<Text size="xsmall">
						{intl.formatNumber(parseFloat(details.royalty_vault_balance) || 0, {
							style: 'decimal',
							maximumFractionDigits: 8,
						})}
					</Text>
				}
			/>
		</Box>
	)
}

export default ComponentDetails
