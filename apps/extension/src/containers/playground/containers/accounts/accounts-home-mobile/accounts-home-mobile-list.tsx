/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Virtuoso } from 'react-virtuoso'

import { Box } from 'ui/src/components-v2/box'
import { isEmptyArray } from 'ui/src/utils/assertion'

import { NoResultsPlaceholder } from '@src/components/no-results-placeholder'
import {
	ASSET_TYPE_BADGES,
	ASSET_TYPE_LP_TOKENS,
	ASSET_TYPE_NFTS,
	ASSET_TYPE_TOKENS,
} from '@src/containers/playground/config'

import * as styles from './accounts-home-mobile.css'
import { AccountsMobileActivityListItem } from './accounts-mobile-activity-list-item'
import { AccountsMobileAssetListItem } from './accounts-mobile-asset-list-item'
import { AccountsMobileIndexListItem } from './accounts-mobile-index-list-item'
import { LIST_ITEM_ACTIVITY, LIST_ITEM_ASSET, LIST_ITEM_ASSET_TYPE, LIST_ITEM_INDEX } from './constants'
import { Context } from './context'
import { TListItem } from './types'

export const hash = () => Math.random().toString(36).substring(7)

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => (
	<div className={styles.mobileAccountsListContainer} ref={ref} {...props} />
))

const ItemContainer = props => <Box {...props} />

interface IAccountTransactionRequiredProps {
	customScrollParent: HTMLElement
	listItemType: TListItem
	search: string
}

interface IAccountTransactionOptionalProps {
	className?: ClassValue
}

interface IAccountTransactionProps extends IAccountTransactionRequiredProps, IAccountTransactionOptionalProps {}

const defaultProps: IAccountTransactionOptionalProps = {
	className: undefined,
}

export const AccountsHomeMobileList = forwardRef<HTMLElement, IAccountTransactionProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { customScrollParent, listItemType, className, search } = props

		const { t, i18n } = useTranslation()

		const indexItems = [
			{
				id: `id-${ASSET_TYPE_TOKENS}`,
				loaded: false,
				name: t('accounts.home.assetsTokens'),
				count: 12,
				assetType: ASSET_TYPE_TOKENS,
			},
			{
				id: `id-${ASSET_TYPE_LP_TOKENS}`,
				loaded: false,
				name: t('accounts.home.assetsLpTokens'),
				count: 2,
				assetType: ASSET_TYPE_LP_TOKENS,
			},
			{
				id: `id-${ASSET_TYPE_NFTS}`,
				loaded: false,
				name: t('accounts.home.assetsNfts'),
				isImageSquare: true,
				count: 6,
				assetType: ASSET_TYPE_NFTS,
			},
			{
				id: `id-${ASSET_TYPE_BADGES}`,
				loaded: false,
				name: t('accounts.home.assetsBadges'),
				count: 2,
				assetType: ASSET_TYPE_BADGES,
			},
		]

		const [items, setItems] = useState<any>(indexItems)

		// TODO: demo data fetching
		useEffect(() => {
			// Needs to scroll to top or the virtuoso list will bug out for some reason
			customScrollParent?.scrollTo({ top: 0 })

			if (listItemType === LIST_ITEM_INDEX) {
				setItems(indexItems)
			} else {
				setItems(Array.from({ length: 40 }, _ => ({ id: hash(), name: hash(), loaded: false, symbol: 'xrd' })))
			}
		}, [listItemType, i18n.language])

		const computeItemKey = useCallback(index => items[index].id, [items])

		// todo: fix token type
		const filteredList = items.filter((_token: any) => {
			const searchLowerCase = search.toLowerCase()
			return (
				_token.name?.toLowerCase().includes(searchLowerCase) || _token.symbol?.toLowerCase().includes(searchLowerCase)
			)
		})

		return (
			<Box ref={ref} className={clsx(styles.mobileAccountsListWrapperInner, className)}>
				{isEmptyArray(filteredList) ? (
					<Box paddingTop="large">
						<NoResultsPlaceholder />
					</Box>
				) : (
					<>
						{/* @TODO: remove eslint when we remove context provider */}
						{/* eslint-disable-next-line */}
						<Context.Provider value={{ setItems }}>
							<Virtuoso
								customScrollParent={customScrollParent}
								data={filteredList}
								// @TODO: fix eslint issue
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
												<AccountsMobileAssetListItem
													id={id}
													index={index}
													loaded={loaded}
													name={name}
													symbol={symbol}
												/>
											)
										case LIST_ITEM_ACTIVITY:
											return <AccountsMobileActivityListItem id={id} index={index} loaded={loaded} name={name} />
										case LIST_ITEM_ASSET:
										default:
											return (
												<Box>
													<Box>Asset item, should not show</Box>
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
					</>
				)}
			</Box>
		)
	},
)

AccountsHomeMobileList.defaultProps = defaultProps
