import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Toasts } from 'ui/src/components/toasts'
import { routes } from 'ui/src/constants/routes'
import { Accounts } from 'ui/src/containers/accounts'

import { config } from '@src/config'

import * as styles from './app.css'

if (APP_RADIX && config.isExtensionContext) {
	// eslint-disable-next-line no-console
	import('@src/browser/content-script').catch(console.error)
}

const Connect = React.lazy(() => import('./pages/connect'))
const NotFound = React.lazy(() => import('./pages/404'))
const Pairing = React.lazy(() => import('./pages/pairing'))
const Options = React.lazy(() => import('./pages/options'))

const App: React.FC = () => {
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []

	return (
		<div className={styles.container}>
			<AnimatePresence initial={false}>
				<Routes location={location} key={locationArr[1]}>
					{['/'].map(path => (
						<Route
							key={routes.ACCOUNTS} // optional: avoid full re-renders on route changes
							path={path}
							element={<Navigate to={routes.ACCOUNTS} />}
						/>
					))}
					<Route
						path={`${routes.ACCOUNTS}/*`}
						element={
							<AnimatedPage>
								<Accounts isNavigationVisible />
							</AnimatedPage>
						}
					/>
					{APP_RADIX && <Route path={`${routes.PAIRING}/*`} element={<Pairing />} />}
					{APP_RADIX && <Route path={`${routes.OPTIONS}/*`} element={<Options />} />}
					<Route path="/connect/*" element={<Connect />} />
					<Route
						path="*"
						element={
							<AnimatedPage>
								<NotFound />
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
