/* eslint-disable */
// @ts-nocheck
// TODO: fix
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { routes } from 'ui/src/constants/routes'
import { AccountSettingsDesktop } from 'ui/src/containers/accounts/account-settings'
import { AccountStaking } from 'ui/src/containers/accounts/account-staking'
import { AccountSwap } from 'ui/src/containers/accounts/account-swap'
import { AccountsTransferDesktop } from 'ui/src/containers/accounts/account-transfer/account-transfer-desktop'
import { AccountsHomeDesktop } from 'ui/src/containers/accounts/accounts-home-desktop'
import { DesktopNavigation as Navigation } from 'ui/src/containers/accounts/navigation'
import { useLocationKey } from 'ui/src/hooks/use-location-key'

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
						<Route
							path={routes.TRANSFER}
							element={
								<AnimatedPage>
									<AccountsTransferDesktop />
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
									<AccountSettingsDesktop />
								</AnimatedPage>
							}
						/>
					</Routes>
				</AnimatePresence>
			</Box>
		</Box>
	)
}
