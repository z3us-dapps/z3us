/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, Route, Routes, useLocation, useMatch } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { ArrowLeftIcon, ChevronDown3Icon, ChevronLeftIcon, HomeIcon } from 'ui/src/components/icons'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import { Text } from 'ui/src/components/typography'
import { settingsMenuSlugs } from 'ui/src/constants/settings'

import * as styles from './account-settings.css'
import { SettingsMobileNavigation } from './components/settings-mobile-navigation'
import { SettingsAccounts } from './settings-accounts'
import { SettingsAddressBook } from './settings-address-book'
import { SettingsGeneral } from './settings-general'

export const AccountSettings = () => {
	const location = useLocation()
	const isSettingsHome = location.pathname === '/accounts/settings'
	const { t } = useTranslation()

	return (
		<Box className={styles.settingsWrapper}>
			<Box className={styles.settingsContainerWrapper}>
				<Box className={styles.settingsDesktopLeftMenu}>
					<LayoutGroup id="account-desktop-nav">
						{[
							{ text: t('settings.navigation.generalTitle'), href: settingsMenuSlugs.GENERAL },
							{ text: t('settings.navigation.accountsTitle'), href: settingsMenuSlugs.ACCOUNTS },
							{ text: t('settings.navigation.accountsAddressBookTitle'), href: settingsMenuSlugs.ADDRESS_BOOK },
						].map(({ text, href }) => (
							<PillNavigation text={text} key={href} href={href} />
						))}
					</LayoutGroup>
				</Box>
				<Box className={styles.settingsRightWrapper}>
					<ScrollPanel
						isTopShadowVisible
						renderPanel={(scrollableNode: HTMLElement | null) => (
							<Box className={styles.settingsScrollPanelWrapper}>
								<AnimatePresence initial={false}>
									<Routes location={location} key={location.pathname}>
										{['/', '/general'].map(path => (
											<Route
												key="settingsGeneral" // to avoid full re-renders when these routes change
												path={path}
												element={
													<AnimatedPage>
														<SettingsMobileNavigation
															className={clsx(
																isSettingsHome
																	? styles.settingsHomeMobileMenuVisibleWrapper
																	: styles.settingsHomeMobileMenuHiddenWrapper,
															)}
														/>
														<Box className={clsx(isSettingsHome && styles.settingsHomeWrapper)}>
															<SettingsGeneral />
														</Box>
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
						)}
					/>
				</Box>
			</Box>
		</Box>
	)
}
