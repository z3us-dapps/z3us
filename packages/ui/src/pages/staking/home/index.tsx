import React from 'react'

import { Box } from 'ui/src/components/box'
import { Link } from 'ui/src/components/router-link'

const Home: React.FC = () => (
	<Box>
		<h1>Staking</h1>
		<Box padding="large" display="flex" gap="small">
			<Link to="/accounts">accounts</Link>
			<Link to="/staking">staking</Link>
			<Link to="/staking/validator_tdx_d_1sw59jzn7cgp0c94xqfflvl2jxrgymy2qrucs78ye0p0qrwddvhgulc">
				staking validator x
			</Link>

			<Link to="/staking/validator_tdx_d_1sw59jzn7cgp0c94xqfflvl2jxrgymy29999999999999999">staking validator y</Link>
		</Box>
	</Box>
)

export default Home
