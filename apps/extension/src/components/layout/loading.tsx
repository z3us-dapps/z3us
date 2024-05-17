import React from 'react'

import type { BoxProps } from 'ui/src/components/box'
import { Box } from 'ui/src/components/box'
import { Z3usLogoLarge } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './styles.css'

export const Loading: React.FC<BoxProps> = props => (
	<Box className={styles.loadingBgWrapper} {...props}>
		<Box className={styles.loadingBrandWrapper}>
			<Z3usLogoLarge showShadow={false} />
		</Box>
	</Box>
)

export default Loading
