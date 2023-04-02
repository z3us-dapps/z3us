import clsx from 'clsx'
import { LayoutGroup, motion } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMatch } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { CoinsIcon, Home2Icon, Settings2Icon, Swap2Icon, SwitchHorizontal } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import { CopyAddressButton } from '@src/containers/playground/components/copy-address-button'
import { WalletDropdown } from '@src/containers/playground/components/wallet-dropdown'
import { Z3usLogo } from '@src/containers/playground/components/z3us-logo'
import { accountMenuSlugs, routes } from '@src/containers/playground/config'
import { AccountViewDropdown } from '@src/containers/playground/containers/accounts/account-view-dropdown'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import * as styles from './navigation.css'

const useSelectedItem = (href: string) => {
	const match = useMatch(href)
	const { account } = useAccountParams()

	const accountMatchBlackList = [routes.TRANSFER, routes.STAKING, routes.SWAP, routes.SETTINGS]
	const isAccountsMatch = href === accountMenuSlugs.ACCOUNTS && account && !accountMatchBlackList.includes(account)
	const selected = !!match || isAccountsMatch

	return selected
}

const MenuItemDesktop = ({ text, href }) => {
	const selected = useSelectedItem(href)

	return (
		<Link to={href} className={clsx(styles.navigationMenuLink)} underline="never">
			{selected ? <motion.span layoutId="underline" className={styles.navigationMenuActiveLine} /> : null}
			<Text
				size="medium"
				color={null}
				className={clsx(styles.navigationMenuLinkText, selected && styles.navigationMenuLinkTextSelected)}
			>
				{text}
			</Text>
		</Link>
	)
}

export const DesktopNavigation: React.FC = () => {
	const { t } = useTranslation()

	return (
		<Box component="nav" className={styles.navigationWrapper}>
			<Box className={styles.navigationContainer}>
				<Z3usLogo />
				<Box className={styles.navigationMenu}>
					<LayoutGroup>
						{[
							{ text: t('accounts.navigation.accounts'), href: accountMenuSlugs.ACCOUNTS },
							{ text: t('accounts.navigation.transfer'), href: accountMenuSlugs.TRANSFER },
							{ text: t('accounts.navigation.staking'), href: accountMenuSlugs.STAKING },
							{ text: t('accounts.navigation.swap'), href: accountMenuSlugs.SWAP },
							{ text: t('accounts.navigation.settings'), href: accountMenuSlugs.SETTINGS },
						].map(({ text, href }) => (
							<MenuItemDesktop text={text} key={href} href={href} />
						))}
					</LayoutGroup>
				</Box>
				<Box display="flex" alignItems="center" gap="medium">
					<CopyAddressButton address="rdx1b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce" />
					<AccountViewDropdown />
					<WalletDropdown />
				</Box>
			</Box>
		</Box>
	)
}

const MenuItemMobile = ({ href }: { href: string }) => {
	const selected = useSelectedItem(href)

	return (
		<Link to={href} className={styles.navigationMenuLinkMobile} underline="never">
			<Box
				className={clsx(styles.navigationMenuLinkMobileCircle, selected && styles.navigationMenuLinkMobileCircleSelect)}
			>
				{(() => {
					switch (href) {
						case accountMenuSlugs.ACCOUNTS:
							return <Home2Icon />
						case accountMenuSlugs.TRANSFER:
							return <SwitchHorizontal />
						case accountMenuSlugs.STAKING:
							return <CoinsIcon />
						case accountMenuSlugs.SWAP:
							return <Swap2Icon />
						case accountMenuSlugs.SETTINGS:
							return <Settings2Icon />
						default:
							return null
					}
				})()}
			</Box>
		</Link>
	)
}

export const MobileNavigation: React.FC = () => (
	<Box component="nav" className={styles.navigationMobileWrapper}>
		{[
			{ href: accountMenuSlugs.ACCOUNTS },
			{ href: accountMenuSlugs.TRANSFER },
			{ href: accountMenuSlugs.STAKING },
			{ href: accountMenuSlugs.SWAP },
			{ href: accountMenuSlugs.SETTINGS },
		].map(({ href }) => (
			<MenuItemMobile key={href} href={href} />
		))}
	</Box>
)
