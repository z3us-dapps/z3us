import type { StateEntityDetailsResponseFungibleVaultDetails } from '@radixdlt/babylon-gateway-api-sdk'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { DECIMAL_STYLES } from 'ui/src/constants/number'

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
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.resource_address)}
					</Text>
				}
				rightData={
					<Box display="flex" alignItems="flex-end" className={styles.tokenSummaryRightMaxWidth}>
						<Text size="xxsmall" truncate>
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
					<Text size="xxsmall" color="strong" weight="medium">
						{intl.formatMessage(messages.balance)}
					</Text>
				}
				rightData={
					<ToolTip message={details.balance.amount}>
						<Box>
							<Text size="xxsmall" truncate>
								{intl.formatNumber(parseFloat(details.balance.amount) || 0, DECIMAL_STYLES)}
							</Text>
						</Box>
					</ToolTip>
				}
			/>
		</Box>
	)
}

export default FungibleVaultDetails
