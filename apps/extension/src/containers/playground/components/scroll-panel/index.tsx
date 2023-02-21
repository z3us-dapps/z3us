import React, { useEffect, useState, useRef } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { useLocation } from 'react-router-dom'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'
import clsx from 'clsx'

import * as styles from './scroll-panel.css'

interface IScrollPanelRequiredProps {
	renderPanel: any
}

interface IScrollPanelOptionalProps {
	className?: string
	scrollDisabled?: boolean
	scrollTopOnRoute?: boolean
}

interface IScrollPanelProps extends IScrollPanelRequiredProps, IScrollPanelOptionalProps {}

const defaultProps: IScrollPanelOptionalProps = {
	className: undefined,
	scrollDisabled: undefined,
	scrollTopOnRoute: undefined,
}

export const ScrollPanel: React.FC<IScrollPanelProps> = props => {
	const { renderPanel, className, scrollDisabled, scrollTopOnRoute } = props

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

	// TODO move this callback to the component ???
	const setListSize = () => {
		const listRef = ref.current
		if (listRef) {
			const simpleBarContent = listRef.getElementsByClassName('simplebar-content')[0]
			setListHeight(simpleBarContent?.offsetHeight || 100)
			const listBounding = listRef.getBoundingClientRect()

			// TODO need to listen to screen size change and also useImperativeRef to get parent ref
			const maxHeight = window.innerHeight - listBounding.top - 48
			setListMaxHeight(maxHeight)
		}
	}

	useEffect(() => {
		const { pathname } = location
		if (pathname !== currentPath && scrollTopOnRoute) {
			setCurrentPath(pathname)
			panelRef.scrollTop = 0
		}
	}, [location.pathname, scrollTopOnRoute])

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
				isTopShadowVisible={false}
			>
				{renderPanel(panelRef, scrollTop)}
			</ScrollArea>
		</Box>
	)
}

ScrollPanel.defaultProps = defaultProps
