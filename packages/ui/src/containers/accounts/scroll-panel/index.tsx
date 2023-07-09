import clsx, { type ClassValue } from 'clsx'
import screensJson from 'design/tokens/foundation/screens.json'
import React from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'

import * as styles from './scroll-panel.css'

const TABLET_BREAK_POINT = parseInt(screensJson.screens.md.value.replace('px', ''), 10)

interface IScrollPanelProps {
	className?: ClassValue
	scrollParent: HTMLElement | null
	renderPanel: (scrollRef: HTMLElement | null) => any
}

export const useIsMobileScroll = () => useMediaQuery(`(max-width: ${TABLET_BREAK_POINT}px)`)

export const ScrollPanel: React.FC<IScrollPanelProps> = props => {
	const { className, scrollParent, renderPanel } = props
	const isMobileScroll = useIsMobileScroll()

	return (
		<ScrollArea
			fixHeight
			className={clsx(styles.scrollWrapper, className)}
			renderScrollArea={panelRef => renderPanel(isMobileScroll ? scrollParent : panelRef)}
		/>
	)
}