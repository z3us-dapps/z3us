import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import MotionBox from 'ui/src/components/motion-box'
import { ScrollPanel } from 'ui/src/components/scroll-panel'

const Accounts: React.FC = () => {
	const navigate = useNavigate()

	function OnClick() {
		navigate(-1)
	}

	return (
		<MotionBox>
			<ScrollPanel>
				<Box padding="large">
					<h1>accounts</h1>
					<button type="button" style={{ display: 'block' }} onClick={OnClick}>
						Back
					</button>

					<p>
						Adipisicing velit cupidatat duis velit eiusmod. Pariatur tempor laboris est veniam aliqua reprehenderit
						exercitation in pariatur labore minim officia quis pariatur. Pariatur amet sit qui ea nisi. Est ut et veniam
						commodo sunt Lorem commodo qui cupidatat laboris proident.
					</p>
				</Box>
			</ScrollPanel>
		</MotionBox>
	)
}

export default Accounts
