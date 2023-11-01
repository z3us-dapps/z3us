import type { StateEntityDetailsResponseFungibleVaultDetails } from '@radixdlt/babylon-gateway-api-sdk'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { Text } from 'ui/src/components/typography'

import * as styles from '../styles.css'

const messages = defineMessages({
	title: {
		id: 'Lv0zJu',
		defaultMessage: 'Details',
	},
	resource_address: {
		id: 'paDdcH',
		defaultMessage: 'Resource address',
	},
	balance: {
		id: 'H5+NAX',
		defaultMessage: 'Balance',
	},
})

interface IProps {
	details: StateEntityDetailsResponseFungibleVaultDetails
}

const FungibleVaultDetails: React.FC<IProps> = ({ details }) => {
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
						{intl.formatMessage(messages.resource_address)}
					</Text>
				}
				rightData={
					<Box display="flex" alignItems="flex-end" className={styles.tokenSummaryRightMaxWidth}>
						<Text size="xsmall" truncate>
							{details.resource_address}
						</Text>
						<CopyAddressButton
							styleVariant="ghost"
							sizeVariant="xsmall"
							address={details.resource_address}
							iconOnly
							rounded={false}
							tickColor="colorStrong"
						/>
					</Box>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.balance)}
					</Text>
				}
				rightData={
					<Text size="xsmall">
						{intl.formatNumber(parseFloat(details.balance.amount) || 0, {
							style: 'decimal',
							maximumFractionDigits: 8,
						})}
					</Text>
				}
			/>
		</Box>
	)
}

export default FungibleVaultDetails
