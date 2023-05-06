import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'

import { AnimatedPage } from '@src/components/animated-route'
import { routes } from '@src/constants'
import { AccountSettings } from '@src/containers/accounts/account-settings'
import { AccountStaking } from '@src/containers/accounts/account-staking'
import { AccountSwap } from '@src/containers/accounts/account-swap'
import { AccountTransfer } from '@src/containers/accounts/account-transfer'
import { AccountsHomeMobile } from '@src/containers/accounts/accounts-home-mobile'
import { MobileFooterNavigation } from '@src/containers/accounts/navigation'
import { NavigationScrollContainer } from '@src/containers/accounts/navigation-scroll-container'
import { useLocationKey } from '@src/hooks/use-location-key'

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

						{/* TODO: Why does variables not work here [`/${routes.TRANSFER}`, '/${routes.TRANSFER}/:account'] ? */}
						{[`/transfer`, '/transfer/:account'].map(path => (
							<Route
								key="transfer" // to avoid full re-renders when these routes change
								path={path}
								element={
									<AnimatedPage>
										<NavigationScrollContainer
											renderPanel={(scrollableNode: HTMLElement | null) => (
												<AccountTransfer scrollableNode={scrollableNode} />
											)}
										/>
									</AnimatedPage>
								}
							/>
						))}
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
							path={routes.SETTINGS}
							element={
								<AnimatedPage>
									<NavigationScrollContainer
										renderPanel={(scrollableNode: HTMLElement | null, scrollTop: number) => (
											<AccountSettings scrollableNode={scrollableNode} scrollTop={scrollTop} />
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
