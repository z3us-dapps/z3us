import clsx from 'clsx'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { formatBigNumber, formatChange } from 'ui/src/utils/formatters'

import { OverlayAssetIcons } from '../overlay-asset-icons'
import * as styles from './styles.css'

const TOKENS_PATH = 'tokens'
const NFTS_PATH = 'nfts'

interface IProps {
	accountId: string
	// TODO
	fungibleBalances: any
	fungibleTotalValue: any
	fungibleTotalChange: any
	nonFungibleBalances: any
	nonFungibleTotalValue: any
	nonFungibleTotalChange: any
}

export const AssetsList: React.FC<IProps> = props => {
	const {
		accountId,
		fungibleBalances,
		fungibleTotalValue,
		fungibleTotalChange,
		nonFungibleBalances,
		nonFungibleTotalValue,
		nonFungibleTotalChange,
	} = props

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
							<Translation capitalizeFirstLetter text="accounts.home.fungiblesTitle" />{' '}
						</Text>
						{fungibleBalances.length > 0 && (
							<Text size="small" truncate>
								({fungibleBalances.length})
							</Text>
						)}
					</Box>
					<Box className={styles.assetsListTitleWrapper}>
						<Text weight="strong" size="small" color="strong" truncate>
							{formatBigNumber(fungibleTotalValue, currency, 2)}
						</Text>
						<Text size="small" color={fungibleTotalChange && fungibleTotalChange.gt(0) ? 'green' : 'red'} truncate>
							{formatChange(fungibleTotalChange)}
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
							<Translation capitalizeFirstLetter text="accounts.home.nonFungiblesTitle" />
						</Text>
						{nonFungibleBalances.length > 0 && (
							<Text size="small" truncate>
								({nonFungibleBalances.length})
							</Text>
						)}
					</Box>
					<Box className={styles.assetsListTitleWrapper}>
						<Text weight="strong" size="small" color="strong" truncate>
							{formatBigNumber(nonFungibleTotalValue, currency, 2)}
						</Text>
						<Text
							size="small"
							color={nonFungibleTotalChange && nonFungibleTotalChange.gt(0) ? 'green' : 'red'}
							truncate
						>
							{formatChange(nonFungibleTotalChange)}
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
