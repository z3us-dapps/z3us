import clsx from 'clsx'
import React, { Suspense, useEffect, useMemo } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useMatch, useMatches, useOutlet, useParams } from 'react-router-dom'
import useMeasure from 'react-use-measure'
import { useWindowSize } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import MotionBox from 'ui/src/components/motion-box'
import MobileScrollArea from 'ui/src/components/scroll-area-radix/mobile'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'
import { useIsActivitiesVisible } from 'ui/src/pages/accounts/hooks/use-is-activities-visible'

import { ActivityList } from '../activity-list/components/activity-list'
import { Breadcrumbs } from './components/breadcrumbs'
import { MobileBackground } from './components/mobile/background'
import { MobileScrollingButtons } from './components/mobile/scrolling-buttons'
import { AccountTotalValue } from './components/total-value'
import * as styles from './styles.css'

interface IProps {
	isMobile: boolean
	isNftCollectionOrList: boolean
	isNftCollection: boolean
}

const ScrollContent: React.FC<IProps> = ({ isMobile, isNftCollectionOrList, isNftCollection }) => {
	const location = useLocation()
	const outlet = useOutlet()
	const matches = useMatches()
	const isActivitiesVisible = useIsActivitiesVisible()
	const { scrollableNode } = useScroll()

	const sidebars = matches
		.filter(match => Boolean((match.handle as any)?.sidebar))
		.map(match => (match.handle as any).sidebar)

	const [sidebar] = sidebars.reverse()
	const key = useMemo(() => location.pathname.split('/')[2] || '-', [location.pathname])

	const [wrapperRef, { top }] = useMeasure()
	const { height } = useWindowSize()
	const mobileMinHeight = Math.max(height - top - 48, 435)

	useEffect(() => {
		if (isMobile) {
			scrollableNode.scrollTo({ top: 0 })
		}
	}, [location.pathname, isMobile])

	return (
		<Box className={panelViewStyles.panelViewWrapper}>
			<Box
				ref={wrapperRef}
				className={clsx(
					panelViewStyles.panelViewLeftWrapper,
					!isNftCollectionOrList && panelViewStyles.panelViewResourceWrapper,
				)}
				style={{ minHeight: `${mobileMinHeight}px` }}
			>
				<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
					<Box className={styles.accountsStickyWrapper}>
						<Breadcrumbs />
						<AccountTotalValue />
					</Box>
					<Suspense key={key} fallback={<FallbackLoading />}>
						<ErrorBoundary fallbackRender={FallbackRenderer}>
							<Box className={styles.outletTabletWrapper}>{outlet}</Box>
							<Box className={styles.outletMobileWrapper}>
								{isActivitiesVisible ? <ActivityList className={styles.outletMobileWrapper} /> : outlet}
							</Box>
						</ErrorBoundary>
					</Suspense>
				</ScrollPanel>
			</Box>
			{isNftCollectionOrList && <MobileScrollingButtons isStickyBottom={isNftCollection} />}
			<Box
				className={clsx(
					panelViewStyles.panelViewRightWrapper,
					isNftCollection && panelViewStyles.panelViewRightRelativeWrapper,
				)}
			>
				<ScrollPanel showTopScrollShadow={false} scrollParent={isMobile ? scrollableNode : undefined}>
					<Box className={panelViewStyles.panelViewRightScrollWrapper}>
						<Suspense key={location.pathname} fallback={<FallbackLoading />}>
							<ErrorBoundary fallbackRender={FallbackRenderer}>{sidebar}</ErrorBoundary>
						</Suspense>
					</Box>
				</ScrollPanel>
			</Box>
		</Box>
	)
}

const Layout: React.FC = () => {
	const isMobile = useIsMobileWidth()
	const { resourceId } = useParams()

	const isNftCollection = useMatch('/accounts/:accountId/nfts/:resourceId')
	const isNftCollectionOrList = !resourceId || !!isNftCollection

	return (
		<MotionBox>
			<Box className={panelViewStyles.panelViewOuterWrapper}>
				<MobileBackground />
				<MobileScrollArea
					className={panelViewStyles.panelViewMobileScrollWrapper}
					showTopScrollShadow={isMobile}
					disabled={!isMobile}
				>
					<ScrollContent
						isMobile={isMobile}
						isNftCollectionOrList={isNftCollectionOrList}
						isNftCollection={!!isNftCollection}
					/>
				</MobileScrollArea>
			</Box>
		</MotionBox>
	)
}

export default Layout
