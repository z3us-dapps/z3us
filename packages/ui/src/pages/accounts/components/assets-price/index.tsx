import { useGlobalResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { EyeIcon, EyeOffIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { TextScramble } from 'ui/src/components/text-scramble'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

export const AssetsPrice: React.FC = () => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { totalValue, isLoading } = useGlobalResourceBalances()
	const [hidden, setHidden] = useState<boolean>(false)

	const handleToggleHidden = () => {
		setHidden(!hidden)
	}

	return (
		<Box className={styles.assetsHeaderWrapper}>
			<Box display="flex" width="full">
				<Box flexGrow={1}>
					<Box display="flex" alignItems="center" gap="small">
						<Box flexGrow={1} display="flex" flexDirection="column" gap="xxsmall">
							<Box display="flex" alignItems="center" gap="medium">
								<TextScramble scramble={hidden}>
									<Text weight="medium" size="xxxlarge" color="strong" truncate blur={hidden}>
										{isLoading ? 'Loading...' : `${formatBigNumber(totalValue, currency, 2)}`}
									</Text>
								</TextScramble>
								<ToolTip message={hidden ? 'accounts.home.accountShowBalance' : 'accounts.home.accountHideBalance'}>
									<Button onClick={handleToggleHidden} styleVariant="ghost" sizeVariant="small" iconOnly>
										{hidden ? <EyeIcon /> : <EyeOffIcon />}
									</Button>
								</ToolTip>
							</Box>
							<TextScramble scramble={hidden}>
								<Text size="xxsmall" color="green" weight="medium">
									+$0.39 (+0.29%)
								</Text>
							</TextScramble>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
