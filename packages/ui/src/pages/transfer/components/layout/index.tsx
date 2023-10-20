import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { FormattedMessage } from 'react-intl'
import { useLocation, useMatches, useOutlet } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { LayoutTwoColumn } from 'ui/src/components/layout/layout-two-column'
import MobileScrollArea from 'ui/src/components/scroll-area-radix/mobile'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'

import Navigation from './components/navigation'
import TransferWrapper from './components/transfer-wrapper'
import * as styles from './styles.css'

const ScrollContent: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()
	const matches = useMatches()

	const titles = matches
		.filter(match => Boolean((match.handle as any)?.title))
		.map(match => (match.handle as any).title)

	const [title] = titles.reverse()

	return (
		<LayoutTwoColumn
			leftCol={<Navigation title={<FormattedMessage id="DtYelJ" defaultMessage="Transfer" />} />}
			rightCol={
				<TransferWrapper title={title}>
					<Box className={styles.pageWrapper}>
						<Suspense key={location.pathname} fallback={<FallbackLoading />}>
							<ErrorBoundary fallbackRender={FallbackRenderer}>{outlet}</ErrorBoundary>
						</Suspense>
					</Box>
				</TransferWrapper>
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
