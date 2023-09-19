import React, { useMemo, useState } from 'react'
import { useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { TextScramble } from 'ui/src/components/text-scramble'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'

import * as styles from './styles.css'

export const AccountTotalValue: React.FC = () => {
	const intl = useIntl()
	const resourceType = useResourceType()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const selectedAccounts = useSelectedAccounts()
	const {
		isLoading,
		totalValue,
		totalChange,
		fungibleValue,
		fungibleChange,
		nonFungibleValue,
		nonFungibleChange,
		liquidityPoolTokensValue,
		liquidityPoolTokensChange,
		poolUnitsValue,
		poolUnitsChange,
	} = useBalances(...selectedAccounts)

	const [hidden, setHidden] = useState<boolean>(false)

	const value = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleValue
		if (resourceType === 'tokens') return fungibleValue
		if (resourceType === 'lp-tokens') return liquidityPoolTokensValue
		if (resourceType === 'pool-units') return poolUnitsValue
		return totalValue
	}, [resourceType, totalValue, fungibleValue, nonFungibleValue])
	const change = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleChange
		if (resourceType === 'tokens') return fungibleChange
		if (resourceType === 'lp-tokens') return liquidityPoolTokensChange
		if (resourceType === 'pool-units') return poolUnitsChange
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
										{isLoading ? 'Loading...' : intl.formatNumber(value.toNumber(), { style: 'currency', currency })}
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
									{intl.formatNumber(change.toNumber(), { style: 'percent', maximumFractionDigits: 2 })}
								</Text>
							</TextScramble>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	)
}
