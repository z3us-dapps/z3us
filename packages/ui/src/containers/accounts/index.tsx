import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { routes } from 'ui/src/constants/routes'
import { AccountsHome } from 'ui/src/containers/accounts/account-home'
import { AccountSearch } from 'ui/src/containers/accounts/account-search'
import { AccountSettings } from 'ui/src/containers/accounts/account-settings'
import { AccountStaking } from 'ui/src/containers/accounts/account-staking'
import { AccountSwap } from 'ui/src/containers/accounts/account-swap'
import { AccountTransaction } from 'ui/src/containers/accounts/account-transaction'
import { AccountTransfer } from 'ui/src/containers/accounts/account-transfer'
import { DesktopNavigation, MobileFooterNavigation } from 'ui/src/containers/accounts/navigation'
import { useLocationKey } from 'ui/src/hooks/use-location-key'

import * as styles from './accounts.css'

interface IAccountsProps {
	isNavigationVisible?: boolean
}

export const Accounts = (props: IAccountsProps): React.JSX.Element => {
	const { isNavigationVisible } = props
	const { location, locationKey } = useLocationKey()

	return (
		<>
			<Box className={styles.accountsWrapper}>
				{/* NOTE: navigation is conditional because NEXTJS site will header */}
				{isNavigationVisible ? <DesktopNavigation /> : null}
				<Box className={styles.accountsBodyWrapper}>
					<AnimatePresence initial={false}>
						<Routes location={location} key={locationKey}>
							<Route
								path="/*"
								element={
									<AnimatedPage>
										<AccountsHome />
									</AnimatedPage>
								}
							/>
							<Route
								path={`${routes.TRANSFER}/*`}
								element={
									<AnimatedPage>
										<AccountTransfer />
									</AnimatedPage>
								}
							/>
							<Route
								path={routes.STAKING}
								element={
									<AnimatedPage>
										<AccountStaking />
									</AnimatedPage>
								}
							/>
							<Route
								path={routes.SWAP}
								element={
									<AnimatedPage>
										<AccountSwap />
									</AnimatedPage>
								}
							/>
							<Route
								path={`${routes.SETTINGS}/*`}
								element={
									<AnimatedPage>
										<AccountSettings />
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
		</>
	)
}
