import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useRouter, Switch, Route } from 'wouter'
import { useHashLocation } from '@src/hooks/use-hash-location'
import { AnimatedSwitch } from '@src/components/router-animated-switch'
import { RouterScope } from '@src/components/router-scope'
import { Z3usText } from 'ui/src/components/z3us-text'

import { Navigation } from './components/navigation'

import './accounts-desktop.css'

const Home = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-400">home</div>
		<h2>Home</h2>
	</div>
)

const Staking = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-400">account index</div>
	</div>
)

const AccountIndex = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-400">home</div>
		<h2>Accounts index</h2>
	</div>
)

const AccountId = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-400">account id</div>
		<h2>accoutn asdfasdf</h2>
	</div>
)

const AccountIdToken = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-400">account id token</div>
	</div>
)

const AccountStaking = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-100">staking</div>
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
							<Route path="/:id" component={AccountId} />
							<Route path="/:id/:token" component={AccountIdToken} />
						</Switch>
					</motion.div>
				</AnimatePresence>
			</RouterScope>
		</div>
	)
}
