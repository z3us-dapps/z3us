import React, { useState } from 'react'
import { useSharedStore, useStore } from '@src/store'
import { useLocation } from 'wouter'
import Button from 'ui/src/components/button'
import { LockClosedIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { HardwareWalletIcon } from 'ui/src/components/icons'
import { Box, MotionBox } from 'ui/src/components/atoms'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
	DropdownMenuTriggerItem,
	DropdownMenuRightSlot,
	DropdownMenuHamburgerIcon,
} from 'ui/src/components/drop-down-menu'

export const WalletMenu: React.FC = () => {
	const [, setLocation] = useLocation()
	const { theme, setTheme, lock } = useSharedStore(state => ({
		theme: state.theme,
		setTheme: state.setThemeAction,
		lock: state.lockAction,
	}))
	const { seed, lockWallet } = useStore(state => ({
		seed: state.masterSeed,
		lockWallet: state.lockAction,
	}))
	const [isOpen, setIsopen] = useState(false)

	const handleLockWallet = async () => {
		await lock()
		await lockWallet()
	}

	const handleConnectHW = () => {
		window.open(`${window.location.origin}/popup-theme-light.html#/hardware-wallet`)
		setLocation('#/hardware-wallet')
	}

	return (
		<MotionBox animate={isOpen ? 'open' : 'closed'}>
			<DropdownMenu onOpenChange={setIsopen}>
				<DropdownMenuTrigger asChild>
					<Button iconOnly aria-label="wallet options" color="ghost" size="3" css={{ mt: '2px', mr: '2px' }}>
						<DropdownMenuHamburgerIcon
							css={{
								stroke: isOpen ? '$iconDefault' : '$iconDefault',
								mt: isOpen ? '3px' : '2px',
							}}
						/>
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					avoidCollisions={false}
					align="end"
					side="bottom"
					sideOffset={6}
					alignOffset={-5}
					css={{ minWidth: '130px' }}
				>
					<DropdownMenu>
						<DropdownMenuTriggerItem>
							<Box css={{ flex: '1', pr: '$1' }}>Theme</Box>
							<DropdownMenuRightSlot>
								<ChevronRightIcon />
							</DropdownMenuRightSlot>
						</DropdownMenuTriggerItem>
						<DropdownMenuContent avoidCollisions side="right" css={{ minWidth: '90px' }}>
							<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
								<DropdownMenuRadioItem value="light">
									<DropdownMenuItemIndicator />
									Light
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="dark">
									<DropdownMenuItemIndicator />
									Dark
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="system">
									<DropdownMenuItemIndicator />
									System
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>
					{seed && (
						<>
							<DropdownMenuItem onSelect={handleConnectHW}>
								<Box css={{ flex: '1', pr: '$4' }}>Connect hardware wallet</Box>
								<DropdownMenuRightSlot>
									<HardwareWalletIcon />
								</DropdownMenuRightSlot>
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={handleLockWallet}>
								<Box css={{ flex: '1' }}>Lock wallet</Box>
								<DropdownMenuRightSlot>
									<LockClosedIcon />
								</DropdownMenuRightSlot>
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</MotionBox>
	)
}
