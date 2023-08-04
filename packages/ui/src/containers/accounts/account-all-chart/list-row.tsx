import type BigNumber from 'bignumber.js'
import { ToolTip } from 'packages/ui/src/components/tool-tip'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface IProps {
	symbol?: string
	name: string
	address: string
	value: BigNumber
}

export const ListRow: React.FC<IProps> = ({ address, symbol, name, value }) => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	return (
		<Box className={styles.addressInfoWrapper}>
			<Box className={styles.addressInfoWrapperLeft}>
				<Box display="flex" alignItems="center">
					<Box className={styles.accountDotBg} />
					<ToolTip message={name}>
						<Box marginRight="xsmall">
							<Text size="xsmall" color="strong" truncate>
								{symbol || name}
							</Text>
						</Box>
					</ToolTip>
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
					{formatBigNumber(value, currency, 2)}
				</Text>
			</Box>
		</Box>
	)
}
