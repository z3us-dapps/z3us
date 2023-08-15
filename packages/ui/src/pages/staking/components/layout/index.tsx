import { AnimatePresence } from 'framer-motion'
import { Box } from 'packages/ui/src/components/box'
import { useScroll } from 'packages/ui/src/components/scroll-area-radix/use-scroll'
import React, { Suspense } from 'react'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'

import Loader from 'ui/src/components/loader'
import MotionBox from 'ui/src/components/motion-box'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

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
		<>
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
		</>
	)
}

const Layout: React.FC = () => {
	const isMobile = useIsMobileWidth()
	const location = useLocation()

	const matches = useMatches()

	const [validatorPanel] = matches
		.filter(match => Boolean((match.handle as any)?.validatorPanel))
		.map(match => (match.handle as any).validatorPanel)

	return (
		<MotionBox>
			<Box className={panelViewStyles.panelViewOuterWrapper}>
				<ScrollArea
					showTopScrollShadow={false}
					disabled={!isMobile}
					className={panelViewStyles.panelViewMobileScrollWrapper}
				>
					<Box className={panelViewStyles.panelViewWrapper}>
						<ScrollContent />
					</Box>
				</ScrollArea>
			</Box>
			<AnimatePresence initial={false}>
				<Suspense key={`${location.pathname?.split('/').length}`} fallback={<Loader />}>
					{validatorPanel}
				</Suspense>
			</AnimatePresence>
		</MotionBox>
	)
}

export default Layout
