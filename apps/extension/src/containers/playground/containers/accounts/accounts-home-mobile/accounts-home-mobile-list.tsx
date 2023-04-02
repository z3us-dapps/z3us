/* eslint-disable */
import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { forwardRef, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'
import { useTimeout } from 'usehooks-ts'
import { useIntersectionObserver } from 'usehooks-ts'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { Link } from '@src/components/link'
import Translation from '@src/components/translation'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { ScrollPanel } from '@src/containers/playground/components/scroll-panel'
import {
	ACCOUNTS_ALL,
	ASSET_TYPE_BADGES,
	ASSET_TYPE_LP_TOKENS,
	ASSET_TYPE_NFTS,
	ASSET_TYPE_TOKENS,
} from '@src/containers/playground/config'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import * as styles from './accounts-home-mobile.css'
import { AccountsMobileIndexListItem } from './accounts-mobile-index-list-item'
import { Context } from './context'
import { TActiveTab } from './types'

const hash = () => Math.random().toString(36).substring(7)

const ListContainer = React.forwardRef<HTMLDivElement>((props, ref) => (
	<Box className={styles.mobileAccountsListContainer} ref={ref} {...props} />
))

const ItemContainer = props => <Box {...props} />

interface IAccountTransactionRequiredProps {
	customScrollParent: HTMLElement
	activeTab: TActiveTab
}

interface IAccountTransactionOptionalProps {
	className?: number
}

interface IAccountTransactionProps extends IAccountTransactionRequiredProps, IAccountTransactionOptionalProps {}

const defaultProps: IAccountTransactionOptionalProps = {
	className: undefined,
}

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

export const AccountsHomeMobileList = forwardRef<HTMLElement, IAccountTransactionProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { customScrollParent } = props

		// const [items, setItems] = useState(Array.from({ length: 20 }, _ => ({ id: hash(), name: hash(), loaded: false })))
		const [items, setItems] = useState(indexItems)

		const computeItemKey = useCallback(index => items[index].id, [items])

		const { account, assetType, asset } = useAccountParams()
		const isIndexList = !!account && !assetType
		// const isAllAccounts = account === ACCOUNTS_ALL

		return (
			<Box ref={ref} className={styles.mobileAccountsListWrapper}>
				<Context.Provider value={{ setItems }}>
					<Virtuoso
						customScrollParent={customScrollParent}
						data={items}
						// eslint-disable-next-line
						itemContent={(index, { id, loaded, name, isImageSquare, count, assetType }) =>
							isIndexList ? (
								<AccountsMobileIndexListItem
									id={id}
									index={index}
									loaded={loaded}
									name={name}
									isImageSquare={isImageSquare}
									count={count}
									assetType={assetType}
								/>
							) : (
								<Box>
									<Box>HHEHHEEH</Box>
								</Box>
							)
						}
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
