import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Accounts } from 'ui/src/containers/accounts'

const AppPage: React.FC = () => (
	<AnimatePresence initial={false}>
		<Routes>
			<Route path="accounts/*" element={<Accounts isNavigationVisible />} />
		</Routes>
	</AnimatePresence>
)

export default AppPage
