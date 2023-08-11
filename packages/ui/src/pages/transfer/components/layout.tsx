import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import Loader from 'ui/src/components/loader'
import MotionBox from 'ui/src/components/motion-box'

import Nav from './nav'

const Layout: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()

	return (
		<MotionBox>
			<Nav />
			<AnimatePresence initial={false}>
				<Suspense key={location.pathname} fallback={<Loader />}>
					{outlet}
				</Suspense>
			</AnimatePresence>
		</MotionBox>
	)
}

export default Layout
