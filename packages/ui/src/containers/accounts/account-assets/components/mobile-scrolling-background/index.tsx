import React from 'react'
import useMeasure from 'react-use-measure'

import { Box } from 'ui/src/components/box'

import * as styles from './mobile-scrolling-background.css'

export const MobileScrollingBackground: React.FC = () => {
	const [measureRef, { top: triggerTop }] = useMeasure()
	const sheetHeight = triggerTop + 48

	return (
		<Box ref={measureRef} className={styles.accountRoutesScrollingStickySheet}>
			<Box
				className={styles.accountRoutesScrollingStickyInnerSheet}
				style={{ bottom: `-calc(100vh - ${sheetHeight}px)`, height: `calc(100vh - ${sheetHeight}px)` }}
			/>
		</Box>
	)
}
