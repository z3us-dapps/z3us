import { Box } from 'packages/ui/src/components/box'
import React from 'react'
import { Outlet, useMatches } from 'react-router-dom'

import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { ScrollPanel } from 'ui/src/components/scroll-panel'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { MobileAccountBackground } from './mobile-account-background'
import Nav from './nav'

const Layout: React.FC = () => {
	const isMobile = useIsMobileWidth()
	const matches = useMatches()

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
				renderScrollArea={(scrollMobileParent: HTMLElement) => (
					<Box className={panelViewStyles.panelViewWrapper}>
						<Box className={panelViewStyles.panelViewLeftWrapper}>
							<ScrollPanel
								showTopScrollShadow={false}
								scrollParent={isMobile ? scrollMobileParent : undefined}
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								renderPanel={(scrollableNode: HTMLElement, isScrolledTop: boolean) => (
									<Box padding="xlarge">
										<Nav />
										<Box padding="large">
											<hr />
										</Box>
										<Box>
											<Outlet />
										</Box>
										{/* <AccountAssets scrollableNode={scrollableNode} isScrolledTop={isScrolledTop} /> */}
									</Box>
								)}
							/>
						</Box>
						<Box className={panelViewStyles.panelViewRightWrapper}>
							<ScrollPanel
								showTopScrollShadow={false}
								scrollParent={isMobile ? scrollMobileParent : undefined}
								// eslint-disable-next-line @typescript-eslint/no-unused-vars
								renderPanel={(scrollRef: HTMLElement) => (
									<>
										<Box>{sidebar}</Box>
										{/* <AccountAllChart />
										<AccountCard />
										<AccountAssetInfo />
										<AccountActivitySearch scrollableNode={scrollRef} />
										<AccountActivity scrollableNode={scrollRef} /> */}
									</>
								)}
							/>
						</Box>
					</Box>
				)}
			/>
		</Box>
	)
}

export default Layout
