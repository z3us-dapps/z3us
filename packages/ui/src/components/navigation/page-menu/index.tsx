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
	id: string
	menu: TMenuItem[]
	title: string | React.ReactElement
}

export const PageMenu: React.FC<IProps> = props => {
	const { id, menu, title } = props

	const navigate = useNavigate()
	const location = useLocation()
	const [measureRef, { width: triggerWidth }] = useMeasure()
	const activePath = menu.find(({ href }) => href === location.pathname)

	return (
		<Box component="nav" className={styles.navigationWrapper}>
			<Box className={styles.tabletMenuWrapper}>
				<Box component="ul">
					<LayoutGroup id={id}>
						{menu.map(({ title: _title, href }) => (
							<Box key={href} component="li">
								<NavLink to={href} underline="never" end>
									{({ isActive }) => <PillNavigation text={_title} matchActiveFn={() => isActive} />}
								</NavLink>
							</Box>
						))}
					</LayoutGroup>
				</Box>
			</Box>
			<Box className={styles.mobileMenuWrapper}>
				<Box className={styles.menuTitleWrapper}>
					<Text weight="strong" size="xxlarge" color="strong">
						{title}
					</Text>
				</Box>
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
								{menu.map(({ title: _title, href }) => (
									<DropdownMenuItem
										key={href}
										onSelect={() => {
											navigate(href)
										}}
									>
										<Box display="flex">
											<Text size="xsmall" truncate>
												{_title}
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
