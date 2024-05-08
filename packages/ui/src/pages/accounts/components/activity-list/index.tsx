import React from 'react'

import { Box } from 'ui/src/components/box'

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
		<Box display={['block', 'none']}>
			<HorizontalAccountsScrollList />
		</Box>
		<AccountButtons />
		<ActivityList />
	</Box>
)

export default Sidebar
