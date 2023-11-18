import type { ScryptoSborValue, StateNonFungibleDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { NftImageIcon } from 'ui/src/components/nft-image-icon'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { findFieldValue } from 'ui/src/services/metadata'
import { getShortAddress } from 'ui/src/utils/string-utils'

import * as styles from './styles.css'

interface IProps {
	value?: ScryptoSborValue
	row?: { original: StateNonFungibleDetailsResponseItem & { collection: string } }
}

export const NftNameCell: React.FC<IProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const dataJson = value?.programmatic_json as any
	const name = findFieldValue('name', dataJson?.fields)

	return (
		<Box className={styles.nftNameCellWrapper}>
			<Box className={clsx(styles.nftNameCellContentWrapper, 'td-cell')}>
				<NftImageIcon
					id={original.non_fungible_id}
					size={{ mobile: 'large', tablet: 'xlarge' }}
					address={original.collection}
				/>
				<Box className={styles.nftNameCellStatsWrapper}>
					<Box className={styles.nftNameCellNameWrapper}>
						<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
							{name}
						</Text>

						<ToolTip message={original.non_fungible_id}>
							<Box className={styles.nftNameCellNameIdWrapper}>
								<Text capitalizeFirstLetter size="xsmall" truncate weight="medium">
									{getShortAddress(original.non_fungible_id, 10)}
								</Text>
							</Box>
						</ToolTip>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
