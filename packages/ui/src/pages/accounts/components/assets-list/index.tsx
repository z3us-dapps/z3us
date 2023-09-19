import type BigNumber from 'bignumber.js'
import clsx from 'clsx'
import React, { useState } from 'react'
import { FormattedNumber, defineMessages, useIntl } from 'react-intl'
import { Link, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import Loader from 'ui/src/components/loader'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { OverlayAssetIcons } from '../overlay-asset-icons'
import * as styles from './styles.css'

const messages = defineMessages({
	tokens: {
		id: 'accounts.assets_list.tokens',
		defaultMessage: 'Tokens',
	},
	nfts: {
		id: 'accounts.assets_list.nfts',
		defaultMessage: 'NFTs',
	},
	lp_tokens: {
		id: 'accounts.assets_list.lp_tokens',
		defaultMessage: 'Liquidity Pool Tokens',
	},
	pool_units: {
		id: 'accounts.assets_list.pool_units',
		defaultMessage: 'Pool Units',
	},
})

export const AssetsList: React.FC = () => {
	const intl = useIntl()
	const { accountId = '-' } = useParams()
	const selectedAccounts = useSelectedAccounts()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const {
		isLoading,
		nonFungibleBalances,
		nonFungibleChange,
		nonFungibleValue,
		tokensBalances,
		tokensValue,
		tokensChange,
		liquidityPoolTokensBalances,
		liquidityPoolTokensValue,
		liquidityPoolTokensChange,
		poolUnitsBalances,
		poolUnitsValue,
		poolUnitsChange,
	} = useBalances(...selectedAccounts)

	const rows = {
		tokens: {
			balances: tokensBalances,
			value: tokensValue,
			change: tokensChange,
			title: intl.formatMessage(messages.tokens),
		},
		nfts: {
			balances: nonFungibleBalances,
			value: nonFungibleValue,
			change: nonFungibleChange,
			title: intl.formatMessage(messages.nfts),
		},
		'lp-tokens': {
			balances: liquidityPoolTokensBalances,
			value: liquidityPoolTokensValue,
			change: liquidityPoolTokensChange,
			title: intl.formatMessage(messages.lp_tokens),
		},
		'pool-units': {
			balances: poolUnitsBalances,
			value: poolUnitsValue,
			change: poolUnitsChange,
			title: intl.formatMessage(messages.pool_units),
		},
	}

	const [hoveredLink, setHoveredLink] = useState<string | null>(null)

	if (isLoading) return <Loader />

	return (
		<Box component="ul" className={styles.assetsList}>
			{Object.keys(rows).map(path => (
				<Box key={path} component="li" className={styles.assetsListLi}>
					<Link
						to={`/accounts/${accountId}/${path}`}
						className={clsx(styles.assetsListLink, hoveredLink === path && styles.assetsListLinkHover)}
						onMouseOver={() => setHoveredLink(path)}
						onMouseLeave={() => setHoveredLink(null)}
					>
						<Box className={styles.assetsListTitleWrapper}>
							<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
								{rows[path].title}
							</Text>
							{rows[path].balances.length > 0 && (
								<Text size="small" truncate>
									({rows[path].balances.length})
								</Text>
							)}
						</Box>
						<Box className={styles.assetsListTitleWrapper}>
							<Text weight="strong" size="small" color="strong" truncate>
								<FormattedNumber value={rows[path].value.toNumber()} style="currency" currency={currency} />
							</Text>
							<Text size="small" color={rows[path].change && rows[path].change.gt(0) ? 'green' : 'red'} truncate>
								<FormattedNumber value={rows[path].change.toNumber()} style="percent" maximumFractionDigits={2} />
							</Text>
						</Box>
					</Link>
					<OverlayAssetIcons
						resourceType={path.slice(0, -1) as any}
						balances={rows[path].balances}
						onButtonMouseOver={() => setHoveredLink(path)}
					/>
				</Box>
			))}
		</Box>
	)
}
