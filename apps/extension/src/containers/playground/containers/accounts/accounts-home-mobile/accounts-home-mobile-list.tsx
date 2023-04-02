/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components-v2/box'

import {
	ASSET_TYPE_BADGES,
	ASSET_TYPE_LP_TOKENS,
	ASSET_TYPE_NFTS,
	ASSET_TYPE_TOKENS,
} from '@src/containers/playground/config'

import * as styles from './accounts-home-mobile.css'
import { AccountsMobileIndexListItem } from './accounts-mobile-index-list-item'
import { AccountsMobileActivityListItem } from './accounts-mobile-activity-list-item'
import { AccountsMobileAssetListItem } from './accounts-mobile-asset-list-item'
import { Context } from './context'
import { TListItem } from './types'
import { LIST_ITEM_INDEX, LIST_ITEM_ASSET, LIST_ITEM_ACTIVITY, LIST_ITEM_ASSET_TYPE } from './constants'

const indexItems = [
	{ id: `id-${ASSET_TYPE_TOKENS}`, loaded: false, name: 'Tokens', count: 12, assetType: ASSET_TYPE_TOKENS },
	{ id: `id-${ASSET_TYPE_LP_TOKENS}`, loaded: false, name: 'LP Tokens', count: 2, assetType: ASSET_TYPE_LP_TOKENS },
	{
		id: `id-${ASSET_TYPE_NFTS}`,
		loaded: false,
		name: 'NFTs',
		isImageSquare: true,
		count: 6,
		assetType: ASSET_TYPE_NFTS,
	},
	{ id: `id-${ASSET_TYPE_BADGES}`, loaded: false, name: 'Badges', count: 2, assetType: ASSET_TYPE_BADGES },
]

export const hash = () => Math.random().toString(36).substring(7)

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => (
	<Box className={styles.mobileAccountsListContainer} ref={ref} {...props} />
))

const ItemContainer = props => <Box {...props} />

interface IAccountTransactionRequiredProps {
	customScrollParent: HTMLElement
	listItemType: TListItem
}

interface IAccountTransactionOptionalProps {
	className?: number
}

interface IAccountTransactionProps extends IAccountTransactionRequiredProps, IAccountTransactionOptionalProps {}

const defaultProps: IAccountTransactionOptionalProps = {
	className: undefined,
}

export const AccountsHomeMobileList = forwardRef<HTMLElement, IAccountTransactionProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { customScrollParent, listItemType, className } = props

		const [items, setItems] = useState<any>(indexItems)

		// TODO: demo data fetching
		useEffect(() => {
			if (listItemType === LIST_ITEM_INDEX) {
				setItems(indexItems)
			} else {
				setItems(Array.from({ length: 40 }, _ => ({ id: hash(), name: hash(), loaded: false, symbol: 'xrd' })))
			}
		}, [listItemType])

		const computeItemKey = useCallback(index => items[index].id, [items])

		return (
			<Box ref={ref} className={clsx(styles.mobileAccountsListWrapperInner, className)}>
				{/* eslint-disable-next-line */}
				<Context.Provider value={{ setItems }}>
					<Virtuoso
						customScrollParent={customScrollParent}
						data={items}
						// eslint-disable-next-line
						itemContent={(index, { id, loaded, name, isImageSquare, count, assetType, symbol }) => {
							switch (listItemType) {
								case LIST_ITEM_INDEX:
									return (
										<AccountsMobileIndexListItem
											id={id}
											index={index}
											loaded={loaded}
											name={name}
											isImageSquare={isImageSquare}
											count={count}
											assetType={assetType}
										/>
									)
								case LIST_ITEM_ASSET_TYPE:
									return (
										<AccountsMobileAssetListItem id={id} index={index} loaded={loaded} name={name} symbol={symbol} />
									)
								case LIST_ITEM_ACTIVITY:
									return <AccountsMobileActivityListItem id={id} index={index} loaded={loaded} name={name} />
								case LIST_ITEM_ASSET:
								default:
									return (
										<Box>
											<Box>asset TODO</Box>
										</Box>
									)
							}
						}}
						components={{
							List: ListContainer,
							Item: ItemContainer,
						}}
						computeItemKey={computeItemKey}
					/>
				</Context.Provider>
			</Box>
		)
	},
)

AccountsHomeMobileList.defaultProps = defaultProps
