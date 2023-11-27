import type { FungibleResourcesCollectionItemVaultAggregated } from '@radixdlt/babylon-gateway-api-sdk'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

const ZERO = decimal(0).value

interface IProps {
	row?: { original: ResourceBalanceKind }
}

export const PoolChangeCell: React.FC<IProps> = props => {
	const {
		row: { original },
	} = props
	const { pool } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const intl = useIntl()

	const [before, setBefore] = useState<Date>(new Date())
	useEffect(() => {
		before.setDate(before.getDate() - 1)
		before.setHours(0, 0, 0, 0)
		setBefore(before)
	}, [])

	const { data: poolDataNow, isLoading: isLoadingNow } = useEntityDetails(pool)
	const { data: poolDataBefore, isLoading: isLoadingBefore } = useEntityDetails(pool, undefined, undefined, before)

	const totalValueNow = useMemo(
		() =>
			poolDataNow?.fungible_resources.items.reduce(
				(total, { vaults }: FungibleResourcesCollectionItemVaultAggregated) =>
					total.add(vaults.items.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO)),
				ZERO,
			),
		[poolDataNow],
	)

	const totalValueBefore = useMemo(
		() =>
			poolDataBefore?.fungible_resources.items.reduce(
				(total, { vaults }: FungibleResourcesCollectionItemVaultAggregated) =>
					total.add(vaults.items.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO)),
				ZERO,
			),
		[poolDataBefore],
	)

	const change = useMemo(
		() =>
			!totalValueNow || !totalValueBefore ? 0 : totalValueNow.sub(totalValueBefore).div(totalValueBefore).toNumber(),
		[totalValueNow, totalValueBefore],
	)

	if (isLoadingNow || isLoadingBefore) return <FallbackLoading />

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<Text size="small" color={change && change > 0 ? 'green' : 'red'} truncate>
					{intl.formatNumber(change, {
						style: 'percent',
						maximumFractionDigits: 2,
					})}
				</Text>
			</Box>
		</Box>
	)
}
