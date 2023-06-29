import clsx from 'clsx'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { MobileHeaderNavigation } from 'ui/src/containers/accounts/navigation'

import * as styles from './navigation-scroll-container.css'

interface INavigationScrollContainerProps {
	renderPanel: (customScrollParent: HTMLElement | null, scrollTop: number) => React.ReactNode
	isMobileNavVisible?: boolean
	isTopShadowVisible?: boolean
}

export const NavigationScrollContainer: React.FC<INavigationScrollContainerProps> = props => {
	const { renderPanel, isMobileNavVisible = true, isTopShadowVisible = true } = props

	const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
	const [scrollTop, setScrollTop] = useState<number>(0)

	const handleScroll = (e: Event) => {
		const target = e.target as Element
		const { scrollTop: scrollTopTarget } = target
		setScrollTop(scrollTopTarget)
	}

	return (
		<Box className={styles.scrollWrapper}>
			{isMobileNavVisible ? (
				<MobileHeaderNavigation
					copyAddressBtnVisible={false}
					className={styles.headerWrapper}
					isShadowVisible={scrollTop > 0}
				/>
			) : null}
			<ScrollArea
				scrollableNodeProps={{ ref: setCustomScrollParent }}
				isTopShadowVisible={isTopShadowVisible}
				onScroll={handleScroll}
			>
				<Box className={clsx(isMobileNavVisible && styles.scrollPaddingWrapper)}>
					{renderPanel(customScrollParent, scrollTop)}
				</Box>
			</ScrollArea>
		</Box>
	)
}
