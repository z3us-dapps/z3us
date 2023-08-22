import React from 'react'

import { Box } from 'ui/src/components/box'

import { Activity } from '../components/activity'
import { ActivitySearch } from '../components/activity-search'

const Sidebar: React.FC = () => (
	<>
		<Box>account side bar</Box>
		<ActivitySearch />
		<Activity />
	</>
)

export default Sidebar
