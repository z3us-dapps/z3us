import clsx from 'clsx'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useMatch } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { AddressBookIcon, CoinsIcon, Settings2Icon } from 'ui/src/components/icons'
import { LayoutTwoCol } from 'ui/src/components/layout/layout-two-col'
import { MobileStackedNavigation } from 'ui/src/components/layout/mobile-stacked-navigation'
import { PillNavigation } from 'ui/src/components/pill-navigation'

import { ScrollPanel } from '../scroll-panel'
import * as styles from './account-settings.css'
import { SettingsAccounts } from './settings-accounts'
import { SettingsAddressBook } from './settings-address-book'
import { SettingsGeneral } from './settings-general'

const AccountSettings = () => {
	const settingsIndex = useMatch('/accounts/settings')
	const settingsGeneral = useMatch('/accounts/settings/general')
	const isSettingsHome = !!settingsIndex || !!settingsGeneral
	const { t } = useTranslation()

	const settingsMenu = [
		{
			title: t('settings.navigation.generalTitle'),
			subTitle: t('settings.navigation.generalSubTitle'),
			href: '/settings/general',
			icon: <Settings2Icon />,
		},
		{
			title: t('settings.navigation.accountsTitle'),
			subTitle: t('settings.navigation.accountsSubTitle'),
			href: '/settings/accounts',
			icon: <CoinsIcon />,
		},
		{
			title: t('settings.navigation.accountsAddressBookTitle'),
			subTitle: t('settings.navigation.accountsAddressBookSubTitle'),
			href: '/settings/address-book',
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
					showTopScrollShadow
					renderPanel={(scrollableNode: HTMLElement | null) => (
						<AnimatePresence initial={false}>
							<Routes>
								<Route
									index
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
								<Route
									path="general"
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
								<Route
									path="accounts"
									element={
										<AnimatedPage>
											<SettingsAccounts />
										</AnimatedPage>
									}
								/>
								<Route
									path="address-book"
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
