import { LayoutGroup } from 'framer-motion'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import useMeasure from 'react-use-measure'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import { ChevronDown2Icon } from 'ui/src/components/icons'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { NavLink } from 'ui/src/components/router-link'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

type TMenuItem = {
	href: string
	title: string
}

interface IProps {
	menu: TMenuItem[]
}

export const PageMenu: React.FC<IProps> = props => {
	const { menu } = props

	const navigate = useNavigate()
	const location = useLocation()
	const [measureRef, { width: triggerWidth }] = useMeasure()
	const activePath = menu.find(({ href }) => href === location.pathname)

	return (
		<Box component="nav" width="full">
			<Box className={styles.tabletMenuWrapper}>
				<Box component="ul">
					<LayoutGroup id="transfer-menu">
						{menu.map(({ title, href }) => (
							<Box key={href} component="li">
								<NavLink to={href} underline="never" end>
									{({ isActive }) => <PillNavigation text={title} matchActiveFn={() => isActive} />}
								</NavLink>
							</Box>
						))}
					</LayoutGroup>
				</Box>
			</Box>
			<Box className={styles.mobileMenuWrapper}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild ref={measureRef}>
						<Box>
							<Button
								fullWidth
								styleVariant="secondary"
								sizeVariant="medium"
								className={styles.accountViewTriggerButton}
								rightIcon={<ChevronDown2Icon />}
							>
								{activePath?.title}
							</Button>
						</Box>
					</DropdownMenuTrigger>
					<DropdownMenuPortal>
						<DropdownMenuContent
							align="start"
							sideOffset={0}
							className={styles.accountViewContentWrapper}
							style={{ width: `${triggerWidth}px` }}
						>
							<Box className={styles.accountViewPaddingWrapper}>
								{menu.map(({ title, href }) => (
									<DropdownMenuItem
										key={href}
										onSelect={() => {
											navigate(href)
										}}
									>
										<Box display="flex">
											<Text size="xsmall" truncate>
												{title}
											</Text>
										</Box>
									</DropdownMenuItem>
								))}
							</Box>
						</DropdownMenuContent>
					</DropdownMenuPortal>
				</DropdownMenu>
			</Box>
		</Box>
	)
}
