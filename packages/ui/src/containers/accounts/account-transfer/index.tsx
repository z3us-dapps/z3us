import { AnimatePresence, LayoutGroup } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useLocation } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
// import { Box } from 'ui/src/components/box'
import { LayoutTwoCol } from 'ui/src/components/layout/layout-two-col'
// import { MobileStackedNavigation } from 'ui/src/components/layout/mobile-stacked-navigation'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { ScrollPanel } from 'ui/src/components/scroll-panel'

import { AccountTransferDeploy } from './account-transfer-deploy'
import { AccountTransferNfts } from './account-transfer-nfts'
import { AccountTransferRaw } from './account-transfer-raw'
import { AccountTransferTokens } from './account-transfer-tokens'

// import * as styles from './account-transfer.css'

const AccountTransfer = () => {
	const location = useLocation()
	const { t } = useTranslation()

	const transferMenu = [
		{ title: t('transfer.navigation.transferTokens'), href: '/accounts/transfer' },
		{ title: t('transfer.navigation.transferRaw'), href: '/accounts/transfer/raw' },
		{ title: t('transfer.navigation.transferNfts'), href: '/accounts/transfer/nfts' },
		{ title: t('transfer.navigation.transferDeployPackage'), href: '/accounts/transfer/deploy' },
	]

	return (
		<LayoutTwoCol
			leftCol={
				<LayoutGroup id="account-desktop-nav">
					{transferMenu.map(({ title: text, href }) => (
						<PillNavigation text={text} key={href} href={href} />
					))}
				</LayoutGroup>
			}
			rightCol={
				<ScrollPanel
					isTopShadowVisible
					renderPanel={() => (
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
					)}
				/>
			}
		/>
	)
}

export default AccountTransfer
