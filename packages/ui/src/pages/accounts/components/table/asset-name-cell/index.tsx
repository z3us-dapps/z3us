import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Text } from 'ui/src/components/typography'
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
	const { symbol, name } = original as ResourceBalance[ResourceBalanceType.FUNGIBLE]

	const isMobile = useIsMobileWidth()

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<ResourceImageIcon size={isMobile ? 'large' : 'xlarge'} address={value} />
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<Text className="tr-text-elem" capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
							{symbol && `${symbol.toUpperCase()} - `}
							{name}
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
