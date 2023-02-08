import React from 'react'
import * as Avatar from '@radix-ui/react-avatar'
import { CardStackPlusIcon, DotFilledIcon, PersonIcon, LockClosedIcon } from '@radix-ui/react-icons'
// import { PlusIcon, ChevronDownIcon, ArrowLeftIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components-v2/button'
import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

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
	DropdownMenuRightSlot,
} from 'ui/src/components-v2/dropdown-menu'

import * as styles from './dropdown-profile.css'

export const DropdownProfile: React.FC = () => (
	<Box className={styles.dropdownProfilWrapper}>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button styleVariant="ghost" sizeVariant="medium" iconOnly>
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
					{/* <ChevronDownIcon /> */}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent side="bottom" sideOffset={5} align="end" alignOffset={0}>
				<DropdownMenuLabel>
					<Text size="xsmall">
						Connected to ociswap.com
						{/* <a href="https://ociswap.com/" target="_blank" rel="noreferrer"> */}
						{/* </a> */}
					</Text>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuLabel>
					<Text size="xsmall">Persona</Text>
				</DropdownMenuLabel>
				<DropdownMenuRadioGroup value="light" onValueChange={() => {}}>
					<DropdownMenuRadioItem value="light">
						<DropdownMenuItemIndicator>
							<DotFilledIcon />
						</DropdownMenuItemIndicator>
						<Text size="xsmall">Main persona</Text>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">
						<DropdownMenuItemIndicator>
							<DotFilledIcon />
						</DropdownMenuItemIndicator>
						<Text size="xsmall">Degen persona</Text>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>

				<DropdownMenuSeparator />
				<DropdownMenuLabel>
					<Text size="xsmall">Degen persona</Text>
				</DropdownMenuLabel>

				<DropdownMenuRadioGroup value="light" onValueChange={() => {}}>
					<DropdownMenuRadioItem value="light">
						<DropdownMenuItemIndicator>
							<DotFilledIcon />
						</DropdownMenuItemIndicator>
						<Text size="xsmall">Main driver</Text>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">
						<DropdownMenuItemIndicator>
							<DotFilledIcon />
						</DropdownMenuItemIndicator>

						<Text size="xsmall">Burner test wallet</Text>
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">
						<DropdownMenuItemIndicator>
							<DotFilledIcon />
						</DropdownMenuItemIndicator>
						<Text size="xsmall">Funny man&apos;s wallet</Text>
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>

				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<Box display="flex" flexGrow={1}>
						<Text size="xsmall">Lock wallet</Text>
					</Box>
					<DropdownMenuRightSlot>
						<LockClosedIcon />
					</DropdownMenuRightSlot>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Box display="flex" flexGrow={1}>
						<Text size="xsmall">Lock wallet</Text>
					</Box>
					<DropdownMenuRightSlot>
						<CardStackPlusIcon />
					</DropdownMenuRightSlot>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Box display="flex" flexGrow={1}>
						<Text size="xsmall">Add new persona</Text>
					</Box>
					<DropdownMenuRightSlot>
						<PersonIcon />
					</DropdownMenuRightSlot>
				</DropdownMenuItem>

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
