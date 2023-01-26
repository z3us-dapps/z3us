import React, { useState, useEffect } from 'react'
import { CheckIcon } from 'ui/src/components/icons'
import { Box } from 'ui/src/components-v2/box'
import { lightThemeClass, darkThemeClass } from 'ui/src/components-v2/system/theme.css'
import { Text } from 'ui/src/components-v2/typography'
// import { darkTheme, globalStyles } from 'ui/src/theme'
import { AnimatePresence } from 'framer-motion'
import { AnimatedPage } from '@src/containers/playground/components/animated-route'
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
// import twTokens from 'design/dist/tailwind-tokens'
import { Accounts } from '../accounts'

import * as styles from './app.css'

const NotFound404 = () => (
	<Box padding="large">
		<Box className={styles.teststyle}>404</Box>
		<Text size="code">HEyyyy</Text>
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
			element.classList.add(darkThemeClass)
			element.classList.add('dark')
			element.classList.remove('light')
			element.classList.remove(lightThemeClass)
		} else {
			// element.classList.remove(darkTheme)
			element.classList.remove(darkThemeClass)
			element.classList.remove('dark')
			element.classList.add('light')
			element.classList.add(lightThemeClass)
		}

		if (!isMounted) {
			if (isDarkMode) {
				// element.classList.add(darkTheme)

				element.classList.add(darkThemeClass)
				element.classList.add('dark')
				element.classList.remove('light')
				element.classList.remove(lightThemeClass)
				setIsDarkTheme(true)
			}
			setIsMounted(true)
		}
	}, [isDarkTheme])

	return (
		<Box display="flex" position="fixed" className={styles.tempNav} padding="large">
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
