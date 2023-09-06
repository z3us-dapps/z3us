import React from 'react'

import { ActivityList } from './components/activity-list'
import { BalanceChart } from './components/balance-chart'

const Sidebar: React.FC = () => (
	<>
		<BalanceChart />
		<ActivityList />
	</>
)

export default Sidebar
