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
import { AccountsHomeDesktop } from '@src/containers/playground/containers/accounts/accounts-home-desktop'
import { DesktopNavigation as Navigation } from '@src/containers/playground/containers/accounts/navigation'
import { NavigationScrollContainer } from '@src/containers/playground/containers/accounts/navigation-scroll-container'
import { useLocationKey } from '@src/containers/playground/hooks/use-location-key'

import * as styles from './accounts-desktop.css'

export const AccountsDesktop = (): JSX.Element => {
	const { location, locationKey } = useLocationKey()

	console.log('DESKTOOP LOGGSSS')

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
									<NavigationScrollContainer
										isMobileNavVisible={false}
										renderPanel={(scrollableNode: HTMLElement | null, scrollTop: number) => (
											<AccountTransfer scrollableNode={scrollableNode} scrollTop={scrollTop} />
										)}
									/>
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
		</Box>
	)
}
