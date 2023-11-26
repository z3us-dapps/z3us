import clsx from 'clsx'
import React, { useMemo } from 'react'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceSnippet } from 'ui/src/components/snippet/resource'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'

import * as styles from './styles.css'

interface IProps {
	value?: string
}

export const PoolResourcesCell: React.FC<IProps> = props => {
	const { value } = props

	const { data, isLoading } = useEntityDetails(value)
	const resources = useMemo(
		() =>
			data?.details?.type === 'Component'
				? (data?.details?.state as any)?.vaults.map(vault => vault.resource_address) || []
				: [],
		[data],
	)

	if (isLoading) return <FallbackLoading />

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						{resources.map(resource => (
							<ResourceSnippet key={resource} address={resource} size="small" />
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
