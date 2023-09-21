import { ScryptoSborValue, StateNonFungibleDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { NftImageIcon } from 'ui/src/components/nft-image-icon'
import { Text } from 'ui/src/components/typography'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { getStringNftData } from 'ui/src/services/metadata'

import FieldValue from '../../resource-details/field-value'
import * as styles from './styles.css'

interface IProps {
	value?: ScryptoSborValue
	row?: { original: StateNonFungibleDetailsResponseItem & { collection: string } }
}

export const NftDataCell: React.FC<IProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const isMobile = useIsMobileWidth()

	const dataJson = value?.programmatic_json as any
	const name = getStringNftData('name', dataJson?.fields)

	return (
		<Box className={styles.assetNameCellWrapper}>
			<Box className={clsx(styles.assetNameCellContentWrapper, 'td-cell')}>
				<NftImageIcon
					id={original.non_fungible_id}
					size={isMobile ? 'large' : 'xlarge'}
					address={original.collection}
				/>
				<Box className={styles.assetNameCellStatsWrapper}>
					<Box className={styles.assetNameCellNameWrapper}>
						<Text className="tr-text-elem" capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
							<FieldValue field={name} />
						</Text>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
