import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { LayoutTwoColumn } from 'ui/src/components/layout/layout-two-column'
import Loader from 'ui/src/components/loader'
import MotionBox from 'ui/src/components/motion-box'

import { DesktopNavigation } from '../navigation'

const Layout: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()

	return (
		<MotionBox>
			<LayoutTwoColumn
				leftCol={<DesktopNavigation />}
				rightCol={
					<AnimatePresence initial={false}>
						<Suspense key={location.pathname} fallback={<Loader />}>
							{outlet}
						</Suspense>
					</AnimatePresence>
				}
			/>
		</MotionBox>
	)
}

export default Layout
