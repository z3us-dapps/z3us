import { AnimatePresence, LayoutGroup } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useLocation } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { ScrollPanel } from 'ui/src/components/scroll-panel'

import { AccountTransferDeploy } from './account-transfer-deploy'
import { AccountTransferNfts } from './account-transfer-nfts'
import { AccountTransferRaw } from './account-transfer-raw'
import { AccountTransferTokens } from './account-transfer-tokens'
import * as styles from './account-transfer.css'

export const AccountTransferDesktop = () => {
	const location = useLocation()
	const { t } = useTranslation()

	return (
		<Box className={styles.transferDesktopWrapper}>
			<Box className={styles.transferDesktopContainerWrapper}>
				<Box className={styles.transferDesktopLeftMenu}>
					<LayoutGroup id="account-transfer-nav">
						{[
							{ text: t('accounts.navigation.transferTokens'), href: '/accounts/transfer' },
							{ text: t('accounts.navigation.transferNfts'), href: '/accounts/transfer/nfts' },
							{ text: t('accounts.navigation.transferRaw'), href: '/accounts/transfer/raw' },
							{ text: t('accounts.navigation.transferDeployPackage'), href: '/accounts/transfer/deploy' },
						].map(({ text, href }) => (
							<PillNavigation text={text} key={href} href={href} />
						))}
					</LayoutGroup>
				</Box>
				<Box className={styles.transferDesktopRightWrapper}>
					<ScrollPanel
						isTopShadowVisible={false}
						renderPanel={() => (
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
													<AccountTransferRaw />
												</AnimatedPage>
											}
										/>
										<Route
											path="/deploy"
											element={
												<AnimatedPage>
													<AccountTransferDeploy />
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
