import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { LayoutTwoColumn } from 'ui/src/components/layout/layout-two-column'
import Loader from 'ui/src/components/loader'
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
						<Suspense key={location.pathname} fallback={<Loader />}>
							<TransferWrapper title={title}>
								<Box className={styles.pageWrapper}>{outlet}</Box>
							</TransferWrapper>
						</Suspense>
					</AnimatePresence>
				}
			/>
		</MotionBox>
	)
}

export default Layout
