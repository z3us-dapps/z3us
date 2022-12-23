import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, Link, useLocation, useMatch } from 'react-router-dom'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { Navigation } from './components/navigation'

import './accounts-desktop.css'

// When account is selected the send / receive shows
//

const NotFound404 = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-100 text-6xl">Accounts 404</div>
	</div>
)
const AccountActivity = () => {
	// const [match, params] = useRoute('/:account/:asset')
	// console.log('params:', params)
	// console.log('match:', match)
	return (
		<div className="border">
			<div className="border">activity</div>
			<div>asset?: {params?.asset} </div>
		</div>
	)
}

const AccountIndex = () => {
	// const [, accountParams] = useRoute('/:account')
	// const [, assetParams = {}] = useRoute('/:account/:asset')
	// const account = accountParams?.account || assetParams?.account

	const account = useMatch('/accounts/:account')
	// console.log('account:', account)
	const assetType = useMatch('/accounts/:account/:assetType')
	// console.log('assetType:', assetType)
	const asset = useMatch('/accounts/:account/:assetType/:asset')
	// console.log('asset:', asset)

	const a = 1

	return (
		<div className="flex w-full h-full">
			<div className="w-[400px] h-100 bg-vivaldi_red-400 border">
				<p className="text-4xl">Accounts</p>
				<ul>
					<li>
						<Link to="/accounts/acc-877">Account acc-877</Link>
					</li>
					<li>
						<Link to="/accounts/geeb">Account geeb</Link>
					</li>
					<li>
						<Link to="/accounts/heeb">Account heeb</Link>
					</li>
				</ul>
			</div>
			<div className="w-[500px] h-100 bg-vivaldi_red-400 border">
				<ul className="flex gap-2">
					<li>
						<Link to="/accounts/acc-877/all">all</Link>
					</li>
					<li>
						<Link to="/accounts/acc-877/tokens">Tokens</Link>
					</li>
					<li>
						<Link to="/accounts/acc-877/nfts">NFTS</Link>
					</li>
					<li>
						<Link to="/accounts/acc-877/lp-tokens">LP Tokens</Link>
					</li>
					<li>
						<Link to="/accounts/acc-877/badges">Badges</Link>
					</li>
				</ul>

				{/* <div className="pt-3 pl-3 font-bold text-xl">??{account ? <p>Account selected: {account}</p> : null}</div> */}

				<ul className="flex flex-col gap-1 mt-4 pl-2">
					<li>{/* <Link to={`/${account}/asset-1`}>asset 1</Link> */}</li>
				</ul>
			</div>
			<div className="w-64 h-100 bg-vivaldi_red-400 border flex-1">
				<p className="text-4xl">activity</p>

				{/* <AccountActivity /> */}
			</div>
		</div>
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

export const useLocationKey = (key: string) => {
	const animatedKeys = ['transfer', 'staking', 'settings', 'swap']
	const prevHash = useRef(null)
	const isAnimateRoute = animatedKeys.includes(key)
	const isPrevAnimateRoute = animatedKeys.includes(prevHash.current)

	useEffect(() => {
		if (isAnimateRoute && isPrevAnimateRoute) {
			prevHash.current = key
		}
	}, [key])

	return !isAnimateRoute && !isPrevAnimateRoute ? prevHash.current : key
}

// export const AccountsDesktop = ({ base }: IProps): JSX.Element => {
export const AccountsDesktop = (): JSX.Element => {
	// console.log('base:', base)
	// const motionLocation = useAccountsMotionLocation(location)
	// const accountMatch = useMatch('/accounts/:account')
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []
	const locationKey = useLocationKey(locationArr[2] ?? '')

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
						{/* <Route */}
						{/* 	path="/:account/*" */}
						{/* 	// path="/:account/:assetType" */}
						{/* 	// path="/:account/:assetType:/:asseet" */}
						{/* 	element={ */}
						{/* 		<AnimatedPage> */}
						{/* 			<AccountIndex /> */}
						{/* 		</AnimatedPage> */}
						{/* 	} */}
						{/* /> */}
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

// <Route path="/" component={AccountIndex} />
// <Route path="/staking" component={AccountStaking} />
// <Route path="/swap" component={AccountSwap} />
// <Route path="/settings" component={AccountSettings} />
// <Route path="/transfer" component={AccountTransfer} />
// <Route path="/:account" component={AccountIndex} />
// <Route path="/:account/:asset" component={AccountIndex} />
