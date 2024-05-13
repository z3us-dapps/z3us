import React from 'react'

import type { BoxProps } from 'ui/src/components/box'
import { Box } from 'ui/src/components/box'
import { Z3usLogo, Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './styles.css'

export const Loading: React.FC<BoxProps> = props => (
	<Box className={styles.loadingBgWrapper} {...props}>
		<Box className={styles.loadingBrandWrapper}>
			<Z3usLogo isHoverMaskEnabled={false} />
			<Z3usLogoText />
		</Box>
	</Box>
)

export default Loading
