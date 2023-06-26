import clsx from 'clsx'
import { screens } from 'design/tokens/foundation/screens.json'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ScrollArea } from 'ui/src/components/scroll-area'

import * as styles from './scroll-panel.css'

interface IScrollPanelRequiredProps {
	renderPanel: (customScrollParent: HTMLElement | null) => any
}

interface IScrollPanelOptionalProps {
	className?: string
	scrollDisabled?: boolean
	scrollTopOnRoute?: boolean
	isTopShadowVisible?: boolean
}

interface IScrollPanelProps extends IScrollPanelRequiredProps, IScrollPanelOptionalProps {}

const defaultProps: IScrollPanelOptionalProps = {
	className: undefined,
	scrollDisabled: undefined,
	scrollTopOnRoute: undefined,
	isTopShadowVisible: false,
}

export const ScrollPanel: React.FC<IScrollPanelProps> = props => {
	const { renderPanel, className, scrollDisabled, scrollTopOnRoute, isTopShadowVisible } = props

	const ref = useRef(null)
	const location = useLocation()
	const [currentPath, setCurrentPath] = useState<string>(location.pathname)
	const [panelRef, setPanelRef] = useState<HTMLElement | null>(null)
	const [listMaxHeight, setListMaxHeight] = useState<number>(300)
	const [listHeight, setListHeight] = useState<number>(200)
	const [scrollTop, setScrollTop] = useState<number>(0)

	const handleScroll = (e: Event) => {
		const target = e.target as Element
		const { scrollTop: scrollTopTarget } = target
		setScrollTop(scrollTopTarget)
	}

	const setListSize = () => {
		const listRef = ref.current
		if (listRef) {
			const desktopBreakPoint = screens.lg.value.replace('px', '')
			const isDesktopWidth = window.innerWidth > parseInt(desktopBreakPoint, 10)
			const simpleBarContent = listRef.getElementsByClassName('simplebar-content')[0]
			setListHeight(simpleBarContent?.offsetHeight || 100)
			const listBounding = listRef.getBoundingClientRect()
			const maxHeightBottomGutter = isDesktopWidth ? 48 : 24
			const maxHeight = window.innerHeight - listBounding.top - maxHeightBottomGutter
			setListMaxHeight(maxHeight)
		}
	}

	useEffect(() => {
		const { pathname } = location
		if (pathname !== currentPath && scrollTopOnRoute) {
			setCurrentPath(pathname)

			// hack to trigger virtuoso refresh on route change
			const scrollTo = scrollTop === 0 ? 1 : 0
			panelRef.scrollTo({ top: scrollTo })
		}
	}, [location.pathname, scrollTopOnRoute, scrollTop])

	return (
		<Box
			ref={ref}
			className={clsx(styles.panelWrapper, className)}
			style={{
				height: `${listHeight}px`,
				maxHeight: `${listMaxHeight}px`,
			}}
		>
			<ScrollArea
				scrollableNodeProps={{ ref: setPanelRef }}
				onScrollAreaSizeChange={setListSize}
				scrollDisabled={scrollDisabled}
				onScroll={handleScroll}
				isTopShadowVisible={isTopShadowVisible}
			>
				{renderPanel(panelRef)}
			</ScrollArea>
		</Box>
	)
}

ScrollPanel.defaultProps = defaultProps
