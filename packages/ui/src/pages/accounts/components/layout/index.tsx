import clsx from 'clsx'
import React, { Suspense } from 'react'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import Loader from 'ui/src/components/loader'
import MotionBox from 'ui/src/components/motion-box'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { Breadcrumbs } from './components/breadcrumbs'
import { MobileBackground } from './components/mobile/background'
import { MobileScrollingBackground } from './components/mobile/scrolling-background'
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

	const [sidebar] = sidebars.toReversed()

	return (
		<>
			<MobileBackground />
			<ScrollArea
				showTopScrollShadow={false}
				disabled={!isMobile}
				className={panelViewStyles.panelViewMobileScrollWrapper}
			>
				<Box className={panelViewStyles.panelViewWrapper}>
					<Box className={panelViewStyles.panelViewLeftWrapper}>
						<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
							<Breadcrumbs />
							<Box className={clsx(styles.routesWrapper)}>
								<Box className={styles.scrollingWrapper}>
									<MobileScrollingBackground />
									<MobileScrollingButtons />
									<AccountTotalValue />
									<Box className={styles.contentWrapper}>
										<Box className={styles.tableWrapper}>
											<Suspense key={location.pathname} fallback={<Loader />}>
												{outlet}
											</Suspense>
										</Box>
									</Box>
								</Box>
							</Box>
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
		</>
	)
}

const Layout: React.FC = () => {
	const isMobile = useIsMobileWidth()

	return (
		<MotionBox>
			<Box className={panelViewStyles.panelViewOuterWrapper}>
				<MobileBackground />
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
