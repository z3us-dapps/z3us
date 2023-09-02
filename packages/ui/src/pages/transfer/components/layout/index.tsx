import { AnimatePresence } from 'framer-motion'
import React, { Suspense } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { LayoutTwoColumn } from 'ui/src/components/layout/layout-two-column'
import Loader from 'ui/src/components/loader'
import MotionBox from 'ui/src/components/motion-box'
import Translation from 'ui/src/components/translation'

import Navigation from '../navigation'
import { TransferWrapper } from '../transfer-wrapper'
import * as styles from './styles.css'

const Layout: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()

	return (
		<MotionBox>
			<LayoutTwoColumn
				leftCol={<Navigation />}
				rightCol={
					<AnimatePresence initial={false}>
						<Suspense key={location.pathname} fallback={<Loader />}>
							<TransferWrapper title={<Translation capitalizeFirstLetter text="transfer.title" />}>
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
