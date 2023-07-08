import clsx, { ClassValue } from 'clsx'
import screensJson from 'design/tokens/foundation/screens.json'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'
import { ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'

// import { ScrollArea } from 'ui/src/components/scroll-area'
import * as styles from './scroll-panel.css'

// const DESKTOP_BREAK_POINT = parseInt(screensJson.screens.lg.value.replace('px', ''), 10)
const TABLET_BREAK_POINT = parseInt(screensJson.screens.md.value.replace('px', ''), 10)

interface IScrollPanelProps {
	className?: ClassValue
	scrollParent: HTMLElement | null
	renderPanel: (scrollRef: HTMLElement | null) => any
}

export const ScrollPanel: React.FC<IScrollPanelProps> = props => {
	const { className, scrollParent, renderPanel } = props
	const isMobileScroll = useMediaQuery(`(max-width: ${TABLET_BREAK_POINT}px)`)

	return (
		<ScrollArea
			fixHeight
			className={clsx(styles.scrollWrapper, className)}
			renderScrollArea={panelRef => renderPanel(isMobileScroll ? scrollParent : panelRef)}
		/>
	)
}

// export const ScrollPanelOld: React.FC<IScrollPanelProps> = props => {
// 	const { renderPanel, className, scrollTopOnRoute, isTopShadowVisible } = props

// 	const ref = useRef(null)
// 	const location = useLocation()
// 	const [currentPath, setCurrentPath] = useState<string>(location.pathname)
// 	const [panelRef, setPanelRef] = useState<HTMLElement | null>(null)
// 	const [listMaxHeight, setListMaxHeight] = useState<number>(300)
// 	const [listHeight, setListHeight] = useState<number>(200)
// 	const [scrollTop, setScrollTop] = useState<number>(0)
// 	const [isSimpleBarDisabled, setIsSimpleBarDisabled] = useState<boolean>(window.innerWidth < TABLET_BREAK_POINT)

// 	const handleScroll = (e: Event) => {
// 		const target = e.target as Element
// 		const { scrollTop: scrollTopTarget } = target
// 		setScrollTop(scrollTopTarget)
// 	}

// 	const setListSize = () => {
// 		const listRef = ref.current
// 		if (listRef) {
// 			const isTabletWidth = window.innerWidth >= TABLET_BREAK_POINT && window.innerWidth < DESKTOP_BREAK_POINT
// 			const simpleBarContent = listRef.getElementsByClassName('simplebar-content')[0]
// 			setListHeight(simpleBarContent?.offsetHeight || 100)
// 			const listBounding = listRef.getBoundingClientRect()
// 			const maxHeightBottomGutter = isTabletWidth ? 24 : 48
// 			const maxHeight = window.innerHeight - listBounding.top - maxHeightBottomGutter
// 			setListMaxHeight(maxHeight)
// 		}
// 	}

// 	useEffect(() => {
// 		const { pathname } = location
// 		if (pathname !== currentPath && scrollTopOnRoute) {
// 			setCurrentPath(pathname)

// 			// hack to trigger virtuoso refresh on route change
// 			const scrollTo = scrollTop === 0 ? 1 : 0
// 			panelRef.scrollTo({ top: scrollTo })
// 		}
// 	}, [location.pathname, scrollTopOnRoute, scrollTop])

// 	return (
// 		<Box
// 			ref={ref}
// 			className={clsx(styles.panelWrapper, className)}
// 			style={{
// 				height: `${200}px`,
// 				maxHeight: `${200}px`,
// 				// height: `${listHeight}px`,
// 				// maxHeight: `${listMaxHeight}px`,
// 			}}
// 		>
// 			<ScrollArea
// 				scrollableNodeProps={{ ref: setPanelRef }}
// 				onScrollAreaSizeChange={setListSize}
// 				onScroll={handleScroll}
// 				isTopShadowVisible={isTopShadowVisible}
// 				// isSimpleBarDisabled={isSimpleBarDisabled}
// 			>
// 				{renderPanel(panelRef)}
// 			</ScrollArea>
// 		</Box>
// 	)
// }
