import React from 'react'

import { AccountButtons } from './components/account-buttons'
import { ActivityList } from './components/activity-list'
import { BalancePieChart } from './components/balance-pie-chart'
import { SideBarAccountCard } from './components/side-bar-account-card'
import { SideBarTotal } from './components/side-bar-total'

const Sidebar: React.FC = () => (
	<>
		<BalancePieChart />
		<SideBarTotal />
		<SideBarAccountCard />
		<AccountButtons />
		<ActivityList />
	</>
)

export default Sidebar
