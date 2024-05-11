import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Link, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { RedGreenText, Text } from 'ui/src/components/typography'
import { CURRENCY_STYLES, PERCENTAGE_STYLES } from 'ui/src/constants/number'
import { useSelectedAccountsBalances } from 'ui/src/hooks/dapp/use-balances'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import { OverlayAssetIcons } from '../overlay-asset-icons'
import * as styles from './styles.css'

const messages = defineMessages({
	tokens: {
		id: 'P6EE/a',
		defaultMessage: 'Tokens',
	},
	nfts: {
		id: 'nqRscq',
		defaultMessage: 'NFTs',
	},
	lsus: {
		id: 'zspeCR',
		defaultMessage: 'LSUs',
	},
	lpus: {
		id: 'uLpYbE',
		defaultMessage: 'LPUs',
	},
})

export const AssetsList: React.FC = () => {
	const intl = useIntl()
	const { accountId = '-' } = useParams()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const {
		data: {
			nftsBalances = [],
			nftsChange = 0,
			nftsValue = 0,
			tokensBalances = [],
			tokensValue = 0,
			tokensChange = 0,
			liquidityPoolTokensBalances = [],
			liquidityPoolTokensValue = 0,
			liquidityPoolTokensChange = 0,
			poolUnitsBalances = [],
			poolUnitsValue = 0,
			poolUnitsChange = 0,
		},
		isLoading,
	} = useSelectedAccountsBalances()

	const rows = {
		tokens: {
			balances: tokensBalances,
			value: tokensValue,
			change: tokensChange,
			title: intl.formatMessage(messages.tokens),
		},
		nfts: {
			balances: nftsBalances,
			value: nftsValue,
			change: nftsChange,
			title: intl.formatMessage(messages.nfts),
		},
		lsus: {
			balances: liquidityPoolTokensBalances,
			value: liquidityPoolTokensValue,
			change: liquidityPoolTokensChange,
			title: intl.formatMessage(messages.lsus),
		},
		lpus: {
			balances: poolUnitsBalances,
			value: poolUnitsValue,
			change: poolUnitsChange,
			title: intl.formatMessage(messages.lpus),
		},
	}

	return (
		<Box className={styles.assetsList}>
			{Object.keys(rows).map(path =>
				isLoading ? (
					<FallbackLoading key={path} />
				) : (
					<Link key={path} to={`/accounts/${accountId}/${path}`} className={styles.assetsListLink}>
						<Box className={styles.assetsListTitleWrapper}>
							<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
								{rows[path].title}
							</Text>
							{rows[path].balances.length > 0 && (
								<Text size="small" truncate>
									({rows[path].balances.length})
								</Text>
							)}
							<Box className={styles.assetsListTitleChevronWrapper}>
								<ChevronRightIcon />
							</Box>
						</Box>
						<Box className={styles.assetsListBalancesWrapper}>
							<OverlayAssetIcons resourceType={path.slice(0, -1) as any} balances={rows[path].balances} />
							<Box className={styles.assetsListBalancesTextWrapper}>
								{rows[path].value !== 0 && (
									<Text weight="strong" size="small" color="strong" truncate className={styles.assetsListBalancesText}>
										{intl.formatNumber(rows[path].value, { currency, ...CURRENCY_STYLES })}
									</Text>
								)}

								{rows[path].change !== 0 && (
									<RedGreenText
										size="small"
										change={rows[path].change}
										truncate
										className={styles.assetsListBalancesText}
									>
										{intl.formatNumber(rows[path].change, PERCENTAGE_STYLES)}
									</RedGreenText>
								)}
							</Box>
						</Box>
					</Link>
				),
			)}
		</Box>
	)
}
