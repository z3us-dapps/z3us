import * as Avatar from '@radix-ui/react-avatar'
import { LockClosedIcon } from '@radix-ui/react-icons'
import clsx, { type ClassValue } from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'
// TODO: create anoter component for handle shadows for simplebar, and the css import
import SimpleBarReact from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { Box } from 'ui/src/components-v2/box'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuItemIndicator,
	DropdownMenuLabel,
	DropdownMenuLeftSlot,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from 'ui/src/components-v2/dropdown-menu'
import { Text } from 'ui/src/components-v2/typography'
import { ExternalLinkIcon , CheckIcon } from 'ui/src/components/icons'

import { Link } from '@src/components/link'

import * as styles from './dropdown-profile.css'

interface IWalletDropdownRequiredProps {}

interface IWalletDropdownOptionalProps {
	className?: ClassValue
	buttonSize?: 'small' | 'medium'
}

interface IWalletDropdownProps extends IWalletDropdownRequiredProps, IWalletDropdownOptionalProps {}

const defaultProps: IWalletDropdownOptionalProps = {
	className: undefined,
	buttonSize: 'medium',
}

export const WalletDropdown: React.FC<IWalletDropdownProps> = props => {
	const { className, buttonSize } = props
	const { i18n } = useTranslation()

	const handleLangSelect = (lang: 'enUS' | 'pl') => {
		i18n.changeLanguage(lang)
	}

	const isButtonSmall = buttonSize === 'small'

	return (
		<Box className={clsx(styles.dropdownProfilWrapper, className)}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						className={clsx(styles.dropdownProfileButton, isButtonSmall && styles.dropdownProfileButtonSmall)}
					>
						<Avatar.Root className={styles.dropdownProfilAvatar}>
							<Avatar.Image
								className={styles.dropdownProfilAvatarImg}
								src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
								alt="Colm Tuite"
							/>
							<Avatar.Fallback className={styles.dropdownProfilAvatarFallback} delayMs={600}>
								CT
							</Avatar.Fallback>
							<span
								className={clsx(
									styles.dropdownProfilAvatarConnectedStatus,
									isButtonSmall && styles.dropdownProfilAvatarConnectedStatusSmall,
								)}
							/>
						</Avatar.Root>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" sideOffset={2} className={styles.dropdownProfileContentWrapper}>
					<SimpleBarReact className={styles.dropdownProfileSimpleBarWrapper}>
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

							<DropdownMenuSeparator />
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
								<DropdownMenuRadioItem value="dark">
									<Box flexGrow={1}>
										<Text size="xsmall">Funny man&apos;s wallet</Text>
									</Box>
									<DropdownMenuItemIndicator>
										<CheckIcon />
									</DropdownMenuItemIndicator>
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<DropdownMenuLeftSlot>
									<LockClosedIcon />
								</DropdownMenuLeftSlot>
								<Box display="flex" marginLeft="small">
									<Text size="xsmall">Lock wallet</Text>
								</Box>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<DropdownMenuLeftSlot>
									<ExternalLinkIcon />
								</DropdownMenuLeftSlot>
								<Box display="flex" marginLeft="small">
									<Text size="xsmall">Open in browser</Text>
								</Box>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onSelect={() => handleLangSelect('enUS')}>
								<DropdownMenuLeftSlot>🇦🇺</DropdownMenuLeftSlot>
								<Box display="flex" marginLeft="small">
									<Text size="xsmall">English</Text>
								</Box>
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => handleLangSelect('pl')}>
								<DropdownMenuLeftSlot>🇵🇱</DropdownMenuLeftSlot>
								<Box display="flex" marginLeft="small">
									<Text size="xsmall">Polish</Text>
								</Box>
							</DropdownMenuItem>
							{/* <DropdownMenuItem> */}
							{/* 	<DropdownMenuLeftSlot> */}
							{/* 		<PersonIcon /> */}
							{/* 	</DropdownMenuLeftSlot> */}
							{/* 	<Box display="flex"> */}
							{/* 		<Text size="xsmall">Add new persona</Text> */}
							{/* 	</Box> */}
							{/* </DropdownMenuItem> */}

							{/* <DropdownMenuSeparator /> */}
							{/* <DropdownMenuLabel>Theme</DropdownMenuLabel> */}
							{/**/}
							{/* <DropdownMenuRadioGroup value="light" onValueChange={() => {}}> */}
							{/* 	<DropdownMenuRadioItem value="light"> */}
							{/* 		<DropdownMenuItemIndicator> */}
							{/* 			<DotFilledIcon /> */}
							{/* 		</DropdownMenuItemIndicator> */}
							{/* 		Light */}
							{/* 	</DropdownMenuRadioItem> */}
							{/* 	<DropdownMenuRadioItem value="dark"> */}
							{/* 		<DropdownMenuItemIndicator> */}
							{/* 			<DotFilledIcon /> */}
							{/* 		</DropdownMenuItemIndicator> */}
							{/* 		Dark */}
							{/* 	</DropdownMenuRadioItem> */}
							{/* 	<DropdownMenuRadioItem value="system"> */}
							{/* 		<DropdownMenuItemIndicator> */}
							{/* 			<DotFilledIcon /> */}
							{/* 		</DropdownMenuItemIndicator> */}
							{/* 		System */}
							{/* 	</DropdownMenuRadioItem> */}
							{/* </DropdownMenuRadioGroup> */}
						</Box>
					</SimpleBarReact>

					<DropdownMenuArrow />
				</DropdownMenuContent>
			</DropdownMenu>
		</Box>
	)
}

WalletDropdown.defaultProps = defaultProps
