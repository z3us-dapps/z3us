import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText } from 'ui/src/components/typography'
import { PERCENTAGE_STYLES } from 'ui/src/constants/number'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useToken } from 'ui/src/hooks/queries/tokens'
import type { ResourceBalance, ResourceBalanceKind } from 'ui/src/types'
import { ResourceBalanceType } from 'ui/src/types'

import * as styles from '../asset-change-cell/styles.css'
import { getStakedAmount, getUnStakeAmount } from '../validator-cell'

interface IProps {
	row?: { original: ResourceBalanceKind }
}

export const ValidatorChangeCell: React.FC<IProps> = props => {
	const {
		row: { original },
	} = props
	const { validator, address, amount, change, ids, type } =
		original as ResourceBalance[ResourceBalanceType.FUNGIBLE] & {
			ids?: string[]
		}

	const intl = useIntl()
	const { data, isLoading } = useEntityDetails(validator)
	const { data: tokenData, isLoading: isLoadingResource } = useEntityDetails(address)
	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()
	const { data: token, isLoading: isLoadingToken } = useToken(knownAddresses?.resourceAddresses.xrd)
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

	const tokenChange = useMemo(() => {
		if (type === ResourceBalanceType.FUNGIBLE) return change
		return xrdAmount.mul(token.price.usd.change).toNumber()
	}, [change, xrdAmount, token])

	if (isLoading || isLoadingResource || isLoadingToken || isLoadingKnownAddresses) return <FallbackLoading />

	return (
		<Box className={styles.assetStatisticCellWrapper}>
			<ToolTip message={tokenChange}>
				<Box className={clsx(styles.assetStatisticCellContentWrapper, 'td-cell')}>
					<RedGreenText size="small" change={tokenChange} truncate>
						{intl.formatNumber(tokenChange, { signDisplay: 'exceptZero', ...PERCENTAGE_STYLES })}
					</RedGreenText>
				</Box>
			</ToolTip>
		</Box>
	)
}
