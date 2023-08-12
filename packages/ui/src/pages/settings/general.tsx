import React from 'react'

import { Box } from 'ui/src/components/box'
import MotionBox from 'ui/src/components/motion-box'
import { ScrollPanel } from 'ui/src/components/scroll-panel'

const General: React.FC = () => (
	<MotionBox>
		<ScrollPanel>
			<Box padding="large">
				<h1>General</h1>
				<p>
					Adipisicing velit cupidatat duis velit eiusmod. Pariatur tempor laboris est veniam aliqua reprehenderit
					exercitation in pariatur labore minim officia quis pariatur. Pariatur amet sit qui ea nisi. Est ut et veniam
					commodo sunt Lorem commodo qui cupidatat laboris proident.
				</p>
			</Box>
		</ScrollPanel>
	</MotionBox>
)

export default General
