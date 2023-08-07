// import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Outlet } from 'react-router-dom'

import { Toasts } from 'ui/src/components/toasts'

import Nav from '../nav'
import * as styles from './styles.css'

const Layout: React.FC = () => (
	<div className={styles.container}>
		<Nav />
		<hr />
		<hr />
		{/* <AnimatePresence initial={false}> */}
		<Outlet />
		{/* </AnimatePresence> */}
		<Toasts />
	</div>
)

export default Layout
