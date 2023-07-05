/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, Navigate, Route, Routes, useLocation, useMatch } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { AddressBookIcon, ArrowRightIcon, CoinsIcon, Settings2Icon } from 'ui/src/components/icons'
import { LayoutTwoCol } from 'ui/src/components/layout/layout-two-col'
import { MobileStackedNavigation } from 'ui/src/components/layout/mobile-stacked-navigation'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { settingsMenuPaths, settingsMenuSlugs } from 'ui/src/constants/settings'

import { ScrollPanel } from '../scroll-panel'
import * as styles from './account-settings.css'
import { SettingsAccounts } from './settings-accounts'
import { SettingsAddressBook } from './settings-address-book'
import { SettingsGeneral } from './settings-general'

const AccountSettings = () => {
	const location = useLocation()
	const isSettingsHome = location.pathname === settingsMenuSlugs.HOME
	const { t } = useTranslation()

	const settingsMenu = [
		{
			title: t('settings.navigation.generalTitle'),
			subTitle: t('settings.navigation.generalSubTitle'),
			href: settingsMenuSlugs.GENERAL,
			icon: <Settings2Icon />,
		},
		{
			title: t('settings.navigation.accountsTitle'),
			subTitle: t('settings.navigation.accountsSubTitle'),
			href: settingsMenuSlugs.ACCOUNTS,
			icon: <CoinsIcon />,
		},
		{
			title: t('settings.navigation.accountsAddressBookTitle'),
			subTitle: t('settings.navigation.accountsAddressBookSubTitle'),
			href: settingsMenuSlugs.ADDRESS_BOOK,
			icon: <AddressBookIcon />,
		},
	]

	return (
		<LayoutTwoCol
			leftCol={
				<LayoutGroup id="account-desktop-nav">
					{settingsMenu.map(({ title: text, href }) => (
						<PillNavigation text={text} key={href} href={href} />
					))}
				</LayoutGroup>
			}
			rightCol={
				<ScrollPanel
					isTopShadowVisible
					renderPanel={(scrollableNode: HTMLElement | null) => (
						<AnimatePresence initial={false}>
							<Routes location={location} key={location.pathname}>
								{['/', `/${settingsMenuPaths.GENERAL}`].map(path => (
									<Route
										key={settingsMenuPaths.GENERAL} // to avoid full re-renders when these routes change
										path={path}
										element={
											<AnimatedPage>
												<Box paddingX="small">
													<MobileStackedNavigation menu={settingsMenu} isVisible={isSettingsHome} />
												</Box>
												<Box className={clsx(isSettingsHome && styles.settingsHomeWrapper)}>
													<SettingsGeneral />
												</Box>
											</AnimatedPage>
										}
									/>
								))}
								<Route
									path={`/${settingsMenuPaths.ACCOUNTS}`}
									element={
										<AnimatedPage>
											<SettingsAccounts />
										</AnimatedPage>
									}
								/>
								<Route
									path={`/${settingsMenuPaths.ADDRESS_BOOK}`}
									element={
										<AnimatedPage>
											<SettingsAddressBook scrollableNode={scrollableNode} />
										</AnimatedPage>
									}
								/>
							</Routes>
						</AnimatePresence>
					)}
				/>
			}
		/>
	)
}

export default AccountSettings
