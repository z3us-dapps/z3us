import React from 'react'
import { useTranslation } from 'react-i18next'
import * as Avatar from '@radix-ui/react-avatar'
import { LockClosedIcon } from '@radix-ui/react-icons'
import { CheckIcon } from 'ui/src/components/icons'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { Link } from '@src/components/link'

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuItem,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuArrow,
	DropdownMenuItemIndicator,
	DropdownMenuLeftSlot,
} from 'ui/src/components-v2/dropdown-menu'

import * as styles from './dropdown-profile.css'

export const WalletDropdown: React.FC = () => {
	const { i18n } = useTranslation()

	const handleLangSelect = (lang: 'enUS' | 'pl') => {
		i18n.changeLanguage(lang)
	}

	return (
		<Box className={styles.dropdownProfilWrapper}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button type="button" className={styles.dropdownProfileButton}>
						<Avatar.Root className={styles.dropdownProfilAvatar}>
							<Avatar.Image
								className={styles.dropdownProfilAvatarImg}
								src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
								alt="Colm Tuite"
							/>
							<Avatar.Fallback className={styles.dropdownProfilAvatarFallback} delayMs={600}>
								CT
							</Avatar.Fallback>
							<span className={styles.dropdownProfilAvatarConnectedStatus} />
						</Avatar.Root>
					</button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="bottom" sideOffset={0} align="end" alignOffset={0}>
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
					<DropdownMenuArrow />
				</DropdownMenuContent>
			</DropdownMenu>
		</Box>
	)
}
