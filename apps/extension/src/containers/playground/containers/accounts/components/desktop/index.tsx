import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route } from 'react-router-dom'
import { useLocationKey } from '@src/containers/playground/hooks/use-location-key'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { Navigation } from './components/navigation'
import { AccountsHome } from './components/accounts-home'

import * as styles from './accounts-desktop.css'

const NotFound404 = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-100 text-6xl">Accounts 404 here</div>
	</div>
)

const AccountStaking = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-100">staking</div>
	</div>
)

const AccountSettings = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-300">staking</div>
	</div>
)

const AccountSwap = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-200">Swap</div>
	</div>
)

const AccountTransfer = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-200">transfer</div>
	</div>
)

// export const AccountsDesktop = ({ base }: IProps): JSX.Element => {
export const AccountsDesktop = (): JSX.Element => {
	const { location, locationKey } = useLocationKey()

	return (
		<div className={styles.desktopWrapper}>
			<Navigation />
			<div className={styles.desktopBody}>
				<AnimatePresence initial={false}>
					<Routes location={location} key={locationKey}>
						{['/', '/:account', '/:account/:assetType', '/:account/:assetType/:asset'].map(path => (
							<Route
								key="Accounts" // optional: avoid full re-renders on route changes
								path={path}
								element={
									<AnimatedPage>
										<AccountsHome />
									</AnimatedPage>
								}
							/>
						))}
						<Route
							path="/transfer"
							element={
								<AnimatedPage>
									<AccountTransfer />
								</AnimatedPage>
							}
						/>
						<Route
							path="/staking"
							element={
								<AnimatedPage>
									<AccountStaking />
								</AnimatedPage>
							}
						/>
						<Route
							path="/swap"
							element={
								<AnimatedPage>
									<AccountSwap />
								</AnimatedPage>
							}
						/>
						<Route
							path="/settings"
							element={
								<AnimatedPage>
									<AccountSettings />
								</AnimatedPage>
							}
						/>
						<Route
							path="*"
							element={
								<AnimatedPage>
									<NotFound404 />
								</AnimatedPage>
							}
						/>
					</Routes>
				</AnimatePresence>
			</div>
		</div>
	)
}

AccountsDesktop.defaultProps = {
	base: '',
}
