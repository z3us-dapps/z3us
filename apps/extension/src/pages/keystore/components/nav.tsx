import React from 'react'

import { Box } from 'ui/src/components/box'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './styles.css'

const Nav: React.FC = () => (
	<Box className={styles.onboardingNavWrapper}>
		<Box display="flex" position="relative">
			<Z3usLogoText />
		</Box>
	</Box>
)

export default Nav
