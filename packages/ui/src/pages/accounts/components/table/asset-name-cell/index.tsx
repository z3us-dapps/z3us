import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useEntityDetails } from 'ui/src/hooks/dapp/use-entity-details'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { findMetadataValue } from 'ui/src/services/metadata'
import type { ResourceBalance, ResourceBalanceKind } from 'ui/src/types'
import { ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

export const AssetNameCell: React.FC<IProps> = props => {
	const intl = useIntl()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const {
		value,
		row: { original },
	} = props

	const {
		symbol,
		name,
		amount,
		change,
		value: tokenValue,
		type,
		validator,
		pool,
	} = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const { data: validatorData } = useEntityDetails(validator)
	const { data: poolData } = useEntityDetails(pool)

	const validatorName = findMetadataValue('name', validatorData?.metadata?.items)
	const poolName = findMetadataValue('name', poolData?.metadata?.items)

	const a = amount
		? intl.formatNumber(amount, {
				style: 'decimal',
				maximumFractionDigits: 18,
		  })
		: ''

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'xlarge' }} address={value} />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
							{validatorName && `${validatorName}`}
							{poolName && `${poolName}`}
							{!validatorName && !poolName && symbol ? `${symbol.toUpperCase()} - ${name}` : name}
						</Text>
						{amount && (
							<Box>
								<Text
									capitalizeFirstLetter
									size="xsmall"
									truncate
									weight="strong"
									className={styles.assetNameCellBalanceWrapper}
								>
									{a}
								</Text>
							</Box>
						)}
					</Box>
					{type === ResourceBalanceType.FUNGIBLE && !pool && (
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
					)}
				</Box>
			</Box>
		</Box>
	)
}
