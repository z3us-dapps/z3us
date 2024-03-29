import clsx from 'clsx'
import React from 'react'
import useMeasure from 'react-use-measure'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'

import * as styles from './styles.css'

export const HomeScrollShadow: React.FC = () => {
	const { scrollableNode, isScrolledTop } = useScroll()

	const { y: nodeBoundingY } = scrollableNode?.getBoundingClientRect() || {}

	const [scrollShadowRef, { top, height }] = useMeasure()

	const stickyTop = top - nodeBoundingY + height

	return (
		<Box
			ref={scrollShadowRef}
			style={{ top: `${stickyTop}px` }}
			className={clsx(styles.accountHeadShadow, !isScrolledTop && styles.accountHeadShadowScrolled)}
		/>
	)
}
