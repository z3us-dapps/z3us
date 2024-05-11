import React from 'react'

import type { BoxProps } from 'ui/src/components/box'
import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'
import { Z3usLogo, Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './styles.css'

export const Loading: React.FC<BoxProps> = props => (
	<Box className={styles.loadingBgWrapper} {...props}>
		<Box className={styles.loadingBrandWrapper}>
			<Z3usLogo isHoverMaskEnabled={false} />
			<Z3usLogoText />
			<Text component="span" size="xsmall" weight="stronger" className={styles.ellipsisTextWrapper}>
				<Box component="span" className={styles.ellipsisWrapper}>
					<Box component="span" className={styles.ellipsisElement} />
					<Box component="span" className={styles.ellipsisElement} />
					<Box component="span" className={styles.ellipsisElement} />
				</Box>
			</Text>
		</Box>
	</Box>
)

export default Loading
