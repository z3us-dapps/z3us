import { AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

import { Box } from 'ui/src/components-v2/box'
import { darkThemeClass, lightThemeClass } from 'ui/src/components-v2/system/theme.css'
import { Text } from 'ui/src/components-v2/typography'
import { CheckIcon, ExternalLinkIcon } from 'ui/src/components/icons'

import { AnimatedPage } from '@src/components/animated-page'
import { routes } from '@src/constants'
import { Accounts } from '@src/containers/accounts'
import { Toasts } from '@src/containers/toasts-container'
import { useIsMobileWidth } from '@src/hooks/use-is-mobile'

import * as styles from './app.css'

const NotFound404 = () => (
	<Box padding="large">
		<Box className={styles.teststyle} paddingTop="large" display="flex" flexDirection="column">
			<Text size="code">code</Text>
			<Text size="xsmall">xsmall</Text>
			<Text size="small">small</Text>
			<Text size="medium">medium</Text>
			<Text size="large">large</Text>
			<Text size="xlarge">xlarge</Text>
			<Text size="xxlarge">xxlarge</Text>
			<Text size="xxxlarge" color="strong">
				Testing new text more bumps on the test
			</Text>
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
			element.classList.add(darkThemeClass as any)
			element.classList.add('dark')
			element.classList.remove('light')
			element.classList.remove(lightThemeClass)
		} else {
			element.classList.remove(darkThemeClass as any)
			element.classList.remove('dark')
			element.classList.add('light')
			element.classList.add(lightThemeClass)
		}

		if (!isMounted) {
			if (isDarkMode) {
				element.classList.add(darkThemeClass as any)
				element.classList.add('dark')
				element.classList.remove('light')
				element.classList.remove(lightThemeClass)
				setIsDarkTheme(true)
			}
			setIsMounted(true)
		}
	}, [isDarkTheme])

	return (
		<Box
			display="flex"
			position="fixed"
			className={styles.tempNav}
			padding="small"
			gap="medium"
			style={{ opacity: '0.2' }}
		>
			<Link to="/">Home</Link>
			<Link to="/connect">connect</Link>
			<button
				onClick={() => {
					// toast.error('Event has not been created', { duration: Infinity })
					// toast.promise(() => new Promise((resolve) => setTimeout(resolve, 2000)), {
					//   loading: 'Loading',
					//   success: 'Success',
					//   error: 'Error',
					// });
					toast('Event has been created', {
						description: 'Monday, January 3rd at 6:00pm',
						icon: <ExternalLinkIcon />,
						// className: 'toast-success',
						descriptionClassName: 'my-toast-description',
						// duration: Infinity,
					})
					// toast('Event has been created', {
					// 	duration: Infinity,
					// 	className: 'my-toast',
					// 	descriptionClassName: 'my-toast-description',
					// })
				}}
				type="button"
			>
				<ExternalLinkIcon />
			</button>
			<button onClick={() => setIsDarkTheme(!isDarkTheme)} type="button">
				<CheckIcon />
			</button>
		</Box>
	)
}

const App: React.FC = () => {
	const location = useLocation()
	const isMobile = useIsMobileWidth()
	const locationArr = location.pathname?.split('/') ?? []

	return (
		<div className={styles.container}>
			{/* TODO: TempNav will go, just to demonstrate route changes   */}
			<TempNav />
			<AnimatePresence initial={false}>
				<Routes location={location} key={locationArr[1]}>
					{['/', routes.ACCOUNTS].map(path => (
						<Route
							key="Accounts" // optional: avoid full re-renders on route changes
							path={path}
							element={<Navigate to={`${routes.ACCOUNTS}/all`} />}
						/>
					))}
					<Route
						path={`${routes.ACCOUNTS}/*`}
						element={
							<AnimatedPage>
								<Accounts isMobile={isMobile} />
							</AnimatedPage>
						}
					/>
					<Route
						path="/connect/*"
						element={
							<AnimatedPage>
								<Box padding="xxxlarge">
									<Box>Connect button here</Box>
									<Box marginTop="large">
										<Box
											component="button"
											onClick={() => {
												// eslint-disable-next-line
												console.log('click')
											}}
										>
											CONNECT
											<CheckIcon />
										</Box>
									</Box>
								</Box>
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
			<Toasts />
		</div>
	)
}

export default App
