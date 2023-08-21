import { AnimatePresence } from 'framer-motion'
import React, { Suspense, useMemo } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { DesktopNavigation, MobileFooterNavigation } from 'ui/src/components/navigation'
import { Toasts } from 'ui/src/components/toasts'

import Loader from '../loader'
import * as styles from './styles.css'
import { Transaction } from './transaction'

const Layout: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()

	const key = useMemo(() => location.pathname.split('/')[1], [location.pathname])

	return (
		<Box className={styles.layoutWrapper}>
			<DesktopNavigation />
			<Box className={styles.layoutRouteWrapper}>
				<AnimatePresence initial={false}>
					<Suspense key={key} fallback={<Loader />}>
						{outlet}
					</Suspense>
				</AnimatePresence>
			</Box>
			<MobileFooterNavigation />
			<Transaction />
			<Toasts />
		</Box>
	)
}

export default Layout
