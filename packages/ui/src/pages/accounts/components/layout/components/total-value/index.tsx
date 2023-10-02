import React from 'react'

import { Box } from 'ui/src/components/box'
import { RedGreenText } from 'ui/src/components/typography'
import Text from 'ui/src/components/typography/text'
import { useTotalBalance } from 'ui/src/hooks/dapp/use-total-balance'

import * as styles from './styles.css'

export const AccountTotalValue: React.FC = () => {
	const { isLoading, formattedValue, formattedChange, changeStatus } = useTotalBalance()

	if (isLoading) {
		return null
	}

	return (
		<Box className={styles.assetsHeaderWrapper}>
			<Box flexGrow={1} display="flex" flexDirection="column" gap="xxsmall">
				<Box display="flex" alignItems="center" gap="medium">
					<Text weight="medium" size="xxxlarge" color="strong" truncate>
						{formattedValue}
					</Text>
				</Box>
				<RedGreenText size="xxsmall" weight="medium" truncate changeStatus={changeStatus}>
					{formattedChange}
				</RedGreenText>
			</Box>
		</Box>
	)
}
