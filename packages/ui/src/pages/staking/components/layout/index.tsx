import React, { Suspense } from 'react'
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

import { ValidatorPanel } from '../validator-panel'

const ScrollContent: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()
	const isMobile = useIsMobileWidth()
	const { scrollableNode } = useScroll()

	return (
		<>
			<Box className={panelViewStyles.panelViewLeftWrapper}>
				<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
					<Suspense key={location.pathname} fallback={<FallbackLoading />}>
						<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
					</Suspense>
				</ScrollPanel>
			</Box>
			<Box className={panelViewStyles.panelViewRightWrapper}>
				<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
					<Box padding="large">
						<h1>Staking sidebar</h1>
					</Box>
				</ScrollPanel>
			</Box>
		</>
	)
}

const Layout: React.FC = () => (
	<MotionBox>
		<Box className={panelViewStyles.panelViewOuterWrapper}>
			<MobileScrollArea className={panelViewStyles.panelViewMobileScrollWrapper}>
				<Box className={panelViewStyles.panelViewWrapper}>
					<ScrollContent />
				</Box>
			</MobileScrollArea>
		</Box>
		<ValidatorPanel />
	</MotionBox>
)

export default Layout
