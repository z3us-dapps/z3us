import React from 'react'

import { Box } from 'ui/src/components/box'
import Text, { type TextProps } from 'ui/src/components/typography/text'
import { useTotalBalance } from 'ui/src/hooks/dapp/use-total-balance'

import * as styles from './styles.css'

export const AccountTotalValue: React.FC = () => {
	const { isLoading, formattedValue, formattedChange, changeStatusTextColor } = useTotalBalance()

	return (
		<Box className={styles.assetsHeaderWrapper}>
			<Box flexGrow={1} display="flex" flexDirection="column" gap="xxsmall">
				<Box display="flex" alignItems="center" gap="medium">
					<Text weight="medium" size="xxxlarge" color="strong" truncate>
						{isLoading ? 'Loading ...' : formattedValue}
					</Text>
				</Box>
				<Text size="xxsmall" weight="medium" truncate color={changeStatusTextColor}>
					{formattedChange}
				</Text>
			</Box>
		</Box>
	)
}
