/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx, { ClassValue } from 'clsx'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useLocation, useMatch } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import { AnimatedPage } from '@src/components/animated-page'
import { Link } from '@src/components/link'
import { ScrollPanel } from '@src/components/scroll-panel'

import * as styles from './account-settings.css'
import { SettingsGeneral } from './settings-general'
import { SettingsAddressBook } from './settings-address-book'

interface IAccountSettingsDesktopRequiredProps {}

interface IAccountSettingsDesktopOptionalProps {
	className?: ClassValue
}

interface IAccountSettingsDesktopProps
	extends IAccountSettingsDesktopRequiredProps,
		IAccountSettingsDesktopOptionalProps {}

const defaultProps: IAccountSettingsDesktopOptionalProps = {
	className: undefined,
}

const MenuItemDesktop = ({ text, href }) => {
	const selected = useMatch(href)

	return (
		<Link to={href} className={styles.settingsDesktopNavigationLink} underline="never">
			{selected ? <motion.span layoutId="underline" className={styles.settingsDesktopNavigationActive} /> : null}
			<Text
				size="medium"
				color={null}
				className={clsx(styles.settingsDesktopNavigationText, selected && styles.settingsDesktopNavigationTextAcitve)}
				capitalizeFirstLetter
			>
				{text}
			</Text>
		</Link>
	)
}

export const AccountSettingsDesktop = forwardRef<HTMLElement, IAccountSettingsDesktopProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const location = useLocation()
		// const { t } = useTranslation()

		return (
			<Box ref={ref} className={clsx(styles.settingsDesktopWrapper, className)}>
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
								<MenuItemDesktop text={text} key={href} href={href} />
							))}
						</LayoutGroup>
					</Box>
					<Box className={styles.settingsDesktopRightWrapper}>
						<ScrollPanel
							isTopShadowVisible
							renderPanel={(scrollableNode: HTMLElement | null) => {
								const test = 1
								return (
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
																<Box>
																	<Box>accounts</Box>
																</Box>
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
								)
							}}
						/>
					</Box>
				</Box>
			</Box>
		)
	},
)

AccountSettingsDesktop.defaultProps = defaultProps
