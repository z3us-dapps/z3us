import type { StateEntityDetailsResponseFungibleResourceDetails } from '@radixdlt/babylon-gateway-api-sdk'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { CURRENCY_STYLES, PERCENTAGE_STYLES } from 'ui/src/constants/number'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useKnownAddresses } from 'ui/src/hooks/dapp/use-known-addresses'
import { useXRDPriceOnDay } from 'ui/src/hooks/queries/coingecko'
import { useToken } from 'ui/src/hooks/queries/tokens'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { ResourceBalance, ResourceBalanceKind } from 'ui/src/types'
import { ResourceBalanceType } from 'ui/src/types'

import * as styles from '../styles.css'
import { getStakedAmount, getUnStakeAmount } from '../validator-liquidity'

interface IProps {
	row?: { original: ResourceBalanceKind }
}

export const ValidatorValueCell: React.FC<IProps> = props => {
	const {
		row: { original },
	} = props
	const {
		validator,
		address,
		amount,
		change,
		value: tokenValue,
		ids,
		type,
	} = original as ResourceBalance[ResourceBalanceType.FUNGIBLE] & { ids?: string[] }

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const intl = useIntl()
	const { data, isLoading } = useEntityDetails(validator)
	const { data: tokenData, isLoading: isLoadingResource } = useEntityDetails(address)
	const { data: nfts = [] } = useNonFungiblesData(address, ids || [])
	const { data: xrdPrice, isLoading: isLoadingPrice } = useXRDPriceOnDay(currency, new Date())
	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()
	const { data: token, isLoading: isLoadingToken } = useToken(knownAddresses?.resourceAddresses.xrd)

	const xrdAmount = useMemo(() => {
		if (type === ResourceBalanceType.FUNGIBLE) {
			const stakedAmount = getStakedAmount(data, knownAddresses)
			return decimal(amount)
				.value.div((tokenData?.details as StateEntityDetailsResponseFungibleResourceDetails)?.total_supply || 0)
				.mul(stakedAmount)
		}
		return getUnStakeAmount(nfts)
	}, [type, amount, data, tokenData, knownAddresses, nfts])

	const tokenPrice = useMemo(() => {
		if (type === ResourceBalanceType.FUNGIBLE) return tokenValue
		return xrdAmount.mul(xrdPrice || 0).toNumber()
	}, [tokenValue, xrdAmount, xrdPrice, token])

	const tokenChange = useMemo(() => {
		if (type === ResourceBalanceType.FUNGIBLE) return change
		return xrdAmount.mul(token.price.usd.change).toNumber()
	}, [change, xrdAmount, token])

	if (isLoading || isLoadingResource || isLoadingToken || isLoadingKnownAddresses || isLoadingPrice)
		return <FallbackLoading />

	return (
		<Box className={styles.cellWrapper}>
			<Box className={clsx(styles.cellContentWrapper, 'td-cell')}>
				<Box display="flex" flexDirection="column">
					<ToolTip message={tokenPrice}>
						<Box>
							<Text size="small" color="strong" weight="medium" align="right" truncate>
								{intl.formatNumber(tokenPrice, { currency, ...CURRENCY_STYLES })}
							</Text>
						</Box>
					</ToolTip>
					<RedGreenText
						change={tokenChange}
						capitalizeFirstLetter
						size="xsmall"
						color="strong"
						truncate
						weight="medium"
						align="right"
					>
						{tokenChange && intl.formatNumber(tokenChange, { signDisplay: 'exceptZero', ...PERCENTAGE_STYLES })}
					</RedGreenText>
				</Box>
			</Box>
		</Box>
	)
}
