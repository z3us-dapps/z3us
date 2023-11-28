import clsx from 'clsx'
import React from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
import type { ResourceBalance, ResourceBalanceKind, ResourceBalanceType } from 'ui/src/types'

import * as styles from './styles.css'

interface IProps {
	value?: string
	row?: { original: ResourceBalanceKind }
}

export const NFTCollectionNameCell: React.FC<IProps> = props => {
	const intl = useIntl()

	const {
		value,
		row: { original },
	} = props
	const { symbol, name, amount } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]
	const a = amount
		? intl.formatNumber(Number.parseFloat(amount), {
				style: 'decimal',
				maximumFractionDigits: 18,
		  })
		: ''

	return (
		<Box className={styles.nftCollectionNameCellWrapper}>
			<Box className={clsx(styles.nftCollectionNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={{ mobile: 'large', tablet: 'xlarge' }} address={value} />
				<Box className={styles.nftCollectionNameCellStatsWrapper}>
					<Box className={styles.nftCollectionNameCellNameWrapper}>
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
									className={styles.nftCollectionNameCellBalanceWrapper}
								>
									{a}
								</Text>
							</Box>
						)}
					</Box>
					<Box className={styles.nftCollectionNameCellPriceWrapper}>
						<Box className={styles.nftCollectionNameCellPriceTextWrapper} />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
