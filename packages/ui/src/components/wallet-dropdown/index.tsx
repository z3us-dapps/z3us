import clsx, { type ClassValue } from 'clsx'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Avatar } from 'ui/src/components/avatar'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuItemIndicator,
	DropdownMenuLabel,
	DropdownMenuLeftSlot,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import { CheckIcon, LockIcon, PlusIcon, Settings2Icon, ShareIcon } from 'ui/src/components/icons'
// TODO: can update references here
import { Link } from 'ui/src/components/router-link'
import SimpleBar from 'ui/src/components/simple-bar'
import { Text } from 'ui/src/components/typography'

import * as styles from './dropdown-profile.css'

interface IWalletDropdownProps {
	className?: ClassValue
}

export const WalletDropdown: React.FC<IWalletDropdownProps> = props => {
	const { className } = props
	const navigate = useNavigate()

	const handleGoToSettings = () => {
		navigate('/accounts/settings')
	}

	// @TODO: will be implement when styles are supported
	// const handleOpenInNewTab = async () => {
	// 	setState(draft => {
	// 		draft.isOpen = false
	// 	})
	// 	const currentWindow = await browser.windows.getCurrent()
	// 	if (currentWindow != null) {
	// 		currentWindow.focused = true
	// 		return browser.tabs.create({ url: window.location.toString(), active: true })
	// 	}
	// 	return browser.windows.create({ url: window.location.toString(), focused: true })
	// }

	return (
		<Box className={clsx(styles.dropdownProfilWrapper, className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						className={styles.dropdownProfileBtnWrapper}
						styleVariant="avatar"
						sizeVariant="small"
						iconOnly
						rounded
					>
						<Avatar
							styleVariant="circle"
							sizeVariant="full"
							src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
							alt="this is the image"
							fallback="df"
						/>
						<Box
							className={clsx(
								styles.dropdownProfilAvatarConnectedStatus,
								// TODO: do no need prop, media query
								// isButtonSmall && styles.dropdownProfilAvatarConnectedStatusSmall,
							)}
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuPortal>
					<DropdownMenuContent align="end" sideOffset={2} className={styles.dropdownProfileContentWrapper}>
						<SimpleBar className={styles.dropdownProfileSimpleBarWrapper}>
							<Box className={styles.dropdownProfileScrollAreaWrapper}>
								<DropdownMenuLabel>
									<Text size="xsmall" weight="strong" color="strong">
										Connected to{' '}
										<Link href="https://ociswap.com/">
											<Text size="xsmall" weight="strong" color="strong">
												ociswap.com
											</Text>
										</Link>
									</Text>
								</DropdownMenuLabel>

								<DropdownMenuLabel>
									<Text size="xsmall" weight="strong" color="strong">
										Wallet
									</Text>
								</DropdownMenuLabel>
								<DropdownMenuRadioGroup value="light" onValueChange={() => {}}>
									<DropdownMenuRadioItem value="light">
										<Box flexGrow={1}>
											<Text size="xsmall">Main driver</Text>
										</Box>
										<DropdownMenuItemIndicator>
											<CheckIcon />
										</DropdownMenuItemIndicator>
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="dark">
										<Box flexGrow={1}>
											<Text size="xsmall">Burner test wallet</Text>
										</Box>
										<DropdownMenuItemIndicator>
											<CheckIcon />
										</DropdownMenuItemIndicator>
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>

								<DropdownMenuSeparator />

								<DropdownMenuSeparator />

								<DropdownMenuLabel>
									<Text size="xsmall" weight="strong" color="strong">
										Persona
									</Text>
								</DropdownMenuLabel>

								<DropdownMenuRadioGroup value="light" onValueChange={() => {}}>
									<DropdownMenuRadioItem value="light">
										<Box flexGrow={1}>
											<Text size="xsmall">Main persona</Text>
										</Box>
										<DropdownMenuItemIndicator>
											<CheckIcon />
										</DropdownMenuItemIndicator>
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="dark">
										<Box flexGrow={1}>
											<Text size="xsmall">Degen persona</Text>
										</Box>
										<DropdownMenuItemIndicator>
											<CheckIcon />
										</DropdownMenuItemIndicator>
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>

								<DropdownMenuItem>
									<DropdownMenuLeftSlot>
										<PlusIcon />
									</DropdownMenuLeftSlot>
									<Box display="flex">
										<Text size="xsmall">Add new persona</Text>
									</Box>
								</DropdownMenuItem>

								<DropdownMenuSeparator />

								<DropdownMenuItem onSelect={handleGoToSettings}>
									<DropdownMenuLeftSlot>
										<Settings2Icon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall">Settings</Text>
									</Box>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<DropdownMenuLeftSlot>
										<LockIcon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall">Lock wallet</Text>
									</Box>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<DropdownMenuLeftSlot>
										<ShareIcon />
									</DropdownMenuLeftSlot>
									<Box display="flex" marginLeft="small">
										<Text size="xsmall">Open in browser</Text>
									</Box>
								</DropdownMenuItem>
							</Box>
						</SimpleBar>

						<DropdownMenuArrow />
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenu>
		</Box>
	)
}
