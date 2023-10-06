import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useOutlet } from 'react-router-dom'

import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { LayoutTwoColumn } from 'ui/src/components/layout/layout-two-column'
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
						<Suspense key={location.pathname} fallback={<FallbackLoading />}>
							<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
						</Suspense>
					</AnimatePresence>
				}
			/>
		</MotionBox>
	)
}

export default Layout
