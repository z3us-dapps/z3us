import React, { Suspense, useMemo } from 'react'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import Loader from 'ui/src/components/loader'
import MotionBox from 'ui/src/components/motion-box'
import MobileScrollArea from 'ui/src/components/scroll-area-radix/mobile'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { Breadcrumbs } from './components/breadcrumbs'
import { MobileBackground } from './components/mobile/background'
// import { MobileScrollingBackground } from './components/mobile/scrolling-background'
import { MobileScrollingButtons } from './components/mobile/scrolling-buttons'
import { AccountTotalValue } from './components/total-value'
import * as styles from './styles.css'

const ScrollContent: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()
	const matches = useMatches()
	const isMobile = useIsMobileWidth()
	const { scrollableNode } = useScroll()

	const sidebars = matches
		.filter(match => Boolean((match.handle as any)?.sidebar))
		.map(match => (match.handle as any).sidebar)

	const [sidebar] = sidebars.reverse()
	const key = useMemo(() => location.pathname.split('/')[2] || '-', [location.pathname])

	return (
		<Box className={panelViewStyles.panelViewWrapper}>
			<Box className={panelViewStyles.panelViewLeftWrapper}>
				<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
					<Box className={styles.accountsStickyWrapper}>
						<Breadcrumbs />
						<AccountTotalValue />
					</Box>
					<Suspense key={key} fallback={<Loader />}>
						{outlet}
					</Suspense>
				</ScrollPanel>
			</Box>
			{/* <MobileScrollingBackground /> */}
			<MobileScrollingButtons />
			<Box className={panelViewStyles.panelViewRightWrapper}>
				<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
					<Suspense key={location.pathname} fallback={<Loader />}>
						{sidebar}
					</Suspense>
				</ScrollPanel>
			</Box>
		</Box>
	)
}

const Layout: React.FC = () => (
	<MotionBox>
		<Box className={panelViewStyles.panelViewOuterWrapper}>
			<MobileBackground />
			<MobileScrollArea className={panelViewStyles.panelViewMobileScrollWrapper}>
				<ScrollContent />
			</MobileScrollArea>
		</Box>
	</MotionBox>
)

export default Layout
