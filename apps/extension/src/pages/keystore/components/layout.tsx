import React, { Suspense, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import MotionBox from 'ui/src/components/motion-box'
import MobileScrollArea from 'ui/src/components/scroll-area-radix/mobile'
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
					<Suspense key={key} fallback={<FallbackLoading />}>
						<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
					</Suspense>
				</ScrollPanel>
			</Box>
		</Box>
	)
}

const Layout: React.FC = () => (
	<MotionBox>
		<Nav />
		<MobileScrollArea className={panelViewStyles.panelViewMobileScrollWrapper}>
			<ScrollContent />
		</MobileScrollArea>
	</MotionBox>
)

export default Layout