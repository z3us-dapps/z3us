import clsx, { type ClassValue } from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ArrowRightIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'

import * as styles from './mobile-stacked-navigation.css'

type TMenuStacked = {
	href: string
	title: string
	subTitle: string | React.ReactElement
	icon: React.ReactElement
}

export interface IMobileStackedNavigation {
	className?: ClassValue
	menu: TMenuStacked[]
	isVisible?: boolean
}

export const MobileStackedNavigation: React.FC<IMobileStackedNavigation> = props => {
	const { menu, className, isVisible = true } = props

	return (
		<Box
			position="relative"
			className={clsx(
				isVisible ? styles.mobileStackedNavVisibleWrapper : styles.mobileStackedNavHiddenWrapper,
				className,
			)}
		>
			<Box className={styles.mobileStackedNavLinksWrapper}>
				{menu.map(({ href, title, subTitle, icon }) => (
					<Link key={href} to={href} className={styles.mobileStackedNavLinkWrapper}>
						<Box className={styles.mobileStackedNavLinkIconWrapper}>{icon}</Box>
						<Box className={styles.mobileStackedNavLinkTextWrapper}>
							<Text color="strong" size="large" weight="strong">
								{title}
							</Text>
							<Text lineClamp={3} size="small">
								{subTitle}
							</Text>
						</Box>
						<Box className={styles.mobileStackedNavLinkArrowWrapper}>
							<ArrowRightIcon />
						</Box>
					</Link>
				))}
			</Box>
		</Box>
	)
}
