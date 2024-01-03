import type { StateNonFungibleDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { CardButtons } from 'ui/src/components/card-buttons'
import FieldValue from 'ui/src/components/field-value'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { NftImageIcon } from 'ui/src/components/nft-image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { findFieldValue } from 'ui/src/services/metadata'

import * as styles from './styles.css'

const IGNORE_DATA = ['name', 'description']

const messages = defineMessages({
	back: {
		id: 'cyR7Kh',
		defaultMessage: 'Back',
	},
	burned: {
		id: '1mSRaL',
		defaultMessage: '(burned)',
	},
	data: {
		id: 'Lv0zJu',
		defaultMessage: 'Details',
	},
})

interface IProps {
	nft: StateNonFungibleDetailsResponseItem & { collection: string }
}

const Nft: React.FC<IProps> = ({ nft }) => {
	const intl = useIntl()

	const dataJson = nft.data.programmatic_json as any
	const name = findFieldValue('name', dataJson?.fields)
	const description = findFieldValue('description', dataJson?.fields)

	const fields = useMemo(
		() => (nft?.data.programmatic_json as any)?.fields?.filter(field => !IGNORE_DATA.includes(field.field_name)) || [],
		[nft],
	)

	return (
		<Box flexShrink={0}>
			<Box display="flex" flexDirection="column" alignItems="center">
				<Box className={styles.nftIconWrapper}>
					<NftImageIcon
						address={nft.collection}
						id={nft.non_fungible_id}
						size="xlarge"
						className={styles.nftIcon}
						backgroundColor="transparent"
					/>
				</Box>
				<Box display="flex" flexDirection="column" gap="small">
					<ToolTip message={nft.non_fungible_id}>
						<Box>
							<Text size="xlarge" weight="strong" color="strong" align="center">
								{`${name} ${nft.is_burned === true ? intl.formatMessage(messages.burned) : ''}`}
							</Text>
						</Box>
					</ToolTip>
					{description && <Text size="small">{description}</Text>}
				</Box>

				<Box display="flex" paddingTop="large" gap="large" position="relative">
					<CardButtons />
				</Box>

				<Box className={styles.tokenSummaryWrapper}>
					{fields.length > 0 && (
						<Box display="flex" flexDirection="column">
							<Box>
								<Text size="large" weight="medium" color="strong">
									{intl.formatMessage(messages.data)}
								</Text>
							</Box>
							{fields.map(field => (
								<AccountsTransactionInfo
									key={field.field_name}
									leftTitle={
										<Box display="flex" alignItems="flex-end" gap="xsmall">
											<Text size="xxsmall" color="strong" weight="medium">
												{(field.field_name || ('' as string)).toUpperCase()}
											</Text>
										</Box>
									}
									rightData={
										<Box display="flex" alignItems="flex-end" className={styles.tokenSummaryRightMaxWidth}>
											<FieldValue field={field} />
										</Box>
									}
								/>
							))}
						</Box>
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Nft
