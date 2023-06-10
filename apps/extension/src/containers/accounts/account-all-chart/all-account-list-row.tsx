/* eslint-disable  @typescript-eslint/no-unused-vars, react/no-array-index-key */
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { CopyAddressButton } from '@src/components/copy-address-button'
import { getShortAddress } from '@src/utils/string-utils'

import * as styles from './account-all-chart.css'

interface IAllAccountListRowProps {}

export const AllAccountListRow: React.FC<IAllAccountListRowProps> = props => {
	// TODO: temp
	const accountAddress =
		'ardx1qspt0lthflcd45zhwvrxkqdrv5ne5avsgarjcpfatyw7n7n93v38dhcdtlag0sdfalksjdhf7d8f78d7f8d7f8d7f8d7f'

	return (
		<Box className={styles.addressInfoWrapper}>
			<Box className={styles.addressInfoWrapperLeft}>
				<Box display="flex" alignItems="center">
					<Box className={styles.accountDotBg} />
					<Box marginRight="xsmall">
						<Text size="xsmall" color="strong" truncate>
							Defi savings account Defi savings account Defi savings account
							{getShortAddress(accountAddress)}
						</Text>
					</Box>
					<CopyAddressButton
						styleVariant="ghost"
						sizeVariant="xsmall"
						address={accountAddress}
						iconOnly
						rounded={false}
						tickColor="colorStrong"
					/>
				</Box>
			</Box>
			<Box className={styles.dottedSpacer} />
			<Box className={styles.addressInfoWrapperRight}>
				<Text size="xsmall" truncate>
					$51,234,51,234,51,234
				</Text>
			</Box>
		</Box>
	)
}
