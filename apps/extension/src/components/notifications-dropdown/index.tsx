/* eslint-disable  @typescript-eslint/no-unused-vars */
import clsx, { type ClassValue } from 'clsx'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuLeftSlot,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import SimpleBar from 'ui/src/components/simple-bar'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { BellIcon, Settings2Icon } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import Translation from '@src/components/translation'

import * as styles from './notifications-dropdown.css'

interface INotificationsDropdownProps {
	className?: ClassValue
}

export const NotificationsDropdown: React.FC<INotificationsDropdownProps> = props => {
	const { className } = props
	const navigate = useNavigate()

	const handleGoToSettings = () => {
		navigate('/accounts/settings')
	}

	return (
		<Box className={clsx(styles.notifcationsDropdownProfilWrapper, className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Box>
						<ToolTip message={<Translation capitalizeFirstLetter text="global.notifications" />}>
							<Button styleVariant="ghost" sizeVariant="small" iconOnly rounded>
								<BellIcon />
							</Button>
						</ToolTip>
					</Box>
				</DropdownMenuTrigger>
				<DropdownMenuPortal>
					<DropdownMenuContent
						align="center"
						sideOffset={2}
						className={styles.notificationsDropdownProfileContentWrapper}
					>
						<SimpleBar className={styles.notificationsDropdownProfileSimpleBarWrapper}>
							<Box className={styles.notificationsDropdownProfileScrollAreaWrapper}>
								<Box className={styles.notificationsDropdownStickyHeader}>
									<DropdownMenuLabel>
										<Text size="xsmall" weight="strong" color="strong">
											Connected to{' '}
											<Link href="https://ociswap.com/" display="inline-flex">
												<Text size="xsmall" weight="strong" color="strong">
													ocis
												</Text>
											</Link>
										</Text>
										<Text size="xsmall" weight="strong">
											the progress .... bar
										</Text>
									</DropdownMenuLabel>
								</Box>
								<DropdownMenuSeparator />
								<DropdownMenuLabel>
									<Text size="xsmall" weight="strong" color="strong">
										Notifcations
									</Text>
								</DropdownMenuLabel>
								{Array.from({ length: 20 }, (_, i) => (
									<DropdownMenuItem key={i}>
										<DropdownMenuLeftSlot>
											<Settings2Icon />
										</DropdownMenuLeftSlot>
										<Box display="flex" marginLeft="small">
											<Text size="xsmall">Lorum ipsum</Text>
										</Box>
									</DropdownMenuItem>
								))}
							</Box>
						</SimpleBar>
						<DropdownMenuArrow />
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenu>
		</Box>
	)
}
