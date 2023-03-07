import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'

import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { routes } from '@src/containers/playground/config'
import { AccountSettings } from '@src/containers/playground/containers/accounts/account-settings'
import { AccountStaking } from '@src/containers/playground/containers/accounts/account-staking'
import { AccountSwap } from '@src/containers/playground/containers/accounts/account-swap'
import { AccountTransfer } from '@src/containers/playground/containers/accounts/account-transfer'
import { AccountsHomeMobile } from '@src/containers/playground/containers/accounts/accounts-home-mobile'
import { MobileNavigation as Navigation } from '@src/containers/playground/containers/accounts/navigation'
import { useLocationKey } from '@src/containers/playground/hooks/use-location-key'

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
									<AccountTransfer />
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
							path={routes.SETTINGS}
							element={
								<AnimatedPage>
									<AccountSettings />
								</AnimatedPage>
							}
						/>
					</Routes>
				</AnimatePresence>
			</Box>
			<Navigation />
		</Box>
	)
}
