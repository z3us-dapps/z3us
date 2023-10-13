import clsx, { type ClassValue } from 'clsx'
import React from 'react'
import { Link } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ArrowRightIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'

import { useMenuItems } from '../use-menu-items'
import * as styles from './styles.css'

export interface IMobileStackedNavigation {
	className?: ClassValue
	isVisible?: boolean
}

export const MobileStackedNavigation: React.FC<IMobileStackedNavigation> = ({ className, isVisible = true }) => {
	const menuItems = useMenuItems()

	return (
		<Box
			position="relative"
			className={clsx(
				isVisible ? styles.mobileStackedNavVisibleWrapper : styles.mobileStackedNavHiddenWrapper,
				className,
			)}
		>
			<Box className={styles.mobileStackedNavLinksWrapper}>
				{menuItems.map(({ href, title, icon }) => (
					<Link key={href} to={href} className={styles.mobileStackedNavLinkWrapper}>
						<Box className={styles.mobileStackedNavLinkIconWrapper}>{icon}</Box>
						<Box className={styles.mobileStackedNavLinkTextWrapper}>
							<Text color="strong" size="medium" weight="strong">
								{title}
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
