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
import { ScrollPanel } from '@src/containers/playground/components/scroll-panel'
import { WalletDropdown } from '@src/containers/playground/components/wallet-dropdown'
import { Z3usLoading } from '@src/containers/playground/components/z3us-loading'
import { Z3usLogo } from '@src/containers/playground/components/z3us-logo'
import { routes } from '@src/containers/playground/config'
import { AccountViewDropdown } from '@src/containers/playground/containers/accounts/account-view-dropdown'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import { AccountsHomeMobileHeader } from './accounts-home-mobile-header'
import { AccountsHomeMobileList } from './accounts-home-mobile-list'
import * as styles from './accounts-home-mobile.css'

export const AccountsHomeMobile = () => {
	const location = useLocation()
	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const [scrollTop, setScrollTop] = useState<HTMLElement | null>(null)
	const [isScrolledPastHeader, setIsScrolledPastHeader] = useState<boolean>(null)
	const headerRef = useRef(null)
	const { account, assetType, asset } = useAccountParams()
	const isAllAccount = account === 'all'

	const handleScrollArea = (e: Event) => {
		const scrollTop = (e.target as HTMLElement).scrollTop
		const headerHeight = headerRef.current.clientHeight - 48

		if (!isScrolledPastHeader && scrollTop >= headerHeight) {
			setIsScrolledPastHeader(true)
		} else {
			setIsScrolledPastHeader(false)
		}
	}

	const handleChevronClick = () => {
		const headerHeight = headerRef.current.clientHeight
		if (isScrolledPastHeader) {
			customScrollParent.scrollTo({ top: 0, behavior: 'smooth' })
		} else {
			customScrollParent.scrollTo({ top: headerHeight, behavior: 'smooth' })
		}
	}

	return (
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
				/>
				<AccountsHomeMobileList customScrollParent={customScrollParent} />
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
								opacity: isScrolledPastHeader && !isAllAccount ? 1 : 0,
								pointerEvents: isScrolledPastHeader && !isAllAccount ? 'all' : 'none',
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
	)
}
