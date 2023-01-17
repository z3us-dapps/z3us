import React, { useState, useEffect } from 'react'
import { CheckIcon } from 'ui/src/components/icons'
import { darkTheme, globalStyles } from 'ui/src/theme'
import { AnimatePresence } from 'framer-motion'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { Accounts } from '../accounts'

import './app.css'

const NotFound404 = () => (
	<div>
		<div className="w-48 h-48 bg-vivaldi_red-400 text-6xl">404</div>
	</div>
)

export const TempNav: React.FC = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		const element = window.document.body
		const match = window.matchMedia('(prefers-color-scheme: dark)')
		const isDarkMode = match.matches

		if (isDarkTheme) {
			element.classList.add(darkTheme)
			element.classList.add('dark')
			element.classList.remove('light')
		} else {
			element.classList.remove(darkTheme)
			element.classList.remove('dark')
			element.classList.add('light')
		}

		if (!isMounted) {
			if (isDarkMode) {
				element.classList.add(darkTheme)
				element.classList.add('dark')
				element.classList.remove('light')
				setIsDarkTheme(true)
			}
			setIsMounted(true)
		}
	}, [isDarkTheme])

	return (
		<nav className="flex gap-3 border-0 fixed bottom-0 left-0 w-screen z-10 opacity-10">
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

export const App: React.FC = () => {
	globalStyles()
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []

	return (
		<div className="z3-c-app">
			<TempNav />
			{/* <AnimatePresence initial={false} exitBeforeEnter> */}
			<AnimatePresence initial={false}>
				<Routes location={location} key={locationArr[1]}>
					{['/', '/accounts'].map(path => (
						<Route
							key="Accounts" // optional: avoid full re-renders on route changes
							path={path}
							element={<Navigate to="/accounts/all" />}
						/>
					))}
					<Route
						path="/accounts/*"
						element={
							<AnimatedPage>
								<Accounts />
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
