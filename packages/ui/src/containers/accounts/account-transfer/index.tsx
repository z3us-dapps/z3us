import { AnimatePresence, LayoutGroup } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { LayoutTwoCol } from 'ui/src/components/layout/layout-two-col'
import { PillNavigation } from 'ui/src/components/pill-navigation'

import { ScrollPanel } from '../scroll-panel'
import { AccountTransferDeploy } from './account-transfer-deploy'
import { AccountTransferNfts } from './account-transfer-nfts'
import { AccountTransferRaw } from './account-transfer-raw'
import { AccountTransferTokens } from './account-transfer-tokens'

const AccountTransfer = () => {
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
					showTopScrollShadow
					renderPanel={() => (
						<AnimatePresence initial={false}>
							<Routes>
								<Route
									index
									element={
										<AnimatedPage>
											<AccountTransferTokens />
										</AnimatedPage>
									}
								/>
								<Route
									path="tokens"
									element={
										<AnimatedPage>
											<AccountTransferTokens />
										</AnimatedPage>
									}
								/>
								<Route
									path="nfts"
									element={
										<AnimatedPage>
											<AccountTransferNfts />
										</AnimatedPage>
									}
								/>
								<Route
									path="raw"
									element={
										<AnimatedPage>
											<AccountTransferRaw />
										</AnimatedPage>
									}
								/>
								<Route
									path="deploy"
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
