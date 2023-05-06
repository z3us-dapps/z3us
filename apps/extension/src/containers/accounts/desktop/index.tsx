import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'

import { AnimatedPage } from '@src/components/animated-route'
// eslint-disable-next-line
import { accountMenuSlugs, routes } from '@src/constants'
import { AccountSettings } from '@src/containers/accounts/account-settings'
import { AccountStaking } from '@src/containers/accounts/account-staking'
import { AccountSwap } from '@src/containers/accounts/account-swap'
import { AccountsHomeDesktop } from '@src/containers/accounts/accounts-home-desktop'
import { AccountsTransferDesktop } from '@src/containers/accounts/accounts-transfer-desktop'
import { DesktopNavigation as Navigation } from '@src/containers/accounts/navigation'
// import { NavigationScrollContainer } from '@src/containers/accounts/navigation-scroll-container'
import { useLocationKey } from '@src/hooks/use-location-key'

import * as styles from './accounts-desktop.css'

export const AccountsDesktop = (): JSX.Element => {
	const { location, locationKey } = useLocationKey()

	return (
		<Box className={styles.desktopWrapper}>
			<Navigation />
			<Box className={styles.desktopBody}>
				<AnimatePresence initial={false}>
					<Routes location={location} key={locationKey}>
						<Route
							path="/*"
							element={
								<AnimatedPage>
									<AccountsHomeDesktop />
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
										<AccountsTransferDesktop />
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
									<AccountSettings />
								</AnimatedPage>
							}
						/>
					</Routes>
				</AnimatePresence>
			</Box>
		</Box>
	)
}
