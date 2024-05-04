import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { useScroll } from 'ui/src/components/scroll-area-native'

import * as styles from './styles.css'

export const HomeScrollShadow: React.FC = () => {
	const { isScrolledTop } = useScroll()

	return <Box className={clsx(styles.accountHeadShadow, isScrolledTop && styles.accountHeadShadowHidden)} />
}
