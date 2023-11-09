import type { StateEntityDetailsResponseComponentDetails } from '@radixdlt/babylon-gateway-api-sdk'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'

import * as styles from '../styles.css'

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
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.package_address)}
					</Text>
				}
				rightData={
					<Box display="flex" alignItems="flex-end" className={styles.tokenSummaryRightMaxWidth}>
						<Text size="xxsmall" truncate>
							{details.package_address}
						</Text>
						<CopyAddressButton
							styleVariant="ghost"
							sizeVariant="xsmall"
							address={details.package_address}
							iconOnly
							rounded={false}
							tickColor="colorStrong"
						/>
					</Box>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.blueprint_name)}
					</Text>
				}
				rightData={
					<Text size="xxsmall" truncate>
						{details.blueprint_name}
					</Text>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.blueprint_version)}
					</Text>
				}
				rightData={
					<Text size="xxsmall" truncate>
						{details.blueprint_version}
					</Text>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.royalty_vault_balance)}
					</Text>
				}
				rightData={
					<ToolTip
						message={intl.formatNumber(parseFloat(details.royalty_vault_balance) || 0, {
							style: 'decimal',
							maximumFractionDigits: 18,
						})}
					>
						<Box>
							<Text size="xxsmall" truncate>
								{intl.formatNumber(parseFloat(details.royalty_vault_balance) || 0, {
									style: 'decimal',
									maximumFractionDigits: 18,
								})}
							</Text>
						</Box>
					</ToolTip>
				}
			/>
		</Box>
	)
}

export default ComponentDetails
