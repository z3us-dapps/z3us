import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import { routes } from 'ui/src/constants/routes'
import { AccountActivity } from 'ui/src/containers/accounts/account-activity'
import { AccountActivitySearch } from 'ui/src/containers/accounts/account-activity-search'
import { AccountAllChart } from 'ui/src/containers/accounts/account-all-chart'
import { AccountAssetInfo } from 'ui/src/containers/accounts/account-asset-info'
import { AccountCard } from 'ui/src/containers/accounts/account-card'
// import { AccountIndexAssets } from 'ui/src/containers/accounts/account-index-assets'
// import { AccountIndexHeader } from 'ui/src/containers/accounts/account-index-header'
import { AccountRoutes } from 'ui/src/containers/accounts/account-routes'

// import { AccountsList } from 'ui/src/containers/accounts/accounts-list'
import * as styles from './account-home.css'

const AccountsHome = () => {
	const location = useLocation()

	return (
		<Box className={styles.accountsWrapper}>
			<Box className={styles.accountsContainerWrapper}>
				<Box className={clsx(styles.panelWrapper)}>
					<ScrollPanel
						isTopShadowVisible={false}
						className={styles.leftPanel}
						renderPanel={(scrollableNode: HTMLElement | null) => (
							<AnimatePresence initial={false}>
								<Routes location={location} key={location.pathname}>
									{[routes.ACCOUNT, routes.ACCOUNT_ASSET_TYPE, routes.ACCOUNT_ASSET].map(path => (
										<Route
											key="assetsList" // to avoid full re-renders when these routes change
											path={path}
											element={
												<AnimatedPage>
													<AccountRoutes scrollableNode={scrollableNode} />
												</AnimatedPage>
											}
										/>
									))}
								</Routes>
							</AnimatePresence>
						)}
					/>
					<ScrollPanel
						className={styles.rightPanel}
						scrollTopOnRoute
						isTopShadowVisible={false}
						renderPanel={(scrollableNode: HTMLElement | null) => (
							<>
								<AccountAllChart />
								<AccountCard />
								<AccountAssetInfo />
								<AccountActivitySearch scrollableNode={scrollableNode} />
								<AccountActivity scrollableNode={scrollableNode} />
							</>
						)}
					/>
				</Box>
			</Box>
		</Box>
	)
}

export default AccountsHome
