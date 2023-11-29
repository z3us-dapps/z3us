import type {
	FungibleResourcesCollectionItemVaultAggregated,
	StateEntityDetailsResponseFungibleResourceDetails,
	StateEntityDetailsResponseItem,
} from '@radixdlt/babylon-gateway-api-sdk'
import type { KnownAddresses } from '@radixdlt/radix-engine-toolkit'
import { decimal } from '@radixdlt/radix-engine-toolkit'
import clsx from 'clsx'
import { useKnownAddresses } from 'packages/ui/src/hooks/dapp/use-known-addresses'
import React, { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { ResourceSnippet } from 'ui/src/components/snippet/resource'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

export const ZERO = decimal(0).value

export const getStakedAmount = (data: StateEntityDetailsResponseItem, knownAddresses: KnownAddresses) =>
	data?.fungible_resources.items
		.filter(({ resource_address }) => resource_address === knownAddresses?.resourceAddresses.xrd)
		.reduce(
			(total, { vaults }: FungibleResourcesCollectionItemVaultAggregated) =>
				total.add(
					vaults.items
						.filter(({ vault_address }) => vault_address === (data.details as any).state.stake_xrd_vault.entity_address)
						.reduce((sum, { amount: vaultAmount }) => sum.add(decimal(vaultAmount).value), ZERO),
				),
			ZERO,
		) || ZERO

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

export const ValidatorCell: React.FC<IProps> = props => {
	const {
		value,
		row: { original },
	} = props
	const { validator, amount, change, value: tokenValue } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const intl = useIntl()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const { data: tokenData, isLoading } = useEntityDetails(value)
	const { data, isLoading: isLoadingValidator } = useEntityDetails(validator)
	const { data: knownAddresses, isLoading: isLoadingKnownAddresses } = useKnownAddresses()

	const name = findMetadataValue('name', data?.metadata?.items)

	const liq = useMemo(() => {
		const stakedAmount = getStakedAmount(data, knownAddresses)

		return decimal(amount)
			.value.div((tokenData?.details as StateEntityDetailsResponseFungibleResourceDetails)?.total_supply || 0)
			.mul(stakedAmount)
	}, [data, knownAddresses])

	if (isLoading || isLoadingValidator || isLoadingKnownAddresses) return <FallbackLoading />

	if (tokenData?.details.type === 'NonFungibleResource') {
		return (
			<Box className={styles.assetNameCellWrapper}>
				<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
					<ResourceImageIcon size={{ mobile: 'large', tablet: 'large' }} address={value} />
					<Box className={styles.assetNameCellStatsWrapper}>
						<Box className={styles.assetNameCellNameWrapper}>
							<ToolTip message={name}>
								<Box>
									<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
										{name}
									</Text>
								</Box>
							</ToolTip>
							{amount && (
								<Box>
									<Text capitalizeFirstLetter size="xsmall" truncate className={styles.assetNameCellBalanceWrapper}>
										{intl.formatNumber(Number.parseFloat(amount), {
											style: 'decimal',
											maximumFractionDigits: 18,
										})}
									</Text>
								</Box>
							)}
						</Box>
						<Box className={styles.assetNameCellPriceWrapper}>
							<Box className={styles.assetNameCellPriceTextWrapper}>
								<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium" align="right">
									{tokenValue &&
										intl.formatNumber(tokenValue, {
											style: 'currency',
											currency,
										})}
								</Text>
								<RedGreenText
									change={change}
									capitalizeFirstLetter
									size="xsmall"
									color="strong"
									truncate
									weight="medium"
									align="right"
								>
									{change &&
										intl.formatNumber(change, {
											style: 'percent',
											maximumFractionDigits: 2,
										})}
								</RedGreenText>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		)
	}

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'large' }} address={value} />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<ToolTip message={name}>
							<Box>
								<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
									{name}
								</Text>
							</Box>
						</ToolTip>
						{amount && (
							<Box>
								<Text capitalizeFirstLetter size="xsmall" truncate className={styles.assetNameCellBalanceWrapper}>
									{intl.formatNumber(Number.parseFloat(amount), {
										style: 'decimal',
										maximumFractionDigits: 18,
									})}
								</Text>
							</Box>
						)}
					</Box>
					<Box className={styles.assetNameCellPriceWrapper}>
						<Box className={styles.assetNameCellPriceTextWrapper}>
							<ToolTip message={amount}>
								<Box display="flex" gap="xsmall" width="full">
									<Box display="flex" flexShrink={0}>
										<ResourceSnippet address={value} size="small" /> &nbsp;-{' '}
									</Box>
									<Text size="small" color="strong" truncate>
										{intl.formatNumber(Number.parseFloat(amount), {
											style: 'decimal',
											maximumFractionDigits: 18,
										})}
									</Text>
								</Box>
							</ToolTip>
							<ToolTip message={liq.toString()}>
								<Box display="flex" gap="xsmall" width="full">
									<Box display="flex" flexShrink={0}>
										<ResourceSnippet address={knownAddresses.resourceAddresses.xrd} size="small" /> &nbsp;-{' '}
									</Box>
									<Text size="small" color="strong" truncate>
										{intl.formatNumber(liq.toNumber(), {
											style: 'decimal',
											maximumFractionDigits: 18,
										})}
									</Text>
								</Box>
							</ToolTip>
						</Box>
					</Box>
					<Box className={styles.assetNameCellPriceWrapper}>
						<Box className={styles.assetNameCellPriceTextWrapper}>
							<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium" align="right">
								{tokenValue &&
									intl.formatNumber(tokenValue, {
										style: 'currency',
										currency,
									})}
							</Text>
							<RedGreenText
								change={change}
								capitalizeFirstLetter
								size="xsmall"
								color="strong"
								truncate
								weight="medium"
								align="right"
							>
								{change &&
									intl.formatNumber(change, {
										style: 'percent',
										maximumFractionDigits: 2,
									})}
							</RedGreenText>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
