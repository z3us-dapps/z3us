import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { RedGreenText, Text } from 'ui/src/components/typography'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

export const PoolUnitNameCell: React.FC<IProps> = props => {
	const intl = useIntl()

	const {
		value,
		row: { original },
	} = props
	const { symbol, name, amount, change } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]
	const a = amount
		? intl.formatNumber(amount, {
				style: 'decimal',
				maximumFractionDigits: 18,
		  })
		: ''

	return (
		<Box className={styles.poolUnitNameCellWrapper}>
			<Box className={clsx(styles.poolUnitNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'xlarge' }} address={value} />
				<Box className={styles.poolUnitNameCellStatsWrapper}>
					<Box className={styles.poolUnitNameCellNameWrapper}>
						<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
							{symbol && `${symbol.toUpperCase()} - `}
							{name}
						</Text>
						{amount && (
							<Box>
								<Text
									capitalizeFirstLetter
									size="xsmall"
									truncate
									weight="strong"
									className={styles.poolUnitNameCellBalanceWrapper}
								>
									{a}
								</Text>
							</Box>
						)}
					</Box>
					<Box className={styles.poolUnitNameCellPriceWrapper}>
						<Box className={styles.poolUnitNameCellPriceTextWrapper}>
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
