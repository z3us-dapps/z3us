import React, { Suspense, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import MobileScrollArea from 'ui/src/components/scroll-area-radix/mobile'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import Nav from './nav'
import * as styles from './styles.css'

const ScrollContent: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()
	const isMobile = useIsMobileWidth()
	const { scrollableNode } = useScroll()

	const key = useMemo(() => location.pathname.split('/')[1], [location.pathname])

	return (
		<Box className={styles.keystoreFlexWrapper}>
			<Box className={styles.keystoreInnerWrapper}>
				<ScrollPanel
					scrollParent={isMobile ? scrollableNode : undefined}
					className={styles.keystoreInnerScrollPanelWrapper}
				>
					<Suspense key={key} fallback={<FallbackLoading />}>
						<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
					</Suspense>
				</ScrollPanel>
			</Box>
		</Box>
	)
}

const Layout: React.FC = () => (
	<Box className={styles.keystoreOuterWrapper}>
		<Box className={styles.keystoreOuterFlexWrapper}>
			<Nav />
			<MobileScrollArea showTopScrollShadow className={panelViewStyles.panelViewMobileScrollWrapper}>
				<ScrollContent />
			</MobileScrollArea>
		</Box>
	</Box>
)

export default Layout
