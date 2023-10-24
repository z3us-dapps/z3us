import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { LockIcon } from 'ui/src/components/icons'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { SlideOutDialog } from 'ui/src/components/layout/slide-out-dialog'
import MetadataValue from 'ui/src/components/metadata-value'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { getStringMetadata } from 'ui/src/services/metadata'

import * as styles from '../transaction/styles.css'

const messages = defineMessages({
	metadata: {
		defaultMessage: 'Metadata',
		id: '8Q504V',
	},
	close: {
		defaultMessage: 'Close',
		id: 'rbrahO',
	},
})

export const QueryResult = () => {
	const intl = useIntl()
	const location = useLocation()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()

	const resourceId = searchParams.get('query')
	const isVisible = !!resourceId

	const { data, isLoading } = useEntityDetails(resourceId)

	const name = getStringMetadata('name', data?.metadata?.items)
	const description = getStringMetadata('description', data?.metadata?.items)

	const navigateBack = () => {
		const [, params] = location.search.split('?')
		const query = new URLSearchParams(params)
		query.delete('query')
		navigate(`${location.pathname}?${query}`)
	}

	return (
		<SlideOutDialog open={isVisible} onClose={navigateBack}>
			{isLoading ? (
				<FallbackLoading />
			) : (
				<>
					<Box display="flex" flexDirection="column" alignItems="center">
						<Box paddingBottom="small">
							<ResourceImageIcon address={resourceId} />
						</Box>
						<Text size="xlarge" weight="strong" color="strong" align="center">
							{name}
						</Text>
						<Text size="xxsmall">{description}</Text>
					</Box>
					<Box className={styles.transactionDetailsWrapper}>
						<Box display="flex" flexDirection="column">
							<Box paddingTop="xlarge">
								<Text size="large" weight="medium" color="strong">
									{intl.formatMessage(messages.metadata)}
								</Text>
							</Box>
							{data?.metadata.items.map(item => (
								<AccountsTransactionInfo
									key={item.key}
									leftTitle={
										<Box display="flex" alignItems="flex-end" gap="xsmall">
											<Box>
												<Box>{item.is_locked === true && <LockIcon />}</Box>
											</Box>
											<Text size="xxsmall" color="strong" weight="medium">
												{(item.key as string).toUpperCase()}
											</Text>
										</Box>
									}
									rightData={
										<Box display="flex" alignItems="flex-end">
											<MetadataValue value={item} />
										</Box>
									}
								/>
							))}
						</Box>
					</Box>
				</>
			)}
		</SlideOutDialog>
	)
}
