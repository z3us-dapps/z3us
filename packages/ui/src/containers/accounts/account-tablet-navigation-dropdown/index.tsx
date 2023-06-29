import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import type { TStyleVariant } from 'ui/src/components/button'
import { Button } from 'ui/src/components/button'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItemIndicator,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from 'ui/src/components/dropdown-menu'
import { CheckIcon, ChevronDownIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'
import { accountMenuSlugs } from 'ui/src/constants/accounts'

import * as styles from './account-tablet-navigation-dropdown.css'

interface IAccountTabletNavigationDropdown {
	styleVariant?: TStyleVariant
}

export const AccountTabletNavigationDropdown: React.FC<IAccountTabletNavigationDropdown> = props => {
	const { styleVariant = 'tertiary' } = props

	const { t } = useTranslation()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const [activeMenu, setActiveMenu] = useState<string>('accounts')

	const menuSlugs = [
		{ id: 'accounts', text: t('accounts.navigation.accounts'), href: accountMenuSlugs.ACCOUNTS },
		{ id: 'transfer', text: t('accounts.navigation.transfer'), href: accountMenuSlugs.TRANSFER },
		{ id: 'staking', text: t('accounts.navigation.staking'), href: accountMenuSlugs.STAKING },
		{ id: 'swap', text: t('accounts.navigation.swap'), href: accountMenuSlugs.SWAP },
		{ id: 'settings', text: t('accounts.navigation.settings'), href: accountMenuSlugs.SETTINGS },
	]

	const handleValueChanged = (menuItemId: string) => {
		setActiveMenu(menuItemId)
		const { href } = menuSlugs.find(({ id }) => id === menuItemId)
		navigate(href)
	}

	const getActiveMenuText = () =>
		menuSlugs.find(({ id }) => id === activeMenu)?.text || t('accounts.navigation.accounts')

	useEffect(() => {
		const pathKey = pathname?.split('/')?.[2] || ''
		const active = menuSlugs.find(({ id }) => id === pathKey)
		if (active) {
			setActiveMenu(active?.id)
		}
	}, [pathname])

	return (
		<Box className={styles.accountViewDropdownWrapper}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button styleVariant={styleVariant} sizeVariant="small" rounded rightIcon={<ChevronDownIcon />}>
						<Text capitalizeFirstLetter>{getActiveMenuText()}</Text>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuPortal>
					<DropdownMenuContent align="start" sideOffset={2} className={styles.accountViewContentWrapper}>
						<DropdownMenuRadioGroup value={activeMenu} onValueChange={handleValueChanged}>
							{menuSlugs.map(({ id, text }) => (
								<DropdownMenuRadioItem value={id} key={id}>
									<Box flexGrow={1}>
										<Text capitalizeFirstLetter size="xsmall">
											{text}
										</Text>
									</Box>
									<DropdownMenuItemIndicator>
										<CheckIcon />
									</DropdownMenuItemIndicator>
								</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
						<DropdownMenuArrow />
					</DropdownMenuContent>
				</DropdownMenuPortal>
			</DropdownMenu>
		</Box>
	)
}
