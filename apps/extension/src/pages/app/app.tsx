import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { Toasts } from 'ui/src/components/toasts'
import { Accounts } from 'ui/src/containers/accounts'

import { config } from '@src/config'

import * as styles from './app.css'

if (APP_RADIX && config.isExtensionContext) {
	// eslint-disable-next-line no-console
	import('@src/browser/content-script').catch(console.error)
}

const NotFound = React.lazy(() => import('./pages/404'))
const Radix = React.lazy(() => import('./pages/radix'))

const App: React.FC = () => (
	<div className={styles.container}>
		<AnimatePresence initial={false}>
			<Routes>
				<Route index element={<Navigate to="accounts" />} />
				<Route path="accounts/*" element={<Accounts isNavigationVisible />} />
				{APP_RADIX && <Route path="radix" element={<Radix />} />}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AnimatePresence>
		<Toasts />
	</div>
)

export default App
