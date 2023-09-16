import type BigNumber from 'bignumber.js'
import clsx from 'clsx'
import React, { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { Link } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { type ResourceBalanceKind } from 'ui/src/types/types'
import { formatBigNumber, formatChange } from 'ui/src/utils/formatters'

import { OverlayAssetIcons } from '../overlay-asset-icons'
import * as styles from './styles.css'

const TOKENS_PATH = 'tokens'
const NFTS_PATH = 'nfts'

interface IProps {
	accountId: string
	fungibleBalances: ResourceBalanceKind[]
	fungibleValue: BigNumber
	fungibleChange: BigNumber
	nonFungibleBalances: ResourceBalanceKind[]
	nonFungibleValue: BigNumber
	nonFungibleChange: BigNumber
}

const messages = defineMessages({
	fungibles: {
		id: 'accounts.assets_list.fungibles',
		defaultMessage: 'Tokens',
	},
	non_fungibles: {
		id: 'accounts.assets_list.non_fungibles',
		defaultMessage: 'NFTs',
	},
})

export const AssetsList: React.FC<IProps> = props => {
	const {
		accountId,
		fungibleBalances,
		fungibleValue,
		fungibleChange,
		nonFungibleBalances,
		nonFungibleValue,
		nonFungibleChange,
	} = props

	const intl = useIntl()
	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))
	const [hoveredLink, setHoveredLink] = useState<string | null>(null)

	return (
		<Box component="ul" className={styles.assetsList}>
			<Box component="li" className={styles.assetsListLi}>
				<Link
					to={`/accounts/${accountId}/${TOKENS_PATH}`}
					className={clsx(styles.assetsListLink, hoveredLink === TOKENS_PATH && styles.assetsListLinkHover)}
					onMouseOver={() => setHoveredLink(TOKENS_PATH)}
					onMouseLeave={() => setHoveredLink(null)}
				>
					<Box className={styles.assetsListTitleWrapper}>
						<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
							{intl.formatMessage(messages.fungibles)}
						</Text>
						{fungibleBalances.length > 0 && (
							<Text size="small" truncate>
								({fungibleBalances.length})
							</Text>
						)}
					</Box>
					<Box className={styles.assetsListTitleWrapper}>
						<Text weight="strong" size="small" color="strong" truncate>
							{formatBigNumber(fungibleValue, currency, 2)}
						</Text>
						<Text size="small" color={fungibleChange && fungibleChange.gt(0) ? 'green' : 'red'} truncate>
							{formatChange(fungibleChange)}
						</Text>
					</Box>
				</Link>
				<OverlayAssetIcons
					resourceType="token"
					balances={fungibleBalances}
					onButtonMouseOver={() => setHoveredLink(TOKENS_PATH)}
				/>
			</Box>
			<Box component="li" className={styles.assetsListLi}>
				<Link
					to={`/accounts/${accountId}/${NFTS_PATH}`}
					className={clsx(styles.assetsListLink, hoveredLink === NFTS_PATH && styles.assetsListLinkHover)}
					onMouseOver={() => setHoveredLink(NFTS_PATH)}
					onMouseLeave={() => setHoveredLink(null)}
				>
					<Box className={styles.assetsListTitleWrapper}>
						<Text capitalizeFirstLetter color="strong" weight="medium" size="small">
							{intl.formatMessage(messages.non_fungibles)}
						</Text>
						{nonFungibleBalances.length > 0 && (
							<Text size="small" truncate>
								({nonFungibleBalances.length})
							</Text>
						)}
					</Box>
					<Box className={styles.assetsListTitleWrapper}>
						<Text weight="strong" size="small" color="strong" truncate>
							{formatBigNumber(nonFungibleValue, currency, 2)}
						</Text>
						<Text size="small" color={nonFungibleChange && nonFungibleChange.gt(0) ? 'green' : 'red'} truncate>
							{formatChange(nonFungibleChange)}
						</Text>
					</Box>
				</Link>
				<OverlayAssetIcons
					resourceType="nft"
					balances={nonFungibleBalances}
					onButtonMouseOver={() => setHoveredLink(NFTS_PATH)}
				/>
			</Box>
		</Box>
	)
}
