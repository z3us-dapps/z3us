import React from 'react'

import type { BoxProps } from 'ui/src/components/box'
import { Box } from 'ui/src/components/box'
import { Z3usLogoLarge } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './styles.css'

export const Loading: React.FC<BoxProps> = props => (
	<Box display="flex" width="full" height="full" alignItems="center" justifyContent="center" {...props}>
		<Z3usLogoLarge size="large" fillPurple className={styles.loadingWrapper} />
	</Box>
)

export default Loading
