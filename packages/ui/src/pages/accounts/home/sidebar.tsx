import React from 'react'

import { Activity } from './components/activity'
import { ActivitySearch } from './components/activity-search'
import { BalanceChart } from './components/balance-chart'

const Sidebar: React.FC = () => (
	<>
		<BalanceChart />
		<ActivitySearch />
		<Activity />
	</>
)

export default Sidebar
