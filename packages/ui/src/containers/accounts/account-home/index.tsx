import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { routes } from 'ui/src/constants/routes'
import { AccountActivity } from 'ui/src/containers/accounts/account-activity'
import { AccountActivitySearch } from 'ui/src/containers/accounts/account-activity-search'
import { AccountAllChart } from 'ui/src/containers/accounts/account-all-chart'
import { AccountAssetInfo } from 'ui/src/containers/accounts/account-asset-info'
import { AccountCard } from 'ui/src/containers/accounts/account-card'
import { AccountRoutes } from 'ui/src/containers/accounts/account-routes'

import { ScrollPanel, useIsMobileScroll } from '../scroll-panel'
import * as styles from './account-home.css'

const AccountsHome = () => {
	const location = useLocation()
	const isMobileScroll = useIsMobileScroll()

	return (
		<Box className={styles.accountsWrapper}>
			<ScrollArea
				disabled={!isMobileScroll}
				className={styles.mobileScrollWrapper}
				renderScrollArea={(scrollMobileParent: HTMLElement) => (
					<Box className={styles.panelWrapper}>
						<Box className={styles.leftPanelWrapper}>
							<ScrollPanel
								scrollParent={scrollMobileParent}
								renderPanel={(scrollRef: HTMLElement) => (
									<AnimatePresence initial={false}>
										<Routes location={location} key={location.pathname}>
											{[routes.ACCOUNT, routes.ACCOUNT_ASSET_TYPE, routes.ACCOUNT_ASSET].map(path => (
												<Route
													key={routes.ACCOUNT} // single key to avoid full re-renders when these routes change
													path={path}
													element={
														<AnimatedPage>
															<AccountRoutes scrollableNode={scrollRef} />
														</AnimatedPage>
													}
												/>
											))}
										</Routes>
									</AnimatePresence>
								)}
							/>
						</Box>
						<Box className={styles.rightPanelWrapper}>
							<ScrollPanel
								scrollParent={scrollMobileParent}
								renderPanel={(scrollRef: HTMLElement) => (
									<Box>
										<AccountAllChart />
										<AccountCard />
										<AccountAssetInfo />
										<AccountActivitySearch scrollableNode={scrollRef} />
										<AccountActivity scrollableNode={scrollRef} />
									</Box>
								)}
							/>
						</Box>
					</Box>
				)}
			/>
		</Box>
	)
}

export default AccountsHome
