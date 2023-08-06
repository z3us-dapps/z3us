import React from 'react'

import { Box } from 'ui/src/components/box'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { AccountActivity } from 'ui/src/containers/accounts/account-activity'
import { AccountActivitySearch } from 'ui/src/containers/accounts/account-activity-search'
import { AccountAllChart } from 'ui/src/containers/accounts/account-all-chart'
import { AccountAssetInfo } from 'ui/src/containers/accounts/account-asset-info'
import { AccountAssets } from 'ui/src/containers/accounts/account-assets'
import { MobileAccountBackground } from 'ui/src/containers/accounts/account-assets/components/mobile-account-background'
import { AccountCard } from 'ui/src/containers/accounts/account-card'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { ScrollPanel } from '../scroll-panel'

const AccountsHome = () => {
	const isMobile = useIsMobileWidth()

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
								renderPanel={(scrollableNode: HTMLElement, isScrolledTop: boolean) => (
									<AccountAssets scrollableNode={scrollableNode} isScrolledTop={isScrolledTop} />
								)}
							/>
						</Box>
						<Box className={panelViewStyles.panelViewRightWrapper}>
							<ScrollPanel
								showTopScrollShadow={false}
								scrollParent={isMobile ? scrollMobileParent : undefined}
								renderPanel={(scrollRef: HTMLElement) => (
									<>
										<AccountAllChart />
										<AccountCard />
										<AccountAssetInfo />
										<AccountActivitySearch scrollableNode={scrollRef} />
										<AccountActivity scrollableNode={scrollRef} />
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

export default AccountsHome
