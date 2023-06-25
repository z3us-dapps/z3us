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

const AppPage: React.FC = () => {
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []
	const isMobile = useIsMobileWidth()

	return (
		<AnimatePresence initial={false}>
			<Routes location={location} key={locationArr[1]}>
				<Route
					path={`${routes.ACCOUNTS}/*`}
					element={
						<AnimatedPage>
							<Accounts isMobile={isMobile} isNavigationVisible={false} />
						</AnimatedPage>
					}
				/>
				{/* <Route
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
				/> */}
			</Routes>
		</AnimatePresence>
	)
}

export default AppPage
