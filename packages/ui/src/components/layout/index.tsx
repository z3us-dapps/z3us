import { AnimatePresence } from 'framer-motion'
import React, { Suspense, useMemo } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { DesktopNavigation } from 'ui/src/components/navigation'
import { Toasts } from 'ui/src/components/toasts'

import Loader from '../loader'
import * as styles from './styles.css'

const Layout: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()

	const key = useMemo(() => location.pathname.split('/')[1], [location.pathname])

	return (
		<div className={styles.container}>
			<DesktopNavigation />
			<AnimatePresence initial={false}>
				<Suspense key={key} fallback={<Loader />}>
					{outlet}
				</Suspense>
			</AnimatePresence>
			<Toasts />
		</div>
	)
}

export default Layout
