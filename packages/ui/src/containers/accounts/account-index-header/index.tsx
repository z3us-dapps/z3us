import { useGlobalResourceBalances } from 'packages/ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import { formatBigNumber } from 'packages/ui/src/utils/formatters'
import React from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { SearchIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'

import * as styles from './account-index-header.css'

export const AccountIndexHeader = () => {
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const { pathname } = useLocation()
	const { totalValue, isLoading } = useGlobalResourceBalances()

	return (
		<Box className={styles.accountIndexWrapper}>
			<Box display="flex" width="full">
				<Box flexGrow={1}>
					<Box display="flex" alignItems="center" paddingBottom="medium" flexGrow={0}>
						<Box>
							<Text size="large">
								<Translation capitalizeFirstLetter text="accounts.home.accountBalanceTitle" />
							</Text>
						</Box>
					</Box>
					<Box display="flex" alignItems="center" gap="small">
						<Box flexGrow={1}>
							<Text weight="medium" size="xxxlarge" color="strong" truncate>
								{isLoading ? 'Loading...' : formatBigNumber(totalValue, currency, 2)}
							</Text>
						</Box>
						<ToolTip message="global.search">
							<Button to={`${pathname}?query=hello`} styleVariant="ghost" sizeVariant="small" iconOnly>
								<SearchIcon />
							</Button>
						</ToolTip>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
