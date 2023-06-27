import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { routes } from 'ui/src/constants/routes'
import { AccountSettingsMobile } from 'ui/src/containers/accounts/account-settings'
import { AccountStaking } from 'ui/src/containers/accounts/account-staking'
import { AccountSwap } from 'ui/src/containers/accounts/account-swap'
import { AccountTransferMobile } from 'ui/src/containers/accounts/account-transfer'
import { AccountsHomeMobile } from 'ui/src/containers/accounts/accounts-home-mobile'
import { MobileFooterNavigation } from 'ui/src/containers/accounts/navigation'
import { NavigationScrollContainer } from 'ui/src/containers/accounts/navigation-scroll-container'
import { useLocationKey } from 'ui/src/hooks/use-location-key'

import * as styles from './accounts-mobile.css'

export const AccountsMobile: React.FC = () => {
	const { location, locationKey } = useLocationKey()

	return (
		<Box className={styles.mobileWrapper}>
			<Box className={styles.mobileRouteWrapper}>
				<AnimatePresence initial={false}>
					<Routes location={location} key={locationKey}>
						<Route
							path="/*"
							element={
								<AnimatedPage>
									<AccountsHomeMobile />
								</AnimatedPage>
							}
						/>
						<Route
							path={routes.TRANSFER}
							element={
								<AnimatedPage>
									<AccountTransferMobile />
									{/* <NavigationScrollContainer renderPanel={() => <AccountTransfer />} /> */}
								</AnimatedPage>
							}
						/>
						<Route
							path={routes.STAKING}
							element={
								<AnimatedPage>
									<AccountStaking />
								</AnimatedPage>
							}
						/>
						<Route
							path={routes.SWAP}
							element={
								<AnimatedPage>
									<AccountSwap />
								</AnimatedPage>
							}
						/>
						<Route
							path={`${routes.SETTINGS}/*`}
							element={
								<AnimatedPage>
									<NavigationScrollContainer
										isMobileNavVisible={false}
										isTopShadowVisible={false}
										renderPanel={(scrollableNode: HTMLElement | null, scrollTop: number) => (
											<AccountSettingsMobile scrollableNode={scrollableNode} scrollTop={scrollTop} />
										)}
									/>
								</AnimatedPage>
							}
						/>
					</Routes>
				</AnimatePresence>
			</Box>
			<MobileFooterNavigation />
		</Box>
	)
}
