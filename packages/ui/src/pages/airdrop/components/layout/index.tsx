import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useLocation, useOutlet } from 'react-router-dom'

import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import MobileScrollArea from 'ui/src/components/scroll-area-radix/mobile'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'

const ScrollContent: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()

	return (
		<Suspense key={location.pathname} fallback={<FallbackLoading />}>
			<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
		</Suspense>
	)
}

const Layout: React.FC = () => (
	<MobileScrollArea showTopScrollShadow className={panelViewStyles.panelViewMobileScrollWrapper}>
		<ScrollContent />
	</MobileScrollArea>
)

export default Layout
