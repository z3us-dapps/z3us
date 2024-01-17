import clsx from 'clsx'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import * as plainButtonStyles from 'ui/src/components/styles/plain-button-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { RedGreenText } from 'ui/src/components/typography'
import Text from 'ui/src/components/typography/text'
import { useTotalBalance } from 'ui/src/hooks/dapp/use-total-balance'

import * as styles from './styles.css'

export const AccountTotalValue: React.FC = () => {
	const { isLoading, formattedXrdValue, formattedValue, formattedChange, value, xrdValue, change } = useTotalBalance()

	const [format, setFormat] = useState<'currency' | 'xrd'>('currency')

	const handleToggleValue = () => {
		setFormat(format === 'currency' ? 'xrd' : 'currency')
	}

	if (isLoading) {
		return <FallbackLoading />
	}

	return (
		<Box className={styles.assetsHeaderWrapper}>
			<Box flexGrow={1} display="flex" flexDirection="column" gap="xxsmall">
				<Box>
					<ToolTip message={format === 'currency' ? value : xrdValue}>
						<Box
							component="button"
							onClick={handleToggleValue}
							className={clsx(styles.totalValueWrapper, plainButtonStyles.plainButtonHoverWrapper)}
						>
							<Text weight="strong" size="xxxlarge" color="strong" truncate>
								{format === 'currency' ? formattedValue : `${formattedXrdValue} XRD`}
							</Text>
						</Box>
					</ToolTip>
				</Box>
				<RedGreenText size="xxsmall" weight="medium" truncate change={change}>
					{formattedChange}
				</RedGreenText>
			</Box>
		</Box>
	)
}
