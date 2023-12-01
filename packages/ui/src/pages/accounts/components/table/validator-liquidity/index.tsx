import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import { DECIMAL_STYLES } from 'ui/src/constants/number'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceSnippet } from 'ui/src/components/snippet/resource'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import type { ResourceBalance, ResourceBalanceKind } from 'ui/src/types'
import { ResourceBalanceType } from 'ui/src/types'

import { getStakedAmount, getUnStakeAmount } from '../validator-cell'
import * as styles from './styles.css'

interface IProps {
	row?: { original: ResourceBalanceKind }
}

export const ValidatorLiquidityCell: React.FC<IProps> = props => {
	const {
		row: { original },
	} = props
	const { amount, address, validator, ids, type } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE] & {
		ids?: string[]
	}

	const intl = useIntl()
	const { data, isLoading } = useEntityDetails(validator)
	const { data: tokenData, isLoading: isLoadingResource } = useEntityDetails(address)
	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()
	const { data: nfts = [] } = useNonFungiblesData(address, ids || [])

	const xrdAmount = useMemo(() => {
		if (type === ResourceBalanceType.FUNGIBLE) {
			const stakedAmount = getStakedAmount(data, knownAddresses)
			return decimal(amount)
				.value.div((tokenData?.details as StateEntityDetailsResponseFungibleResourceDetails)?.total_supply || 0)
				.mul(stakedAmount)
		}
		return getUnStakeAmount(nfts)
	}, [type, amount, data, tokenData, knownAddresses, nfts])

	if (isLoading || isLoadingResource || isLoadingKnownAddresses) return <FallbackLoading />

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
				<ToolTip message={amount}>
					<Box display="flex" gap="xsmall" width="full">
						<Box display="flex" flexShrink={0}>
							<ResourceSnippet address={address} size="small" /> &nbsp;-{' '}
						</Box>
						<Text size="small" color="strong" truncate>
							{intl.formatNumber(Number.parseFloat(amount), DECIMAL_STYLES)}
						</Text>
					</Box>
				</ToolTip>
				<ToolTip message={xrdAmount.toString()}>
					<Box display="flex" gap="xsmall" width="full">
						<Box display="flex" flexShrink={0}>
							<ResourceSnippet address={knownAddresses.resourceAddresses.xrd} size="small" /> &nbsp;-{' '}
						</Box>
						<Text size="small" color="strong" truncate>
							{intl.formatNumber(xrdAmount.toNumber(), DECIMAL_STYLES)}
						</Text>
					</Box>
				</ToolTip>
			</Box>
		</Box>
	)
}
