import browser from 'webextension-polyfill'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { useNoneSharedStore, useSharedStore } from '@src/hooks/use-store'
import Button from 'ui/src/components/button'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { Box, MotionBox } from 'ui/src/components/atoms'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuItemIndicator,
	DropdownMenuTriggerItem,
	DropdownMenuRightSlot,
	DropdownMenuHamburgerIcon,
} from 'ui/src/components/drop-down-menu'
import { handleContentScriptInject } from '@src/lib/background/inject'

const popupURL = new URL(browser.runtime.getURL(''))

async function getCurrentTab() {
	const [tab] = await browser.tabs.query({ active: true, currentWindow: true })
	return tab
}

interface ImmerT {
	isOpen: boolean
	isPopup: boolean
	currentTabId: number
	currentTabHost: string
}

export const WalletMenu: React.FC = () => {
	const { theme, setTheme } = useSharedStore(state => ({
		theme: state.theme,
		setTheme: state.setThemeAction,
	}))
	const { approveWebsite } = useNoneSharedStore(state => ({
		approveWebsite: state.approveWebsiteAction,
	}))

	const [state, setState] = useImmer<ImmerT>({
		isOpen: false,
		isPopup: false,
		currentTabId: 0,
		currentTabHost: '',
	})

	useEffect(() => {
		if (!state.isOpen) return
		const load = async () => {
			const tab = await getCurrentTab()
			const tabURL = tab?.url ? new URL(tab.url) : null
			setState(draft => {
				draft.currentTabId = tab?.id || 0
				draft.currentTabHost = tabURL?.host || ''
				draft.isPopup = tabURL?.hostname === popupURL.hostname
			})
		}
		load()
	}, [state.isOpen])

	const setIsOpen = (isOpen: boolean) => {
		setState(draft => {
			draft.isOpen = isOpen
		})
	}

	const handleInjectContentScript = async () => {
		try {
			if (state.currentTabId) await handleContentScriptInject(state.currentTabId)
			if (state.currentTabHost) approveWebsite(state.currentTabHost)
			setState(draft => {
				draft.isOpen = false
			})
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
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
				<DropdownMenuContent
					avoidCollisions={false}
					align="end"
					side="bottom"
					sideOffset={6}
					alignOffset={-3}
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
					{/* <DropdownMenu> */}
					{/* 	<DropdownMenuTriggerItem onClick={handleOpenInNewTab}> */}
					{/* 		<Box css={{ flex: '1', pr: '$1' }}>Open in new tab</Box> */}
					{/* 	</DropdownMenuTriggerItem> */}
					{/* </DropdownMenu> */}
					{state.currentTabHost && !state.isPopup && (
						<DropdownMenu>
							<DropdownMenuTriggerItem onClick={handleInjectContentScript}>
								<Box css={{ flex: '1', pr: '$1' }}>Connect to {state.currentTabHost}</Box>
							</DropdownMenuTriggerItem>
						</DropdownMenu>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</MotionBox>
	)
}
