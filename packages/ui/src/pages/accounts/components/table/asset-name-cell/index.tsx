import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

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
	const { symbol, name, amount, change, value: tokenValue } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'xlarge' }} address={value} />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
							{symbol && `${symbol.toUpperCase()} - `}
							{name}
						</Text>
						<Text
							capitalizeFirstLetter
							size="xsmall"
							truncate
							weight="strong"
							className={styles.assetNameCellBalanceWrapper}
						>
							{amount &&
								intl.formatNumber(amount, {
									style: 'decimal',
									maximumFractionDigits: 8,
								})}
						</Text>
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
