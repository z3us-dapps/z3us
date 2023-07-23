import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './mobile-scrolling-background.css'

export const MobileScrollingBackground: React.FC = () => {
	const sheetHeight = 48 + 58

	return (
		<Box className={styles.accountRoutesScrollingStickySheet}>
			<Box
				className={styles.accountRoutesScrollingStickyInnerSheet}
				style={{ bottom: `-calc(100vh - ${sheetHeight}px)`, height: `calc(100vh - ${sheetHeight}px)` }}
			/>
		</Box>
	)
}
