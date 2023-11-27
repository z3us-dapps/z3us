import type {
	FungibleResourcesCollectionItemVaultAggregated,
	StateEntityDetailsResponseFungibleResourceDetails,
} from '@radixdlt/babylon-gateway-api-sdk'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import { useXRDPriceOnDay } from 'packages/ui/src/hooks/queries/coingecko'
import { useTokens } from 'packages/ui/src/hooks/queries/tokens'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
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
	const { pool, address } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const intl = useIntl()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const [before, setBefore] = useState<Date>(new Date())
	useEffect(() => {
		before.setDate(before.getDate() - 1)
		before.setHours(0, 0, 0, 0)
		setBefore(before)
	}, [])

	const { data: tokens, isLoading: isLoadingTokens } = useTokens()

	const { data: xrdPriceNow = 0 } = useXRDPriceOnDay(currency, new Date())
	const { data: xrdPriceBefore = 0 } = useXRDPriceOnDay(currency, before)

	const { data: tokenDataNow, isLoading: isLoadingTokenNow } = useEntityDetails(address)
	const { data: tokenDataBefore, isLoading: isLoadingTokenBefore } = useEntityDetails(
		address,
		undefined,
		undefined,
		before,
	)

	const { data: poolDataNow, isLoading: isLoadingPoolNow } = useEntityDetails(pool)
	const { data: poolDataBefore, isLoading: isLoadingPoolBefore } = useEntityDetails(pool, undefined, undefined, before)

	const totalValueNow = useMemo(() => {
		if (!tokenDataNow || !poolDataNow) return ZERO
		return poolDataNow?.fungible_resources.items
			.reduce(
				(total, { resource_address, vaults }: FungibleResourcesCollectionItemVaultAggregated) =>
					total.add(
						vaults.items
							.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO)
							.mul(tokens[resource_address]?.price || 0),
					),
				ZERO,
			)
			.div((tokenDataNow?.details as StateEntityDetailsResponseFungibleResourceDetails)?.total_supply)
	}, [poolDataNow, tokenDataNow, xrdPriceNow])

	const totalValueBefore = useMemo(() => {
		if (!tokenDataBefore || !poolDataBefore) return ZERO
		return poolDataBefore?.fungible_resources.items
			.reduce(
				(total, { resource_address, vaults }: FungibleResourcesCollectionItemVaultAggregated) =>
					total.add(
						vaults.items
							.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO)
							.mul(tokens[resource_address]?.price || 0),
					),
				ZERO,
			)
			.div((tokenDataBefore?.details as StateEntityDetailsResponseFungibleResourceDetails)?.total_supply)
	}, [poolDataBefore, tokenDataBefore, xrdPriceBefore])

	const change = useMemo(
		() => (totalValueBefore.gt(0) ? totalValueNow.sub(totalValueBefore).div(totalValueBefore).toNumber() : 0),
		[totalValueNow, totalValueBefore],
	)

	if (isLoadingTokens || isLoadingTokenNow || isLoadingTokenBefore || isLoadingPoolNow || isLoadingPoolBefore)
		return <FallbackLoading />

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<Text size="small" color={change > 0 ? 'green' : 'red'} truncate>
					{intl.formatNumber(change, {
						style: 'percent',
						maximumFractionDigits: 2,
					})}
				</Text>
			</Box>
		</Box>
	)
}
