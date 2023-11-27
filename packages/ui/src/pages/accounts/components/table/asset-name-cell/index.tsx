import clsx from 'clsx'
import { ToolTip } from 'packages/ui/src/components/tool-tip'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { ResourceBalance, ResourceBalanceKind } from 'ui/src/types'
import { ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

export const AssetNameCell: React.FC<IProps> = props => {
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
	} = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const intl = useIntl()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const a = amount
		? intl.formatNumber(Number.parseFloat(amount), {
				style: 'decimal',
				maximumFractionDigits: 18,
		  })
		: ''

	const displayName = symbol ? `${symbol.toUpperCase()} - ${name}` : name

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'large' }} address={value} toolTipEnabled />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<ToolTip side="top" message={displayName}>
							<Box>
								<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
									{displayName}
								</Text>
							</Box>
						</ToolTip>
						{amount && (
							<Box>
								<Text capitalizeFirstLetter size="xsmall" truncate className={styles.assetNameCellBalanceWrapper}>
									{a}
								</Text>
							</Box>
						)}
					</Box>
					{type === ResourceBalanceType.FUNGIBLE && (
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
