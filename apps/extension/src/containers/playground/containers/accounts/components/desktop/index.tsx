import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useRoute, useRouter, Switch, Route } from 'wouter'
import { useHashLocation } from '@src/hooks/use-hash-location'
import { RouterScope } from '@src/components/router-scope'

import { Navigation } from './components/navigation'

import './accounts-desktop.css'

// When account is selected the send / receive shows

const AccountActivity = () => {
	const [match, params] = useRoute('/:account/:asset')
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
	const [, accountParams] = useRoute('/:account')
	const [, assetParams = {}] = useRoute('/:account/:asset')
	const account = accountParams?.account || assetParams?.account

	return (
		<div className="flex w-full h-full">
			<div className="w-[400px] h-100 bg-vivaldi_red-400 border">
				<p className="text-4xl">Accounts</p>
				<ul>
					<li>
						<Link to="/acc-877">Account acc-877</Link>
					</li>
					<li>
						<Link to="/geeb">Account geeb</Link>
					</li>
					<li>
						<Link to="/heeb">Account heeb</Link>
					</li>
				</ul>
			</div>
			<div className="w-[500px] h-100 bg-vivaldi_red-400 border">
				<ul className="flex gap-2">
					<li>
						<p className="text">All</p>
					</li>
					<li>
						<p className="text-">Tokens</p>
					</li>
					<li>
						<p className="text-">NFTS</p>
					</li>
					<li>
						<p className="text-l">LP Tokens</p>
					</li>
					<li>
						<p className="text-">Badges</p>
					</li>
				</ul>

				<div className="pt-3 pl-3 font-bold text-xl">??{account ? <p>Account selected: {account}</p> : null}</div>

				<ul className="flex flex-col gap-1 mt-4 pl-2">
					<li>
						<Link to={`/${account}/asset-1`}>asset 1</Link>
					</li>
				</ul>
			</div>
			<div className="w-64 h-100 bg-vivaldi_red-400 border flex-1">
				<p className="text-4xl">activity</p>

				<AccountActivity />
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

export interface IProps {
	base: string
	location: string
}

export const AccountsDesktop = ({ base, location }: IProps): JSX.Element => {
	const a = 1
	return (
		<div className="z3-c-accounts-desktop">
			<Navigation />

			<RouterScope base={base} hook={useHashLocation}>
				<AnimatePresence exitBeforeEnter>
					<motion.div
						key={location}
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 0 }}
						exit={{ opacity: 0, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<Switch key={location} location={location}>
							<Route path="/" component={AccountIndex} />
							<Route path="/staking" component={AccountStaking} />
							<Route path="/swap" component={AccountSwap} />
							<Route path="/settings" component={AccountSettings} />
							<Route path="/transfer" component={AccountTransfer} />
							<Route path="/:account" component={AccountIndex} />
							<Route path="/:account/:asset" component={AccountIndex} />
							{/* <Route path={['/:account', '/:account/:asset'] as array} component={AccountIndex} /> */}
						</Switch>
					</motion.div>
				</AnimatePresence>
			</RouterScope>
		</div>
	)
}

// <Route path="/info">
//               <Redirect to="/about" />
//             </Route>
