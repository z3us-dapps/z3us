import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, Link, useLocation, useMatch, Navigate } from 'react-router-dom'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { Navigation } from './components/navigation'

import './accounts-desktop.css'

const NotFound404 = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-100 text-6xl">Accounts 404</div>
	</div>
)

const useAccountParams = () => {
	const accountMatch = useMatch('/accounts/:account')
	const assetTypeMatch = useMatch('/accounts/:account/:assetType')
	const assetMatch = useMatch('/accounts/:account/:assetType/:asset')

	let account: string
	let assetType: string
	let asset: string

	if (accountMatch) {
		account = accountMatch.params.account
	} else if (assetTypeMatch) {
		account = assetTypeMatch.params.account
		assetType = assetTypeMatch.params.assetType
	} else if (assetMatch) {
		account = assetMatch.params.account
		assetType = assetMatch.params.assetType
		asset = assetMatch.params.asset
	}

	return { account, assetType, asset }
}

const AccountIndex = () => {
	const { account, assetType, asset } = useAccountParams()

	return (
		<>
			{!assetType && <Navigate replace to={`/accounts/${account}/all`} />}
			<div className="flex w-full h-full">
				<div className="w-[400px] h-100 bg-vivaldi_red-400">
					<p className="text-4xl">Accounts</p>
					<ul>
						<li>
							<Link to={`/accounts/acc-877/${assetType}`}>Account acc-877</Link>
						</li>
						<li>
							<Link to={`/accounts/geeb/${assetType}`}>geeb</Link>
						</li>
						<li>
							<Link to={`/accounts/heeb/${assetType}`}>heeb</Link>
						</li>
					</ul>
				</div>
				<div className="w-[500px] h-100 bg-vivaldi_red-200 opacity-20">
					<ul className="flex gap-2">
						<li>
							<Link to={`/accounts/${account}/all`}>all</Link>
						</li>
						<li>
							<Link to={`/accounts/${account}/tokens`}>tokens</Link>
						</li>
						<li>
							<Link to={`/accounts/${account}/nfts`}>nfts</Link>
						</li>
						<li>
							<Link to={`/accounts/${account}/lp-tokens`}>LP tokens</Link>
						</li>
						<li>
							<Link to={`/accounts/${account}/badges`}>badges</Link>
						</li>
					</ul>

					<p className="py-3 font-bold text-2xl">
						<Link to={`/accounts/${account}/${assetType}/oci`}>asset oci</Link>
					</p>

					<div className="pt-3 pl-3 font-bold text-xl">??{account ? <p>Account selected: {account}</p> : null}</div>
					<div className="pt-3 pl-3 font-bold text-xl">
						<div className="pt-3 pl-3 font-bold text-xl">
							??{assetType ? <p>asset type selected: {assetType}</p> : null}
						</div>
						??{asset ? <p>asset selected: {asset}</p> : null}
					</div>

					<ul className="flex flex-col gap-1 mt-4 pl-2">
						<li>{/* <Link to={`/${account}/asset-1`}>asset 1</Link> */}</li>
					</ul>
				</div>
				<div className="w-64 h-100 bg-vivaldi_red-300 flex-1 opacity-20">
					<p className="text-4xl">activity</p>

					{/* <AccountActivity /> */}
				</div>
			</div>
		</>
	)
}

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
		<div className="w-48 h-48 bg-vivaldi_red-200">
			<p className="text-4xl">transfer</p>
		</div>
	</div>
)

export const useLocationKey = () => {
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []
	const key = locationArr[2] ?? ''

	const animatedKeys = ['transfer', 'staking', 'settings', 'swap']
	const prevHash = useRef(null)
	const isAnimateRoute = animatedKeys.includes(key)
	const isPrevAnimateRoute = animatedKeys.includes(prevHash.current)

	useEffect(() => {
		if (isAnimateRoute && isPrevAnimateRoute) {
			prevHash.current = key
		}
	}, [key])

	const locationKey = !isAnimateRoute && !isPrevAnimateRoute ? prevHash.current : key

	return { location, locationKey }
}

// export const AccountsDesktop = ({ base }: IProps): JSX.Element => {
export const AccountsDesktop = (): JSX.Element => {
	const { location, locationKey } = useLocationKey()

	return (
		<div className="z3-c-accounts-desktop">
			<Navigation />
			<div className="z3-c-accounts-desktop__body">
				<AnimatePresence initial={false}>
					<Routes location={location} key={locationKey}>
						{['/:account', '/:account/:assetType', '/:account/:assetType/:asset'].map(path => (
							<Route
								key="Accounts" // optional: avoid full re-renders on route changes
								path={path}
								element={
									<AnimatedPage>
										<AccountIndex />
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
