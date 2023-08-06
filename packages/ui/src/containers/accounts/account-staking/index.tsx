/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { Table } from 'ui/src/components/table'
import { Text } from 'ui/src/components/typography'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { ScrollPanel } from '../scroll-panel'
import * as styles from './account-staking.css'
import { StakingHeader } from './components/staking-header'
import { useStakingTable } from './use-staking-table'

// eslint-disable-next-line arrow-body-style
const AccountStaking = () => {
	const isMobile = useIsMobileWidth()

	const { items, columns, loading, loadMore, onRowSelected, onEndReached } = useStakingTable()
	return (
		<Box className={panelViewStyles.panelViewOuterWrapper}>
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
									<>
										<StakingHeader scrollableNode={scrollableNode} isScrolledTop={isScrolledTop} />
										<Box className={styles.stakingTableWrapper}>
											<Table
												className={styles.stakingTableMinHeightWrapper}
												styleVariant="primary"
												sizeVariant="large"
												scrollableNode={scrollableNode ?? undefined}
												data={items}
												columns={columns}
												// loading
												loading={loading}
												loadMore={loadMore}
												onRowSelected={onRowSelected}
												// onEndReached={onEndReached}
											/>
										</Box>
									</>
								)}
							/>
						</Box>
						<Box className={panelViewStyles.panelViewRightWrapper}>
							<ScrollPanel
								showTopScrollShadow={false}
								scrollParent={isMobile ? scrollMobileParent : undefined}
								renderPanel={(scrollRef: HTMLElement) => (
									<>
										<Box>Staking Pie Chart</Box>
										<Box>Staking Pie Chart</Box>
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

export default AccountStaking
