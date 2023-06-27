import clsx, { type ClassValue } from 'clsx'
// TODO: try get lazy
// import { m as motion } from 'framer-motion'
import { motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { useMatch } from 'react-router-dom'

import { Link } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'

import * as styles from './pill-navigation.css'

interface IPillProps {
	className?: ClassValue
	matchActiveFn?: (href: string) => boolean
	href: string
	text: string
}

export const PillNavigation = forwardRef<HTMLAnchorElement, IPillProps>((props, ref) => {
	const { className, matchActiveFn = useMatch, href, text } = props

	const selected = matchActiveFn(href)

	return (
		<Link ref={ref} to={href} className={clsx(styles.pillNavigationLink, className)} underline="never">
			{selected ? <motion.span layoutId="underline" className={styles.pillNavigationActive} /> : null}
			<Text
				size="medium"
				weight="medium"
				color={null}
				className={clsx(styles.pillNavigationText, selected && styles.pillNavigationTextActive)}
				capitalizeFirstLetter
			>
				{text}
			</Text>
		</Link>
	)
})
