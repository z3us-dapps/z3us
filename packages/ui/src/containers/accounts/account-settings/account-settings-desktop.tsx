/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useLocation, useMatch } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { ScrollPanel } from 'ui/src/components/scroll-panel'

import * as styles from './account-settings.css'
import { SettingsAccounts } from './settings-accounts'
import { SettingsAddressBook } from './settings-address-book'
import { SettingsGeneral } from './settings-general'

export const AccountSettingsDesktop = () => {
	const location = useLocation()
	// const { t } = useTranslation()

	return (
		<Box className={styles.settingsDesktopWrapper}>
			<Box className={styles.settingsDesktopContainerWrapper}>
				<Box className={styles.settingsDesktopLeftMenu}>
					<LayoutGroup id="account-desktop-nav">
						{[
							{ text: 'settings', href: '/accounts/settings' },
							{ text: 'accounts', href: '/accounts/settings/accounts' },
							{ text: 'address book', href: '/accounts/settings/address-book' },
							// { text: t('accounts.navigation.swap'), href: accountMenuSlugs.SWAP },
							// { text: t('accounts.navigation.settings'), href: accountMenuSlugs.SETTINGS },
						].map(({ text, href }) => (
							<PillNavigation text={text} key={href} href={href} />
						))}
					</LayoutGroup>
				</Box>
				<Box className={styles.settingsDesktopRightWrapper}>
					<ScrollPanel
						isTopShadowVisible
						renderPanel={(scrollableNode: HTMLElement | null) => (
							<Box position="relative" padding="xlarge">
								<Box position="relative">
									<AnimatePresence initial={false}>
										<Routes location={location} key={location.pathname}>
											{['/', '/general'].map(path => (
												<Route
													key="settingsGeneral" // to avoid full re-renders when these routes change
													path={path}
													element={
														<AnimatedPage>
															<SettingsGeneral />
														</AnimatedPage>
													}
												/>
											))}
											<Route
												path="/accounts"
												element={
													<AnimatedPage>
														<SettingsAccounts />
													</AnimatedPage>
												}
											/>
											<Route
												path="/address-book"
												element={
													<AnimatedPage>
														<SettingsAddressBook scrollableNode={scrollableNode} />
													</AnimatedPage>
												}
											/>
										</Routes>
									</AnimatePresence>
								</Box>
							</Box>
						)}
					/>
				</Box>
			</Box>
		</Box>
	)
}
