import React from 'react'

import { Box } from 'ui/src/components/box'

import { HomeScrollShadow } from '../home-scroll-shadow'
import HorizontalAccountsScrollList from '../horizontal-accounts-scroll-list'
import { AccountButtons } from './components/account-buttons'
import { ActivityList } from './components/activity-list'
import { BalancePieChart } from './components/balance-pie-chart'
import { SideBarAccountCard } from './components/side-bar-account-card'
import { SideBarTotal } from './components/side-bar-total'
import * as styles from './styles.css'

const Sidebar: React.FC = () => (
	<Box className={styles.sideBarWrapper}>
		<Box display={['none', 'block']}>
			<BalancePieChart />
		</Box>
		<SideBarTotal />
		<SideBarAccountCard />
		<AccountButtons />
		<Box display={['block', 'none']}>
			{/* <HomeScrollShadow /> */}
			<HorizontalAccountsScrollList />
		</Box>
		<ActivityList />
	</Box>
)

export default Sidebar
