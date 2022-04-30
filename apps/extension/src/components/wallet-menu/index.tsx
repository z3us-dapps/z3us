import React, { useState } from 'react'
import { useStore } from '@src/store'
import { useLocation } from 'wouter'
import Button from 'ui/src/components/button'
import { LockClosedIcon, ChevronRightIcon, StackIcon } from '@radix-ui/react-icons'
import { MotionBox } from 'ui/src/components/atoms'
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

	const { seed, theme, setTheme, networks, selectedNetworkIndex, selectNetwork, lock } = useStore(state => ({
		seed: state.masterSeed,
		theme: state.theme,
		setTheme: state.setThemeAction,

		networks: state.networks,
		selectedNetworkIndex: state.selectedNetworkIndex,
		selectNetwork: state.selectNetworkAction,
		lock: state.lockAction,
	}))
	const [isOpen, setIsopen] = useState(false)

	const handleSelectNetwork = async (value: string) => {
		await selectNetwork(+value)
	}

	const handleLockWallet = async () => lock()

	const handleConnectHW = () => setLocation('#/hardware-wallet')

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
					css={{ minWidth: '120px' }}
				>
					<DropdownMenu>
						<DropdownMenuTriggerItem>
							<span>Theme</span>
							<DropdownMenuRightSlot>
								<ChevronRightIcon />
							</DropdownMenuRightSlot>
						</DropdownMenuTriggerItem>
						<DropdownMenuContent avoidCollisions side="right" css={{ minWidth: '80px' }}>
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

					<DropdownMenu>
						<DropdownMenuTriggerItem>
							<span>Network</span>
							<DropdownMenuRightSlot>
								<ChevronRightIcon />
							</DropdownMenuRightSlot>
						</DropdownMenuTriggerItem>
						<DropdownMenuContent side="right" css={{ minWidth: '100px' }}>
							<DropdownMenuRadioGroup value={String(selectedNetworkIndex)} onValueChange={handleSelectNetwork}>
								{networks?.map((network, idx) => (
									<DropdownMenuRadioItem key={network.id} value={String(idx)}>
										<DropdownMenuItemIndicator />
										{network.id}
									</DropdownMenuRadioItem>
								))}
							</DropdownMenuRadioGroup>
						</DropdownMenuContent>
					</DropdownMenu>

					{seed && (
						<>
							<DropdownMenuItem onSelect={handleConnectHW}>
								<span>Connect hardware wallet</span>
								<DropdownMenuRightSlot>
									<StackIcon />
								</DropdownMenuRightSlot>
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={handleLockWallet}>
								<span>Lock wallet</span>
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
