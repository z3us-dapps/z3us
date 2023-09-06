import React, { useMemo, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { EyeIcon, EyeOffIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { TextScramble } from 'ui/src/components/text-scramble'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useSelectedAccounts } from 'ui/src/hooks/dapp/use-accounts'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'
import { formatBigNumber, formatChange } from 'ui/src/utils/formatters'

import * as styles from './styles.css'

export const AccountTotalValue: React.FC = () => {
	const resourceType = useResourceType()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const selectedAccounts = useSelectedAccounts()
	const { totalValue, totalChange, fungibleValue, nonFungibleValue, fungibleChange, nonFungibleChange, isLoading } =
		useBalances(...selectedAccounts)

	const [hidden, setHidden] = useState<boolean>(false)

	const value = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleValue
		if (resourceType === 'tokens') return fungibleValue
		return totalValue
	}, [resourceType, totalValue, fungibleValue, nonFungibleValue])
	const change = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleChange
		if (resourceType === 'tokens') return fungibleChange
		return totalChange
	}, [resourceType, totalValue, fungibleValue, nonFungibleValue])

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
										{isLoading ? 'Loading...' : `${formatBigNumber(value, currency, 2)}`}
									</Text>
								</TextScramble>
								{/* TODO: */}
								{/* <ToolTip message={hidden ? 'accounts.home.accountShowBalance' : 'accounts.home.accountHideBalance'}>
									<Button onClick={handleToggleHidden} styleVariant="ghost" sizeVariant="small" iconOnly>
										{hidden ? <EyeIcon /> : <EyeOffIcon />}
									</Button>
								</ToolTip> */}
							</Box>
							<TextScramble scramble={hidden}>
								<Text size="xxsmall" weight="medium" color={change && change.gt(0) ? 'green' : 'red'} truncate>
									{formatChange(change)}
								</Text>
							</TextScramble>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
