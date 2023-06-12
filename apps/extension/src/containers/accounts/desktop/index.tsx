import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'

import { AnimatedPage } from '@src/components/animated-page'
import { routes } from '@src/constants'
import { AccountSettingsDesktop } from '@src/containers/accounts/account-settings'
import { AccountStaking } from '@src/containers/accounts/account-staking'
import { AccountSwap } from '@src/containers/accounts/account-swap'
import { AccountsTransferDesktop } from '@src/containers/accounts/account-transfer/account-transfer-desktop'
import { AccountsHomeDesktop } from '@src/containers/accounts/accounts-home-desktop'
import { DesktopNavigation as Navigation } from '@src/containers/accounts/navigation'
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
