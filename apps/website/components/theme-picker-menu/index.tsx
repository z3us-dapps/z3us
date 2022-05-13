import React from 'react'
import { useImmer } from 'use-immer'
import { Box } from 'ui/src/components/atoms'
import { LightningBoltIcon } from '@radix-ui/react-icons'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItemIndicator,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
} from 'ui/src/components/drop-down-menu'
import Button from 'ui/src/components/button'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useTheme } from 'next-themes'

export const ThemePickerMenu: React.FC = () => {
	const [state, setState] = useImmer({
		isScrolled: false,
		isThemeMenuOpen: false,
	})
	const { theme, setTheme } = useTheme()

	return (
		<DropdownMenu
			onOpenChange={open => {
				setState(draft => {
					draft.isThemeMenuOpen = open
				})
			}}
		>
			<DropdownMenuTrigger asChild>
				<Box>
					<ToolTip message="Theme" bgColor="$bgPanel2">
						<Button size="3" color="ghost" iconOnly>
							<Box
								css={{
									color: state.isThemeMenuOpen ? '#5d1eaf' : '$txtHelp',
									fill: state.isThemeMenuOpen ? '#5d1eaf' : '$txtHelp',
								}}
							>
								<LightningBoltIcon />
							</Box>
						</Button>
					</ToolTip>
				</Box>
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
					<DropdownMenuRadioGroup
						value={theme}
						onValueChange={_theme => {
							setTheme(_theme)
						}}
					>
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
				</DropdownMenu>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
