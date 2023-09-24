import { assignInlineVars } from '@vanilla-extract/dynamic'
import clsx, { type ClassValue } from 'clsx'
import React, { Suspense, useLayoutEffect, useMemo, useRef, useState } from 'react'
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
import { MobileScrollingButtons } from './components/mobile/scrolling-buttons'
import { AccountTotalValue } from './components/total-value'
import * as styles from './styles.css'

const ScrollContent: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()
	const matches = useMatches()
	const isMobile = useIsMobileWidth()
	const { scrollableNode } = useScroll()
	const ref = useRef(null)
	const [height, setHeight] = useState(0)

	const sidebars = matches
		.filter(match => Boolean((match.handle as any)?.sidebar))
		.map(match => (match.handle as any).sidebar)

	const [sidebar] = sidebars.reverse()
	const key = useMemo(() => location.pathname.split('/')[2] || '-', [location.pathname])

	useLayoutEffect(() => {
		const updateSize = () => setHeight(ref.current.clientHeight)
		window.addEventListener('resize', updateSize)
		updateSize()
		return () => window.removeEventListener('resize', updateSize)
	})

	return (
		<Box className={styles.wrapper}>
			<Box className={styles.content}>
				<Box className={styles.mobileHidden}>
					<Breadcrumbs />
				</Box>
				<Box
					className={styles.stickyBelowSidebar}
					style={assignInlineVars({ [styles.distanceFromTop]: `${height}px` })}
				>
					<AccountTotalValue />
				</Box>
				<Box
					className={clsx(styles.stickyBelowSidebar, styles.mobileOnlyVisible)}
					style={assignInlineVars({ [styles.distanceFromTop]: `${height}px` })}
				>
					<MobileScrollingButtons />
				</Box>
				<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
					<Suspense key={key} fallback={<Loader />}>
						{outlet}
					</Suspense>
				</ScrollPanel>
			</Box>
			<Box className={styles.sidebar} ref={ref}>
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
		<MobileScrollArea className={panelViewStyles.panelViewMobileScrollWrapper}>
			<ScrollContent />
		</MobileScrollArea>
	</MotionBox>
)

export default Layout
