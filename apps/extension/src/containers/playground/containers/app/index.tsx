import React, { useState, useEffect } from 'react'
import { CheckIcon } from 'ui/src/components/icons'
import { darkTheme, globalStyles } from 'ui/src/theme'
import { AnimatePresence, motion } from 'framer-motion'
import { useHashLocation } from '@src/hooks/use-hash-location'
// import { useHashLocation, multipathMatcher } from '@src/hooks/use-hash-location'
import { slugs } from '@src/containers/playground/config'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
// import { Route, Router, Switch, Link } from 'wouter'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Accounts } from '../accounts'

import './app.css'

const NotFound404 = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-400 text-6xl">404</div>
	</div>
)

export const MOTION_VARIANTS = {
	initial: ({ direction }: { direction: 'forward' | 'backward' }) => ({
		x: direction === 'backward' ? '-100%' : '100%',
		transition: {
			type: 'spring',
			duration: 5,
			delay: 0,
		},
	}),
	in: {
		x: 0,
		transition: {
			type: 'spring',
			duration: 1,
			delay: 0,
		},
	},
	out: ({ direction }: { direction: 'forward' | 'backward' }) => ({
		x: direction === 'backward' ? '100%' : '-100%',
		transition: {
			type: 'spring',
			duration: 1,
			delay: 0,
		},
	}),
}

export const TempNav: React.FC = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)

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
			<Link to="/">Home</Link>
			<Link to="/accounts">Accounts</Link>
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

// A simple page with a title (this will be top-level routing)
export const Page = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
	<motion.div
		className="Page"
		custom={{ direction: 'forward' }}
		initial="initial"
		animate="in"
		exit="out"
		variants={MOTION_VARIANTS}
		style={{ width: '100%', position: 'absolute', top: 0, left: 0 }}
	>
		{children}
	</motion.div>
)

// A page which will be nested inside another page. So this will be within a nested route.
export const NestedPage = ({ title, nextPath }: { title: string; nextPath: string }) => (
	<motion.div
		className="NestedPage"
		custom={{ direction: 'forward' }}
		initial="initial"
		animate="in"
		exit="out"
		variants={MOTION_VARIANTS}
		style={{ width: '100%', position: 'absolute', top: 200, left: 0 }}
	>
		<h2>{title}</h2>
		<p>
			This is an element in a group of nested pages
			<br />
			<Link to={nextPath}>Next nested page</Link>
		</p>
	</motion.div>
)

export const App: React.FC = () => {
	globalStyles()
	// const [location] = useHashLocation()
	// const topSlug = location.split('/')?.[1]

	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []

	return (
		<div className="z3-c-app">
			<TempNav />
			{/* <AnimatePresence initial={false} exitBeforeEnter> */}
			<AnimatePresence initial={false}>
				<Routes location={location} key={locationArr[1]}>
					<Route
						path="/"
						element={
							<AnimatedPage>
								<Link to="../page1">Go to page 1</Link>
							</AnimatedPage>
						}
					/>
					<Route
						path="/accounts/*"
						element={
							<AnimatedPage>
								<Accounts />
							</AnimatedPage>
						}
					/>
					<Route
						path="/page1/*"
						element={
							<AnimatedPage>
								<AnimatePresence initial={false}>
									<Routes location={location} key={locationArr[2]}>
										<Route path="/*" element={<NestedPage title="Nested Page 1" nextPath="../nested2" />} />
										<Route path="/nested2" element={<NestedPage title="Nested Page 2" nextPath="../nested3" />} />
										<Route path="/nested3" element={<NestedPage title="Nested Page 3" nextPath="../" />} />
									</Routes>
								</AnimatePresence>
								<Link to="../page2">Next page</Link>
							</AnimatedPage>
						}
					/>
					<Route
						path="/page2/*"
						element={
							<AnimatedPage>
								<Link to="../page1">Next page</Link>
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
	)
}

// <Route path="/accounts" component={Accounts} />
// <Route path="/accounts/:id" component={Accounts} />
// <Route path="/accounts/:id/:token" component={Accounts} />
// <Route path="/:rest*" component={NotFound404} />
