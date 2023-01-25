import React, { useState, useEffect } from 'react'
import { CheckIcon } from 'ui/src/components/icons'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
// import { darkTheme, globalStyles } from 'ui/src/theme'
import { AnimatePresence } from 'framer-motion'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
// import geebs from 'design/dist/tailwind-tokens'
import { Accounts } from '../accounts'

import * as styles from './app.css'

// console.log('geebs:', geebs.color)
// console.log('geebs:', geebs.color.core.bleached_silk[0])

const NotFound404 = () => (
	<Box>
		<Box className={styles.teststyle}>404</Box>
		<Box marginTop="small" className={styles.teststyle}>
			geebs
			<Text size="standard">Text we geebin</Text>
		</Box>
	</Box>
)

export const TempNav: React.FC = () => {
	const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
	const [isMounted, setIsMounted] = useState<boolean>(false)

	useEffect(() => {
		const element = window.document.body
		const match = window.matchMedia('(prefers-color-scheme: dark)')
		const isDarkMode = match.matches

		if (isDarkTheme) {
			// element.classList.add(darkTheme)
			element.classList.add('dark')
			element.classList.remove('light')
		} else {
			// element.classList.remove(darkTheme)
			element.classList.remove('dark')
			element.classList.add('light')
		}

		if (!isMounted) {
			if (isDarkMode) {
				// element.classList.add(darkTheme)
				element.classList.add('dark')
				element.classList.remove('light')
				setIsDarkTheme(true)
			}
			setIsMounted(true)
		}
	}, [isDarkTheme])

	return (
		<Box display="flex" position="fixed" className={styles.tempNav}>
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
		</Box>
	)
}

export const App: React.FC = () => {
	// globalStyles()
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []

	return (
		<div className={styles.container}>
			<TempNav />
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
