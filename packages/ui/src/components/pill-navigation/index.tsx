import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import { useLocation, useMatch } from 'react-router-dom'

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
	const { className, matchActiveFn = useMatch, href, text } = props
	const [selected, setSelected] = useState<boolean>(false)
	const location = useLocation()

	useEffect(() => {
		const isMatch = matchActiveFn(href)
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
