/* eslint-disable */
import React, { forwardRef, useEffect, useState, useRef } from 'react'
import { Box } from 'ui/src/components-v2/box'
import { ScrollArea } from 'ui/src/components-v2/scroll-area'
// import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from 'react-virtuoso'
// import { PlusIcon, MagnifyingGlassIcon } from 'ui/src/components/icons'
// import { Text } from 'ui/src/components-v2/typography'
import clsx from 'clsx'

import * as styles from './scroll-panel.css'

interface IScrollPanelRequiredProps {
	renderPanel: any
}

interface IScrollPanelOptionalProps {
	className?: string
	scrollDisabled?: boolean
}

interface IScrollPanelProps extends IScrollPanelRequiredProps, IScrollPanelOptionalProps {}

const defaultProps: IScrollPanelOptionalProps = {
	className: undefined,
	scrollDisabled: undefined,
}

export const ScrollPanel: React.FC<IScrollPanelProps> = props => {
	const { renderPanel, className, scrollDisabled } = props

	const ref = useRef(null)
	const [panelRef, setPanelRef] = useState<HTMLElement | null>(null)
	const [listMaxHeight, setListMaxHeight] = useState<number>(300)
	const [listHeight, setListHeight] = useState<number>(200)
	const [isScrolled, setIsScrolled] = useState<boolean>(false)

	const handleScroll = (e: Event) => {
		const target = e.target as Element
		const { scrollTop } = target
		setIsScrolled(scrollTop > 0)
	}

	// TODO move this callback to the component
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
				{renderPanel(panelRef, isScrolled)}
			</ScrollArea>
		</Box>
	)
}

ScrollPanel.defaultProps = defaultProps
