import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import { matchPath, useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from './pill-navigation.css'

interface IPillProps {
	text: string
	className?: ClassValue
	matchActiveFn?: (href: string) => boolean
	href?: string
}

export const PillNavigation = forwardRef<HTMLAnchorElement, IPillProps>((props, ref) => {
	const { pathname } = useLocation()
	const { className, matchActiveFn = matchPath, href, text } = props
	const [selected, setSelected] = useState<boolean>(false)
	const location = useLocation()

	useEffect(() => {
		const isMatch = matchActiveFn(href, pathname)
		setSelected(isMatch as boolean)
	}, [location.pathname])

	return (
		<Box ref={ref} className={clsx(styles.pillNavigationLink, className)}>
			{selected ? <Box component="span" className={styles.pillNavigationActive} /> : null}
			<Text
				size="medium"
				weight="medium"
				color={null}
				className={clsx(styles.pillNavigationText, selected && styles.pillNavigationTextActive)}
				capitalizeFirstLetter
				truncate
			>
				{text}
			</Text>
		</Box>
	)
})
