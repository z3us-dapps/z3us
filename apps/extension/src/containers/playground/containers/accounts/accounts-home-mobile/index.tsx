/* eslint-disable */
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'
import { Text } from 'ui/src/components-v2/typography'

import Translation from '@src/components/translation'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { CopyAddressButton } from '@src/containers/playground/components/copy-address-button'
import { WalletDropdown } from '@src/containers/playground/components/wallet-dropdown'
import { Z3usLogo } from '@src/containers/playground/components/z3us-logo'
import { ACCOUNTS_ALL, routes } from '@src/containers/playground/config'
import { AccountViewDropdown } from '@src/containers/playground/containers/accounts/account-view-dropdown'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import { AccountsHomeMobileHeader } from './accounts-home-mobile-header'
import { AccountsHomeMobileList } from './accounts-home-mobile-list'
import * as styles from './accounts-home-mobile.css'
import { TActiveTab } from './types'

const HEADER_HEIGHT = 56

export const AccountsHomeMobile = () => {
	const location = useLocation()
	const headerRef = useRef<HTMLElement | null>(null)
	const [activeTab, setActiveTab] = useState<TActiveTab>('assets')
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const [isScrolledPastHeader, setIsScrolledPastHeader] = useState<boolean>(null)
	const { account, assetType, asset } = useAccountParams()
	const isAllAccounts = account === ACCOUNTS_ALL

	const handleScrollArea = (e: Event) => {
		const scrollTop = (e.target as HTMLElement).scrollTop
		const headerHeight = headerRef.current.clientHeight - HEADER_HEIGHT

		if (!isScrolledPastHeader && scrollTop >= headerHeight) {
			setIsScrolledPastHeader(true)
		} else {
			setIsScrolledPastHeader(false)
		}
	}

	const handleChevronClick = () => {
		const headerHeight = headerRef.current.clientHeight - HEADER_HEIGHT
		if (isScrolledPastHeader) {
			customScrollParent.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			customScrollParent.scrollTo({ top: headerHeight, behavior: 'smooth' })
		}
	}

	return (
		<>
			<Box className={styles.accountsHomeMobileWrapper}>
				<ScrollArea
					scrollableNodeProps={{ ref: setCustomScrollParent }}
					onScroll={handleScrollArea}
					isTopShadowVisible={false}
				>
					<AccountsHomeMobileHeader
						ref={headerRef}
						isScrolledPastHeader={isScrolledPastHeader}
						onClickChevron={handleChevronClick}
						activeTab={activeTab}
						onSelectTab={setActiveTab}
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
												<AccountsHomeMobileList customScrollParent={customScrollParent} activeTab={activeTab} />
											</AnimatedPage>
										}
									/>
								))}
							</Routes>
						</AnimatePresence>
					</Box>
				</ScrollArea>
				<Box className={styles.accountsHomeMobileHeader}>
					<Box className={styles.accountsHomeMobileHeaderWalletWrapper}>
						<Box display="flex" alignItems="center" gap="small" flexGrow={1}>
							<Z3usLogo />
							<AccountViewDropdown styleVariant="white-transparent" />
						</Box>
						<Box display="flex" alignItems="center" gap="medium">
							<Box
								transition="fast"
								style={{
									opacity: isScrolledPastHeader && !isAllAccounts ? 1 : 0,
									pointerEvents: isScrolledPastHeader && !isAllAccounts ? 'all' : 'none',
								}}
							>
								<CopyAddressButton
									styleVariant="white-transparent"
									address="rdx1b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce"
								/>
							</Box>
							<WalletDropdown buttonSize="small" />
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	)
}
