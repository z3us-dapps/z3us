import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Button, TStyleVariant } from 'ui/src/components-v2/button'
import {
	DropdownMenu,
	DropdownMenuArrow,
	DropdownMenuContent,
	DropdownMenuItemIndicator,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from 'ui/src/components-v2/dropdown-menu'
import { Text } from 'ui/src/components-v2/typography'
import { CheckIcon, ChevronDownIcon } from 'ui/src/components/icons'

import { accountMenuSlugs } from '@src/constants'

import * as styles from './account-tablet-navigation-dropdown.css'

interface IAccountTabletNavigationDropdownRequiredProps {}

interface IAccountTabletNavigationDropdownOptionalProps {
	className?: ClassValue
	styleVariant?: TStyleVariant
}

interface IAccountTabletNavigationDropdownProps
	extends IAccountTabletNavigationDropdownRequiredProps,
		IAccountTabletNavigationDropdownOptionalProps {}

const defaultProps: IAccountTabletNavigationDropdownOptionalProps = {
	className: undefined,
	styleVariant: 'tertiary',
}

export const AccountTabletNavigationDropdown = forwardRef<HTMLElement, IAccountTabletNavigationDropdownProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, styleVariant } = props

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
			<Box ref={ref} className={clsx(styles.accountViewDropdownWrapper, className)}>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button styleVariant={styleVariant} sizeVariant="small" rounded rightIcon={<ChevronDownIcon />}>
							<Text capitalizeFirstLetter>{getActiveMenuText()}</Text>
						</Button>
					</DropdownMenuTrigger>
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
				</DropdownMenu>
			</Box>
		)
	},
)

AccountTabletNavigationDropdown.defaultProps = defaultProps
