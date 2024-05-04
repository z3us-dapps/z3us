import clsx from 'clsx'
import React, { useMemo } from 'react'

import { Box } from '../box'
import { ScrollContext } from './context'
import * as styles from './scroll-area.css'

interface IProps {
	children: React.ReactNode | React.ReactNode[]
	className?: string
	overrideScrollParent?: HTMLElement | null
}

export const ScrollAreaNative = React.forwardRef<HTMLElement, IProps>(
	({ children, className, overrideScrollParent }, ref) => {
		const isScrolledTop = true
		const scrollCtx = useMemo(
			() => ({
				scrollableNode: overrideScrollParent ?? undefined,
				isScrolledTop,
			}),
			[overrideScrollParent, isScrolledTop],
		)

		return (
			<Box ref={ref} className={clsx(styles.scrollAreaNativeWrapper, className)}>
				<ScrollContext.Provider value={scrollCtx}>{children}</ScrollContext.Provider>
			</Box>
		)
	},
)
