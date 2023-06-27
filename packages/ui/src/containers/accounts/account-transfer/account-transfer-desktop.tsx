/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ClassValue } from 'clsx'
import clsx from 'clsx'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Route, Routes, useLocation, useMatch } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import { Text } from 'ui/src/components/typography'

import { AccountTransferTokens } from './account-transfer-tokens'
import * as styles from './account-transfer.css'

// import { SettingsAccounts } from './settings-accounts'
// import { SettingsAddressBook } from './settings-address-book'
// import { SettingsGeneral } from './settings-general'

const MenuItemDesktop = ({ text, href }: { text: string; href: string }) => {
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

interface IAccountSettingsDesktopProps {
	className?: ClassValue
}

export const AccountTransferDesktop = forwardRef<HTMLElement, IAccountSettingsDesktopProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const location = useLocation()
		// const { t } = useTranslation()

		return (
			<Box ref={ref} className={clsx(styles.settingsDesktopWrapper, className)}>
				<Box className={styles.settingsDesktopContainerWrapper}>
					<Box className={styles.settingsDesktopLeftMenu}>
						<LayoutGroup id="account-transfer-nav">
							{[
								{ text: 'transfer tokens', href: '/accounts/transfer' },
								{ text: 'transfer nfts', href: '/accounts/transfer/nfts' },
								{ text: 'send raw', href: '/accounts/transfer/raw' },
								{ text: 'deploy', href: '/accounts/transfer/deploy' },
								// { text: t('accounts.navigation.swap'), href: accountMenuSlugs.SWAP },
								// { text: t('accounts.navigation.settings'), href: accountMenuSlugs.SETTINGS },
							].map(({ text, href }) => (
								<MenuItemDesktop text={text} key={href} href={href} />
							))}
						</LayoutGroup>
					</Box>
					<Box className={styles.settingsDesktopRightWrapper}>
						<ScrollPanel
							isTopShadowVisible={false}
							renderPanel={(scrollableNode: HTMLElement | null) => {
								// TODO: remove
								const test = 1
								return (
									<Box position="relative" padding="xlarge">
										<Box position="relative">
											<AnimatePresence initial={false}>
												<Routes location={location} key={location.pathname}>
													{['/', '/transfer'].map(path => (
														<Route
															key="transferTokens" // to avoid full re-renders when these routes change
															path={path}
															element={
																<AnimatedPage>
																	<AccountTransferTokens />
																</AnimatedPage>
															}
														/>
													))}
													<Route
														path="/nfts"
														element={
															<AnimatedPage>
																<Box>transfer nfts</Box>
																{/* <SettingsAccounts /> */}
															</AnimatedPage>
														}
													/>
													<Route
														path="/raw"
														element={
															<AnimatedPage>
																<Box>send raw</Box>
																{/* <SettingsAddressBook scrollableNode={scrollableNode} /> */}
															</AnimatedPage>
														}
													/>
													<Route
														path="/deploy"
														element={
															<AnimatedPage>
																<Box>deploy package</Box>
																{/* <SettingsAccounts /> */}
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
