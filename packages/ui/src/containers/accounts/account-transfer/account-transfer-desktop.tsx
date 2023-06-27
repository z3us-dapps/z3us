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

import { AccountTransferNfts } from './account-transfer-nfts'
import { AccountTransferTokens } from './account-transfer-tokens'
import * as styles from './account-transfer.css'

// TODO: refactor to component used by settings / transfer
const MenuItemDesktop = ({ text, href }: { text: string; href: string }) => {
	const selected = useMatch(href)

	return (
		<Link to={href} className={styles.transferDesktopNavigationLink} underline="never">
			{selected ? <motion.span layoutId="underline" className={styles.transferDesktopNavigationActive} /> : null}
			<Text
				size="medium"
				color={null}
				className={clsx(styles.transferDesktopNavigationText, selected && styles.transferDesktopNavigationTextActive)}
				capitalizeFirstLetter
			>
				{text}
			</Text>
		</Link>
	)
}

interface IAccountTransferDesktopProps {
	className?: ClassValue
}

export const AccountTransferDesktop = forwardRef<HTMLElement, IAccountTransferDesktopProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className } = props

		const location = useLocation()
		// const { t } = useTranslation()

		return (
			<Box ref={ref} className={clsx(styles.transferDesktopWrapper, className)}>
				<Box className={styles.transferDesktopContainerWrapper}>
					<Box className={styles.transferDesktopLeftMenu}>
						<LayoutGroup id="account-transfer-nav">
							{[
								{ text: 'transfer tokens', href: '/accounts/transfer' },
								{ text: 'transfer nfts', href: '/accounts/transfer/nfts' },
								{ text: 'send raw transaction', href: '/accounts/transfer/raw' },
								{ text: 'deploy package', href: '/accounts/transfer/deploy' },
								// { text: t('accounts.navigation.swap'), href: accountMenuSlugs.SWAP },
								// { text: t('accounts.navigation.settings'), href: accountMenuSlugs.SETTINGS },
							].map(({ text, href }) => (
								<MenuItemDesktop text={text} key={href} href={href} />
							))}
						</LayoutGroup>
					</Box>
					<Box className={styles.transferDesktopRightWrapper}>
						<ScrollPanel
							isTopShadowVisible={false}
							renderPanel={(scrollableNode: HTMLElement | null) => {
								// TODO: remove
								const test = 1
								return (
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
															<AccountTransferNfts />
														</AnimatedPage>
													}
												/>
												<Route
													path="/raw"
													element={
														<AnimatedPage>
															<Box>send raw</Box>
														</AnimatedPage>
													}
												/>
												<Route
													path="/deploy"
													element={
														<AnimatedPage>
															<Box>deploy package</Box>
														</AnimatedPage>
													}
												/>
											</Routes>
										</AnimatePresence>
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
