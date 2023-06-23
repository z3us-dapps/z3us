/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnimatePresence, m as motion } from 'framer-motion'
import NextLink from 'next/link'
import React from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { routes } from 'ui/src/constants/routes'
import { Accounts } from 'ui/src/containers/accounts'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import * as styles from './app-page.css'

const AppPage: React.FC = () => {
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []
	const isMobile = useIsMobileWidth()
	return (
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
					path="*"
					element={
						<AnimatedPage>
							<div>
								<div>
									<h1>404</h1>
								</div>
							</div>
						</AnimatedPage>
					}
				/>
			</Routes>
		</AnimatePresence>
	)
}

export default AppPage

// export const AppPage = () => {
// 	return (
// 		// eslint-disable-next-line react/button-has-type
// 		<Box className={styles.landingWrapper}>
// 			<Box component="ul" display="flex" gap="medium">
// 				<li>
// 					<Link to="/">Home</Link>
// 				</li>
// 				<li>
// 					<Link to="/about">About</Link>
// 				</li>
// 				<li>
// 					<Link to="/topics">Topics</Link>
// 				</li>
// 				<li>
// 					<NextLink href="/settings">Settings (SSR)</NextLink>
// 				</li>
// 				<li>
// 					<NextLink href="/terms">Terms (SSR)</NextLink>
// 				</li>
// 			</Box>
// 			<Routes>
// 				<Route path="/about" element={<h1>About</h1>} />
// 				<Route path="/topics" element={<h1>Topics</h1>} />
// 				<Route path="/" element={<h1>Home</h1>} />
// 			</Routes>
// 		</Box>
// 	)
// }
