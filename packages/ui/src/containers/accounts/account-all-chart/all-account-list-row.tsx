import type BigNumber from 'bignumber.js'
import { Amount } from 'packages/ui/src/components/amount'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { Text } from 'ui/src/components/typography'

import * as styles from './account-all-chart.css'

interface IAllAccountListRowProps {
	symbol: string
	address: string
	value: BigNumber
}

export const AllAccountListRow: React.FC<IAllAccountListRowProps> = ({ address, symbol, value }) => (
	<Box className={styles.addressInfoWrapper}>
		<Box className={styles.addressInfoWrapperLeft}>
			<Box display="flex" alignItems="center">
				<Box className={styles.accountDotBg} />
				<Box marginRight="xsmall">
					<Text size="xsmall" color="strong" truncate>
						{symbol}
					</Text>
				</Box>
				<CopyAddressButton
					styleVariant="ghost"
					sizeVariant="xsmall"
					address={address}
					iconOnly
					rounded={false}
					tickColor="colorStrong"
				/>
			</Box>
		</Box>
		<Box className={styles.dottedSpacer} />
		<Box className={styles.addressInfoWrapperRight}>
			<Text size="xsmall" truncate>
				<Amount value={value} />
			</Text>
		</Box>
	</Box>
)
