import clsx from 'clsx'
import React, { forwardRef, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { ScrollArea } from 'ui/src/components/scroll-area'
import { MobileHeaderNavigation } from 'ui/src/containers/accounts/navigation'

import * as styles from './navigation-scroll-container.css'

interface INavigationScrollContainerRequiredProps {
	// TODO: fix return type
	// renderPanel: (customScrollParent: HTMLElement | null, scrollTop: number) => React.ReactNode
	renderPanel: (customScrollParent: HTMLElement | null, scrollTop: number) => any
}

interface INavigationScrollContainerOptionalProps {
	className?: string
	isMobileNavVisible?: boolean
	isTopShadowVisible?: boolean
}

interface INavigationScrollContainerProps
	extends INavigationScrollContainerRequiredProps,
		INavigationScrollContainerOptionalProps {}

const defaultProps: INavigationScrollContainerOptionalProps = {
	className: undefined,
	isMobileNavVisible: true,
	isTopShadowVisible: true,
}

export const NavigationScrollContainer = forwardRef<HTMLElement, INavigationScrollContainerProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, renderPanel, isMobileNavVisible, isTopShadowVisible } = props

		const [customScrollParent, setCustomScrollParent] = useState<HTMLElement | null>(null)
		const [scrollTop, setScrollTop] = useState<number>(0)

		const handleScroll = (e: Event) => {
			const target = e.target as Element
			const { scrollTop: scrollTopTarget } = target
			setScrollTop(scrollTopTarget)
		}

		return (
			<Box ref={ref} className={clsx(styles.scrollWrapper, className)}>
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
	},
)

NavigationScrollContainer.defaultProps = defaultProps
