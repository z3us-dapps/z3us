import clsx from 'clsx'
import React from 'react'
import { FormattedNumber } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types/types'

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
	const { symbol, name, amount, change, value: tokenValue } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const isMobile = useIsMobileWidth()

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={isMobile ? 'large' : 'xlarge'} address={value} />
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
							{amount && <FormattedNumber value={amount.toNumber()} style="currency" maximumFractionDigits={8} />}
						</Text>
					</Box>
					<Box className={styles.assetNameCellPriceWrapper}>
						<Box className={styles.assetNameCellPriceTextWrapper}>
							<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium" align="right">
								{tokenValue && (
									<FormattedNumber value={tokenValue.toNumber()} style="currency" maximumFractionDigits={8} />
								)}
							</Text>
							<RedGreenText
								changeStatus="positive"
								capitalizeFirstLetter
								size="xsmall"
								color="strong"
								truncate
								weight="medium"
								align="right"
							>
								{change && <FormattedNumber value={change.toNumber()} style="percent" maximumFractionDigits={2} />}
							</RedGreenText>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
