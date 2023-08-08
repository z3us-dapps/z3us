// import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { DesktopNavigation } from 'ui/src/components/navigation'
import { Toasts } from 'ui/src/components/toasts'

import * as styles from './styles.css'

const Layout: React.FC = () => (
	<div className={styles.container}>
		<DesktopNavigation />
		<hr />
		<hr />
		{/* <AnimatePresence initial={false}> */}
		<Outlet />
		{/* </AnimatePresence> */}
		<Toasts />
	</div>
)

export default Layout
