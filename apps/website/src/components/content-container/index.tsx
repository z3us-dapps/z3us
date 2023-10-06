import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './content-container.css'

export const ContentContainer = ({ children }: { children: React.ReactNode }) => (
	<Box className={styles.contentContainerWrapper}>
		<Box className={styles.contentContainerInnerWrapper}>{children}</Box>
	</Box>
)
