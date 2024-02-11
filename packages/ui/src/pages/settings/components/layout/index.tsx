import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FormattedMessage } from 'react-intl'
import { useLocation, useOutlet } from 'react-router-dom'

import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { LayoutTwoColumn } from 'ui/src/components/layout/layout-two-column'
import MobileScrollArea from 'ui/src/components/scroll-area-radix/mobile'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'

import { DesktopNavigation } from '../navigation'

const ScrollContent: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()

	return (
		<LayoutTwoColumn
			leftCol={<DesktopNavigation title={<FormattedMessage id="D3idYv" defaultMessage="Settings" />} />}
			rightCol={
				<Suspense key={location.pathname} fallback={<FallbackLoading />}>
					<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
				</Suspense>
			}
		/>
	)
}

const Layout: React.FC = () => (
	<MobileScrollArea showTopScrollShadow className={panelViewStyles.panelViewMobileScrollWrapper}>
		<ScrollContent />
	</MobileScrollArea>
)

export default Layout
