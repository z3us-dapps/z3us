import React, { useEffect, useState } from 'react'
import useMeasure from 'react-use-measure'

import { Box } from 'ui/src/components/box'

import * as styles from './mobile-scrolling-background.css'

interface IMobileScrollingButtonsProps {
	scrollableNode: HTMLElement
}

export const MobileScrollingBackground: React.FC<IMobileScrollingButtonsProps> = props => {
	const { scrollableNode } = props
	const [measureRef, { top: triggerTop }] = useMeasure()
	const [sheetHeight, setSheetHeight] = useState<number | undefined>(undefined)
	const scrollWrapperHeight = scrollableNode?.clientHeight
	const sheetMinHeight = scrollWrapperHeight - (triggerTop - 58)

	useEffect(() => {
		const scrollHeightDiv = scrollableNode?.querySelector('div')
		const resizeObserver = new ResizeObserver(entries => {
			const observedHeight = entries[0].contentRect.height

			if (scrollHeightDiv && observedHeight > scrollWrapperHeight) {
				setSheetHeight(scrollWrapperHeight)
			}
		})

		if (scrollHeightDiv) {
			resizeObserver.observe(scrollHeightDiv)
		}

		return () => {
			if (scrollHeightDiv) {
				resizeObserver.disconnect()
			}
		}
	}, [scrollableNode])

	return (
		<Box ref={measureRef} className={styles.accountRoutesScrollingStickySheet}>
			<Box
				className={styles.accountRoutesScrollingStickyInnerSheet}
				style={{ height: `${sheetHeight || sheetMinHeight}px` }}
				// style={{ height: `${sheetHeight}px` }}
				// style={{ bottom: `-${sheetHeight}px`, height: `${sheetHeight}px` }}
			/>
		</Box>
	)
}
