import type { StateEntityDetailsResponsePackageDetails } from '@radixdlt/babylon-gateway-api-sdk'
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
	vm_type: {
		id: '/+CdTX',
		defaultMessage: 'VM type',
	},
	royalty_vault_balance: {
		id: 'LdPPhL',
		defaultMessage: 'Royalty vault balance',
	},
	blueprints: {
		id: 'VzWTJu',
		defaultMessage: 'Blueprints',
	},
})

interface IProps {
	details: StateEntityDetailsResponsePackageDetails
}

const PackageDetails: React.FC<IProps> = ({ details }) => {
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
						{intl.formatMessage(messages.vm_type)}
					</Text>
				}
				rightData={
					<Text size="xxsmall" truncate>
						{details.vm_type}
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
					<ToolTip message={intl.formatNumber(parseFloat(details.royalty_vault_balance) || 0, TOOLTIP_DECIMAL_STYLES)}>
						<Box>
							<Text size="xxsmall" truncate>
								{intl.formatNumber(parseFloat(details.royalty_vault_balance) || 0, DECIMAL_STYLES)}
							</Text>
						</Box>
					</ToolTip>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.blueprints)}
					</Text>
				}
				rightData={
					<Text size="xxsmall" truncate>
						{intl.formatList(
							details.blueprints?.items.map(blueprint => `${blueprint.name} (${blueprint.version})`),
							{ type: 'conjunction' },
						)}
					</Text>
				}
			/>
		</Box>
	)
}

export default PackageDetails
