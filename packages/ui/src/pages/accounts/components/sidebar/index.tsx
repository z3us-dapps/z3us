import React from 'react'

import { ActivityList } from 'ui/src/components/activity-list'
import { Box } from 'ui/src/components/box'

import HorizontalAccountsScrollList from '../horizontal-accounts-scroll-list'
import { CardBackground } from '../layout/components/background'
import { AccountButtons } from './components/account-buttons'
import { BalancePieChart } from './components/balance-pie-chart'
import { SideBarAccountCard } from './components/side-bar-account-card'
import { SideBarTotal } from './components/side-bar-total'
import * as styles from './styles.css'

const Sidebar: React.FC = () => (
	<Box className={styles.sideBarWrapper}>
		<CardBackground view="sidebar" />
		<BalancePieChart />
		<SideBarTotal />
		<SideBarAccountCard />
		<Box display={['block', 'none']}>
			<HorizontalAccountsScrollList />
		</Box>
		<AccountButtons />
		<ActivityList display={['none', 'flex']} />
	</Box>
)

export default Sidebar
