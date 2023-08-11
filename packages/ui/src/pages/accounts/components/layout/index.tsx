import { Box } from 'packages/ui/src/components/box'
import Loader from 'packages/ui/src/components/loader'
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import React, { Suspense } from 'react'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'

import MotionBox from 'ui/src/components/motion-box'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { MobileAccountBackground } from '../mobile-account-background'

const ScrollContent: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()
	const matches = useMatches()
	const isMobile = useIsMobileWidth()
	const { scrollableNode } = useScroll()

	const [sidebar] = matches
		.filter(match => Boolean((match.handle as any)?.sidebar))
		.map(match => (match.handle as any).sidebar)

	return (
		<Box className={panelViewStyles.panelViewOuterWrapper}>
			<MobileAccountBackground />
			<ScrollArea
				showTopScrollShadow={false}
				disabled={!isMobile}
				className={panelViewStyles.panelViewMobileScrollWrapper}
			>
				<Box className={panelViewStyles.panelViewWrapper}>
					<Box className={panelViewStyles.panelViewLeftWrapper}>
						<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
							<Suspense key={location.pathname} fallback={<Loader />}>
								{outlet}
							</Suspense>
						</ScrollPanel>
					</Box>
					<Box className={panelViewStyles.panelViewRightWrapper}>
						<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
							<Suspense key={location.pathname} fallback={<Loader />}>
								{sidebar}
							</Suspense>
						</ScrollPanel>
					</Box>
				</Box>
			</ScrollArea>
		</Box>
	)
}

const Layout: React.FC = () => {
	const isMobile = useIsMobileWidth()

	return (
		<MotionBox>
			<Box className={panelViewStyles.panelViewOuterWrapper}>
				<MobileAccountBackground />
				<ScrollArea
					showTopScrollShadow={false}
					disabled={!isMobile}
					className={panelViewStyles.panelViewMobileScrollWrapper}
				>
					<ScrollContent />
				</ScrollArea>
			</Box>
		</MotionBox>
	)
}

export default Layout
