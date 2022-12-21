import React, { useState, useEffect } from 'react'
import { CheckIcon } from 'ui/src/components/icons'
import { darkTheme, globalStyles } from 'ui/src/theme'
import { AnimatePresence, motion } from 'framer-motion'
import { useHashLocation } from '@src/hooks/use-hash-location'
// import { useHashLocation, multipathMatcher } from '@src/hooks/use-hash-location'
import { slugs } from '@src/containers/playground/config'
import { Route, Router, Switch, Link } from 'wouter'
import { Accounts } from '../accounts'
import './app.css'

const NotFound404 = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-400 text-6xl">404</div>
	</div>
)

export const TempNav: React.FC = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true)

	useEffect(() => {
		const element = window.document.body
		if (isDarkTheme) {
			element.classList.add(darkTheme)
			element.classList.add('dark')
			element.classList.remove('light')
		} else {
			element.classList.remove(darkTheme)
			element.classList.remove('dark')
			element.classList.add('light')
		}
	}, [isDarkTheme])

	return (
		<nav className="flex gap-3 border-0 fixed bottom-0 left-0 w-screen z-10 opacity-80">
			<Link to={slugs.HOME}>Home</Link>
			<Link to={slugs.ACCOUNTS}>Accounts</Link>
			<Link to="/onboard">Onboarding</Link>
			<Link to="/hw">HW (hardware wallet)</Link>
			<Link to="/cred">Credentials</Link>
			<button
				onClick={() => setIsDarkTheme(!isDarkTheme)}
				className="border border-emerald_green-200 fixed top-0 right-0 z-20 opacity-0 cursor-pointer"
				type="button"
			>
				<CheckIcon />
			</button>
		</nav>
	)
}

export const App: React.FC = () => {
	globalStyles()
	const [location] = useHashLocation()
	const topSlug = location.split('/')?.[1]

	// <Router matcher={multipathMatcher as any} hook={useHashLocation as any}>

	return (
		<div className="z3-c-app">
			<Router hook={useHashLocation as any}>
				<AnimatePresence exitBeforeEnter initial={false}>
					<motion.div
						key={topSlug}
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 0 }}
						exit={{ opacity: 0, y: 0 }}
						transition={{ duration: 0.2 }}
					>
						<Switch key={location} location={location}>
							<Route path="/accounts" component={Accounts} />
							<Route path="/accounts/:id" component={Accounts} />
							<Route path="/accounts/:id/:token" component={Accounts} />
							<Route path="/:rest*" component={NotFound404} />
						</Switch>
					</motion.div>
				</AnimatePresence>
				<TempNav />
			</Router>
		</div>
	)
}
