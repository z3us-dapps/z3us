import React, { Suspense, useMemo } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import Loader from 'ui/src/components/loader'
import MotionBox from 'ui/src/components/motion-box'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import Nav from './nav'

const ScrollContent: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()
	const isMobile = useIsMobileWidth()
	const { scrollableNode } = useScroll()

	const key = useMemo(() => location.pathname.split('/')[1], [location.pathname])

	return (
		<Box className={panelViewStyles.panelViewWrapper}>
			<Box className={panelViewStyles.panelViewLeftWrapper}>
				<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
					<Suspense key={key} fallback={<Loader />}>
						{outlet}
					</Suspense>
				</ScrollPanel>
			</Box>
		</Box>
	)
}

const Layout: React.FC = () => {
	const isMobile = useIsMobileWidth()

	return (
		<MotionBox>
			<Nav />
			<ScrollArea
				showTopScrollShadow={false}
				disabled={!isMobile}
				className={panelViewStyles.panelViewMobileScrollWrapper}
			>
				<ScrollContent />
			</ScrollArea>
		</MotionBox>
	)
}

export default Layout
