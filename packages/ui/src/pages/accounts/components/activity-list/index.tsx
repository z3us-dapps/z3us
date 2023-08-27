import React from 'react'

import { ActivityList } from './components/activity-list'
import { ActivitySearch } from './components/activity-search'
import { BalanceChart } from './components/balance-chart'

const Sidebar: React.FC = () => (
	<>
		<BalanceChart />
		<ActivitySearch />
		<ActivityList />
	</>
)

export default Sidebar
