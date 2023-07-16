import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import * as styles from './scroll-panel.css'

interface IScrollPanelProps {
	className?: ClassValue
	scrollParent: HTMLElement | null
	renderPanel: (scrollRef: HTMLElement | null, isScrollTop: boolean) => React.ReactElement
	showTopScrollShadow?: boolean
	showBottomScrollShadow?: boolean
}

export const ScrollPanel: React.FC<IScrollPanelProps> = props => {
	const { className, scrollParent, showTopScrollShadow, showBottomScrollShadow, renderPanel } = props
	const isMobile = useIsMobileWidth()

	return (
		<ScrollArea
			fixHeight
			disabled={isMobile}
			className={clsx(styles.scrollWrapper, className)}
			showTopScrollShadow={showTopScrollShadow}
			showBottomScrollShadow={showBottomScrollShadow}
			renderScrollArea={(panelRef, isScrollTop) => renderPanel(isMobile ? scrollParent : panelRef, isScrollTop)}
		/>
	)
}
