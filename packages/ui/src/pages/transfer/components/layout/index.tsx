import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { LayoutTwoColumn } from 'ui/src/components/layout/layout-two-column'
import MotionBox from 'ui/src/components/motion-box'

import Navigation from './components/navigation'
import TransferWrapper from './components/transfer-wrapper'
import * as styles from './styles.css'

const Layout: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()
	const matches = useMatches()

	const titles = matches
		.filter(match => Boolean((match.handle as any)?.title))
		.map(match => (match.handle as any).title)

	const [title] = titles.reverse()

	return (
		<MotionBox>
			<LayoutTwoColumn
				leftCol={<Navigation />}
				rightCol={
					<AnimatePresence initial={false}>
						<TransferWrapper title={title}>
							<Box className={styles.pageWrapper}>
								<Suspense key={location.pathname} fallback={<FallbackLoading />}>
									<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
								</Suspense>
							</Box>
						</TransferWrapper>
					</AnimatePresence>
				}
			/>
		</MotionBox>
	)
}

export default Layout
