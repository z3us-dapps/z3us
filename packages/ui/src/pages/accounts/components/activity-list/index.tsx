import React from 'react'

import { ActivityList } from './components/activity-list'
import { BalanceChart } from './components/balance-chart'
import { Card } from './components/card'

const Sidebar: React.FC = () => (
	<>
		<BalanceChart />
		<Card />
		<ActivityList />
	</>
)

export default Sidebar
