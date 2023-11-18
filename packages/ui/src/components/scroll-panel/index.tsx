import clsx from 'clsx'
import type { PropsWithChildren } from 'react'
import React from 'react'

import { type IScrollAreaRadix, ScrollAreaRadix as ScrollArea } from 'ui/src/components/scroll-area-radix'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import * as styles from './styles.css'

interface IScrollPanelProps extends IScrollAreaRadix {
	scrollParent?: HTMLElement | null
	showTopScrollShadow?: boolean
	showBottomScrollShadow?: boolean
	disabled?: boolean
}

export const ScrollPanel: React.FC<PropsWithChildren<IScrollPanelProps>> = props => {
	const isMobile = useIsMobileWidth()
	const {
		className,
		showTopScrollShadow,
		showBottomScrollShadow,
		scrollParent,
		children,
		disabled = false,
		...rest
	} = props

	return (
		<ScrollArea
			fixHeight
			roundedScrollArea={!isMobile}
			disabled={disabled}
			className={clsx(styles.scrollWrapper, className)}
			showTopScrollShadow={showTopScrollShadow}
			showBottomScrollShadow={showBottomScrollShadow}
			overrideScrollParent={scrollParent}
			{...rest}
		>
			{children}
		</ScrollArea>
	)
}
