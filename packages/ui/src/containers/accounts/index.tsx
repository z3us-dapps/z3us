import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { DesktopNavigation, MobileFooterNavigation } from 'ui/src/containers/accounts/navigation'

import * as styles from './accounts.css'

const AccountHome = React.lazy(() => import('./account-home'))
const AccountTransaction = React.lazy(() => import('./account-transaction'))
const AccountTransfer = React.lazy(() => import('./account-transfer'))
const AccountSwap = React.lazy(() => import('./account-swap'))
const AccountSettings = React.lazy(() => import('./account-settings'))
const AccountStaking = React.lazy(() => import('./account-staking'))
const AccountSearch = React.lazy(() => import('./account-search'))

interface IAccountsProps {
	isNavigationVisible?: boolean
}

export const Accounts = (props: IAccountsProps): React.JSX.Element => {
	const { isNavigationVisible } = props

	return (
		<AnimatedPage>
			<Box className={styles.accountsWrapper}>
				{/* NOTE: navigation is conditional because NEXTJS site will render own header */}
				{isNavigationVisible ? <DesktopNavigation /> : null}
				<Box className={styles.accountsBodyWrapper}>
					<AnimatePresence initial={false}>
						<Routes>
							<Route
								index
								element={
									<AnimatedPage>
										<AccountHome />
									</AnimatedPage>
								}
							/>
							<Route
								path="transfer/*"
								element={
									<AnimatedPage>
										<AccountTransfer />
									</AnimatedPage>
								}
							/>
							<Route
								path="staking/*"
								element={
									<AnimatedPage>
										<AccountStaking />
									</AnimatedPage>
								}
							/>
							<Route
								path="swap/*"
								element={
									<AnimatedPage>
										<AccountSwap />
									</AnimatedPage>
								}
							/>
							<Route
								path="settings/*"
								element={
									<AnimatedPage>
										<AccountSettings />
									</AnimatedPage>
								}
							/>
							<Route
								path=":assetType/*"
								element={
									<AnimatedPage>
										<AccountHome />
									</AnimatedPage>
								}
							/>
						</Routes>
					</AnimatePresence>
				</Box>
				<MobileFooterNavigation />
			</Box>
			<AccountTransaction />
			<AccountSearch />
		</AnimatedPage>
	)
}
