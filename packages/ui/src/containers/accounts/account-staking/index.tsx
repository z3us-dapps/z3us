/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
import React, { forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Route, Routes, useMatch } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { AddressBookIcon, CoinsIcon, Settings2Icon } from 'ui/src/components/icons'
import { LayoutTwoCol } from 'ui/src/components/layout/layout-two-col'
import { MobileStackedNavigation } from 'ui/src/components/layout/mobile-stacked-navigation'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import * as panelViewStyles from 'ui/src/components/styles/panel-view-styles.css'
import { Table } from 'ui/src/components/table'
import { Text } from 'ui/src/components/typography'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { ScrollPanel } from '../scroll-panel'
import * as styles from './account-staking.css'
import { StakingValidators } from './components/staking-validators'
import { useStakingTable } from './use-staking-table'

const AccountStaking = () => {
	const settingsIndex = useMatch('/accounts/settings')
	const settingsGeneral = useMatch('/accounts/settings/general')
	const isStakingHome = !!settingsIndex || !!settingsGeneral
	const isMobile = useIsMobileWidth()

	const { t } = useTranslation()

	// eslint-disable-next-line arrow-body-style, @typescript-eslint/no-unused-vars
	const useSelectedItem = (href: string): boolean => {
		// const splitPath = href.split('/')
		// const splitPathName = splitPath[3]
		// const locationSplitPath = location.pathname.split('/')
		// const locationSplitPathName = locationSplitPath[3]
		// const isGeneral = !locationSplitPathName && splitPathName === settingsMenuPaths.GENERAL

		// return splitPathName === locationSplitPathName || isGeneral
		return false
	}

	const settingsMenu = [
		{
			title: t('staking.navigation.stakingValidatorsTitle'),
			href: '/staking/validators',
			icon: <Settings2Icon />,
		},
		{
			title: t('staking.navigation.yourStakes'),
			href: '/staking/your-stakes',
			icon: <CoinsIcon />,
		},
		{
			title: t('staking.navigation.stakingValidatorTransactions'),
			href: '/staking/transactions',
			icon: <CoinsIcon />,
		},
	]
	const { items, columns, loading, loadMore, onRowSelected, onEndReached } = useStakingTable()

	return (
		<LayoutTwoCol
			leftCol={
				<LayoutGroup id="account-desktop-nav">
					{settingsMenu.map(({ title: text, href }) => (
						<PillNavigation text={text} key={href} href={href} matchActiveFn={useSelectedItem} />
					))}
				</LayoutGroup>
			}
			rightCol={
				<ScrollPanel
					className={styles.stakingScrollAreaWrapper}
					showTopScrollShadow={false}
					showBottomScrollShadow
					renderPanel={(scrollableNode: HTMLElement | null, isScrolledTop: boolean) => (
						<AnimatePresence initial={false}>
							<Routes>
								<Route
									index
									element={
										<AnimatedPage>
											<Box paddingX="small">
												<MobileStackedNavigation menu={settingsMenu} isVisible={isStakingHome} />
											</Box>
											<Box className={clsx(isStakingHome && styles.stakingHomeWrapper)}>
												<StakingValidators scrollableNode={scrollableNode} isScrolledTop={isScrolledTop} />
											</Box>
										</AnimatedPage>
									}
								/>
								<Route
									path="staking-validators"
									element={
										<AnimatedPage>
											<Box paddingX="small">
												<MobileStackedNavigation menu={settingsMenu} isVisible={isStakingHome} />
											</Box>
											<Box className={clsx(isStakingHome && styles.stakingHomeWrapper)}>
												<StakingValidators scrollableNode={scrollableNode} isScrolledTop={isScrolledTop} />
											</Box>
										</AnimatedPage>
									}
								/>
								<Route
									path="staking-transactions"
									element={
										<AnimatedPage>
											<Box>staking transactions</Box>
										</AnimatedPage>
									}
								/>
							</Routes>
						</AnimatePresence>
					)}
				/>
			}
		/>
	)
}

export default AccountStaking
