/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnimatePresence } from 'framer-motion'
import React, { useRef, useState, useCallback } from 'react'
import { Route, Routes, useLocation, useSearchParams } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'

import Translation from '@src/components/translation'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { ACCOUNTS_ALL, routes } from '@src/containers/playground/config'
import { MobileHeaderNavigation } from '@src/containers/playground/containers/accounts/navigation'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import { AccountsHomeMobileHeader } from './accounts-home-mobile-header'
import { AccountsHomeMobileList } from './accounts-home-mobile-list'
import {
	LIST_ITEM_INDEX,
	LIST_ITEM_ASSET,
	LIST_ITEM_ACTIVITY,
	LIST_ITEM_ASSET_TYPE,
	SEARCH_ACTIVITY_PARAM,
} from './constants'
import * as styles from './accounts-home-mobile.css'

const HEADER_HEIGHT = 56

export const AccountsHomeMobile = () => {
	const location = useLocation()
	const headerRef = useRef<HTMLElement | null>(null)
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const [isScrolledPastHeader, setIsScrolledPastHeader] = useState<boolean>(null)
	const [isAreaScrollable, setIsAreaScrollable] = useState<boolean>(false)
	const { account, assetType, asset } = useAccountParams()
	const [searchParams] = useSearchParams()
	const isActivityRoute = !!searchParams.get(SEARCH_ACTIVITY_PARAM)
	const isAllAccounts = account === ACCOUNTS_ALL

	const handleScrollArea = useCallback(
		(event: Event) => {
			const { scrollTop } = event.target as HTMLElement
			const headerHeight = headerRef.current.clientHeight - HEADER_HEIGHT

			if (!isScrolledPastHeader && scrollTop >= headerHeight) {
				setIsScrolledPastHeader(true)
			} else {
				setIsScrolledPastHeader(false)
			}
		},
		[customScrollParent],
	)

	const handleChevronClick = () => {
		const headerHeight = headerRef.current.clientHeight - HEADER_HEIGHT
		if (isScrolledPastHeader) {
			customScrollParent.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			customScrollParent.scrollTo({ top: headerHeight, behavior: 'smooth' })
		}
	}

	const handleScrollAreaSizeChange = () => {
		const firstElemHeight = customScrollParent?.clientHeight
		const firstChildElem = customScrollParent?.firstChild as HTMLElement
		const firstChildElemHeight = firstChildElem?.clientHeight

		setIsAreaScrollable(firstChildElemHeight > firstElemHeight)
	}

	const getListItemType = () => {
		const isIndexList = account && !assetType
		const isAssetType = account && assetType && !asset
		const isAsset = account && assetType && asset
		if (isActivityRoute) {
			return LIST_ITEM_ACTIVITY
		}
		if (isIndexList) {
			return LIST_ITEM_INDEX
		}
		if (isAssetType) {
			return LIST_ITEM_ASSET_TYPE
		}
		if (isAsset) {
			return LIST_ITEM_ASSET
		}

		return LIST_ITEM_ASSET
	}

	const bgStyle = {
		backgroundImage: !isAllAccounts
			? 'url("/images/account-images/z3us-apple-hermes.png"), radial-gradient(77.21% 96.45% at 50% 100%, #FE845E 0%, #E08BAB 17.71%, #AB8CFF 50.52%, #946DFF 100%)'
			: '',
	}

	return (
		<Box className={styles.accountsHomeMobileWrapper}>
			<ScrollArea
				scrollableNodeProps={{ ref: setCustomScrollParent }}
				onScroll={handleScrollArea}
				isTopShadowVisible={false}
				onScrollAreaSizeChange={handleScrollAreaSizeChange}
			>
				<AccountsHomeMobileHeader
					ref={headerRef}
					isScrolledPastHeader={isScrolledPastHeader}
					onClickChevron={handleChevronClick}
					isAreaScrollable={isAreaScrollable}
					isActivityRoute={isActivityRoute}
					className={styles.accountsColorBackground}
					backgroundStyle={bgStyle}
				/>
				<Box position="relative">
					<AnimatePresence initial={false}>
						<Routes location={location} key={location.pathname}>
							{[routes.ACCOUNT, routes.ACCOUNT_ASSET_TYPE, routes.ACCOUNT_ASSET].map(path => (
								<Route
									key="assetsList"
									path={path}
									element={
										<AnimatedPage>
											<AccountsHomeMobileList
												customScrollParent={customScrollParent}
												listItemType={getListItemType()}
											/>
										</AnimatedPage>
									}
								/>
							))}
						</Routes>
					</AnimatePresence>
				</Box>
			</ScrollArea>
			<MobileHeaderNavigation
				copyAddressBtnVisible={isScrolledPastHeader && !isAllAccounts}
				className={styles.accountsColorBackground}
				style={bgStyle}
			/>
		</Box>
	)
}
