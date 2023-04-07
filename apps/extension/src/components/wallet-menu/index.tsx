import { ChevronRightIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useImmer } from 'use-immer'

import { Box, MotionBox } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuHamburgerIcon,
	DropdownMenuItemIndicator,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuRightSlot,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTriggerItem,
	DropdownMenuTrigger,
} from 'ui/src/components/drop-down-menu'

import { useSharedStore } from '@src/hooks/use-store'

interface ImmerT {
	isOpen: boolean
}

export const WalletMenu: React.FC = () => {
	const { theme, setTheme } = useSharedStore(state => ({
		theme: state.theme,
		setTheme: state.setThemeAction,
	}))
	const [state, setState] = useImmer<ImmerT>({
		isOpen: false,
	})

	const setIsOpen = (isOpen: boolean) => {
		setState(draft => {
			draft.isOpen = isOpen
		})
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
		<MotionBox animate={state.isOpen ? 'open' : 'closed'}>
			<DropdownMenu onOpenChange={setIsOpen}>
				<DropdownMenuTrigger asChild>
					<Button iconOnly aria-label="wallet options" color="ghost" size="4">
						<DropdownMenuHamburgerIcon
							css={{
								stroke: state.isOpen ? '$iconDefault' : '$iconDefault',
								mt: state.isOpen ? '3px' : '2px',
							}}
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuPortal>
					<DropdownMenuContent
						avoidCollisions={false}
						align="end"
						side="bottom"
						sideOffset={6}
						alignOffset={-3}
						css={{ minWidth: '130px' }}
					>
						<DropdownMenuSub>
							<DropdownMenuSubTriggerItem>
								<Box css={{ flex: '1', pr: '$1' }}>Theme</Box>
								<DropdownMenuRightSlot>
									<ChevronRightIcon />
								</DropdownMenuRightSlot>
							</DropdownMenuSubTriggerItem>
							<DropdownMenuPortal>
								<DropdownMenuSubContent>
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
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenu>
		</MotionBox>
	)
}
