/* eslint-disable react/no-unstable-nested-components */
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Virtuoso } from 'react-virtuoso'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { Text } from 'ui/src/components/typography'
import { routes } from 'ui/src/constants/routes'
// import { AccountActivity } from 'ui/src/containers/accounts/account-activity'
import { AccountActivitySearch } from 'ui/src/containers/accounts/account-activity-search'
import { AccountAllChart } from 'ui/src/containers/accounts/account-all-chart'
import { AccountAssetInfo } from 'ui/src/containers/accounts/account-asset-info'
import { AccountCard } from 'ui/src/containers/accounts/account-card'
// import { AccountIndexAssets } from 'ui/src/containers/accounts/account-index-assets'
// import { AccountIndexHeader } from 'ui/src/containers/accounts/account-index-header'
import { AccountRoutes } from 'ui/src/containers/accounts/account-routes'

// move to containers ... rename
import { ScrollPanel } from '../scroll-panel'
// import { AccountsList } from 'ui/src/containers/accounts/accounts-list'
import * as styles from './account-home.css'

const TAGS = Array.from({ length: 500 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`)

const AccountsHome = () => {
	const location = useLocation()

	return (
		<Box className={styles.accountsWrapper}>
			<ScrollArea
				className={styles.mobileScrollWrapper}
				renderScrollArea={(scrollMobileParent: HTMLElement) => (
					<Box className={clsx(styles.panelWrapper)}>
						<Box className={styles.leftPanelWrapper}>
							{/* // TODO: component here */}
							{/* // TODO: pass the scrollMobileParent */}
							<ScrollPanel
								scrollParent={scrollMobileParent}
								renderPanel={() => (
									<Box>
										{Array.from({ length: 2 }, (_, i) => (
											<Text size="xlarge" key={i}>
												left col
											</Text>
										))}
									</Box>
								)}
							/>
						</Box>
						<Box className={styles.rightPanelWrapper}>
							<ScrollPanel
								scrollParent={scrollMobileParent}
								renderPanel={(scrollRef: HTMLElement) => (
									<Box>
										{Array.from({ length: 10 }, (_, i) => (
											<Text size="xlarge" key={i}>
												right
											</Text>
										))}
										<Box style={{ width: '300px', border: '1px solid blue' }}>
											<Virtuoso
												data={TAGS}
												itemContent={(index, tag) => <div className="Tag">{tag}</div>}
												customScrollParent={scrollRef ?? undefined}
											/>
										</Box>
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

// {Array.from({ length: 2 }, (_, i) => (
// 	<Text size="xlarge" key={i}>
// 		Lorum ipsumIn convallis vel neque facilisis est mi in varius gravida eget convallis convallis ut velit
// 		lacus, eros faucibus odio. Varius dui porttitor eu ac egestas in tempus nisi suscipit fusce urna. Vitae
// 		semper velit facilisis nunc, suspendisse vivamus duis vestibulum ullamcorper dui lectus sapien tempus
// 		sit eu dapibus arcu pellentesque.
// 	</Text>
// ))}

export default AccountsHome

// <Box className={styles.accountsContainerWrapper}>

// <Box className={clsx(styles.panelWrapper)}>
// 	<ScrollPanel
// 		isTopShadowVisible={false}
// 		className={styles.leftPanel}
// 		renderPanel={(scrollableNode: HTMLElement | null) => (
// 			<AnimatePresence initial={false}>
// 				<Routes location={location} key={location.pathname}>
// 					{[routes.ACCOUNT, routes.ACCOUNT_ASSET_TYPE, routes.ACCOUNT_ASSET].map(path => (
// 						<Route
// 							key={routes.ACCOUNT} // single key to avoid full re-renders when these routes change
// 							path={path}
// 							element={
// 								<AnimatedPage>
// 									<AccountRoutes
// 										// scrollableNode={isMobileScrollEnabled ? mobileScrollableNode : scrollableNode}
// 										scrollableNode={scrollableNode}
// 									/>
// 								</AnimatedPage>
// 							}
// 						/>
// 					))}
// 				</Routes>
// 			</AnimatePresence>
// 		)}
// 	/>
// 	<ScrollPanel
// 		className={styles.rightPanel}
// 		scrollTopOnRoute
// 		isTopShadowVisible={false}
// 		renderPanel={(scrollableNode: HTMLElement | null) => (
// 			<>
// 				<AccountAllChart />
// 				<AccountCard />
// 				<AccountAssetInfo />
// 				{/* <AccountActivitySearch scrollableNode={scrollableNode} /> */}
// 			</>
// 		)}
// 	/>
// </Box>
