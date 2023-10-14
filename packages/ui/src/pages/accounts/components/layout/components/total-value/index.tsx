import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { RedGreenText } from 'ui/src/components/typography'
import Text from 'ui/src/components/typography/text'
import { useTotalBalance } from 'ui/src/hooks/dapp/use-total-balance'

import * as styles from './styles.css'

export const AccountTotalValue: React.FC = () => {
	const { isLoading, formattedXrdValue, formattedValue, formattedChange, change } = useTotalBalance()

	const [value, setValue] = useState<'currency' | 'xrd'>('currency')

	const handleToggleValue = () => {
		setValue(value === 'currency' ? 'xrd' : 'currency')
	}

	if (isLoading) {
		return <FallbackLoading />
	}

	return (
		<Box className={styles.assetsHeaderWrapper}>
			<Box flexGrow={1} display="flex" flexDirection="column" gap="xxsmall">
				<Box
					display="flex"
					alignItems="flex-end"
					gap="medium"
					onClick={handleToggleValue}
					className={styles.totalValueWrapper}
				>
					<Text weight="medium" size="xxxlarge" color="strong" truncate>
						{value === 'currency' ? formattedValue : `${formattedXrdValue} XRD`}
					</Text>
				</Box>
				<RedGreenText size="xxsmall" weight="medium" truncate change={change}>
					{formattedChange}
				</RedGreenText>
			</Box>
		</Box>
	)
}
