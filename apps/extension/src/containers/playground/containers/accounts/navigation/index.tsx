import clsx from 'clsx'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link as LinkRouter, useMatch } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'
import { CoinsIcon, CopyIcon, Home2Icon, Settings2Icon, Swap2Icon, SwitchHorizontal } from 'ui/src/components/icons'

import { Link } from '@src/components/link'
import { CopyAddressButton } from '@src/containers/playground/components/copy-address-button'
import { WalletDropdown } from '@src/containers/playground/components/wallet-dropdown'
import { routes } from '@src/containers/playground/config'
import { AccountViewDropdown } from '@src/containers/playground/containers/accounts/account-view-dropdown'
import { useAccountParams } from '@src/containers/playground/hooks/use-account-params'

import * as styles from './navigation.css'

const menuSlugs = {
	ACCOUNTS: `${routes.ACCOUNTS}/all`,
	TRANSFER: `${routes.ACCOUNTS}${routes.TRANSFER}`,
	STAKING: `${routes.ACCOUNTS}${routes.STAKING}`,
	SWAP: `${routes.ACCOUNTS}${routes.SWAP}`,
	SETTINGS: `${routes.ACCOUNTS}${routes.SETTINGS}`,
}

const Z3usLogoBrand = () => (
	<LinkRouter to={menuSlugs.ACCOUNTS} className={styles.navigationLogoLink}>
		<Box className={styles.navigationLogoLinkScreen} />
		<svg x="0px" y="0px" viewBox="0 0 24 24" className={styles.logoSvg}>
			<g>
				<path d="M0,12v12h12C5.4,24,0,18.6,0,12z" />
				<path d="M12,0H0v12C0,5.4,5.4,0,12,0z" />
				<path d="M12,24h12V12C24,18.6,18.6,24,12,24z" />
				<path d="M12,0c6.6,0,12,5.4,12,12V0H12z" />
				<path
					d="M12,1.2C6,1.2,1.2,6,1.2,12C1.2,18,6,22.8,12,22.8c6,0,10.8-4.8,10.8-10.8C22.8,6,18,1.2,12,1.2z M15.5,12.2l-9.9,6.2
			l8.3-2.9c0.2-0.1,0.3,0.1,0.3,0.2v2.3c0,0.2,0.2,0.3,0.3,0.2l6.7-2.3c-1.5,3.5-5.1,6-9.2,6c-4.9,0-8.9-3.5-9.8-8.1l5.6-3.8
			c0.2-0.1,0.4,0,0.4,0.2v1.3c0,0.2,0.2,0.3,0.4,0.2l9.9-6.2l-8.3,2.9C10,8.5,9.9,8.4,9.9,8.2V5.9c0-0.2-0.2-0.3-0.3-0.2L2.8,8
			C4.4,4.5,7.9,2,12,2c4.9,0,8.9,3.5,9.8,8.1l-5.6,3.8c-0.2,0.1-0.4,0-0.4-0.2v-1.3C15.9,12.2,15.7,12.1,15.5,12.2z"
				/>
			</g>
		</svg>
	</LinkRouter>
)

const useSelectedItem = (href: string) => {
	const match = useMatch(href)
	const { account } = useAccountParams()

	const accountMatchBlackList = [routes.TRANSFER, routes.STAKING, routes.SWAP, routes.SETTINGS]
	const isAccountsMatch = href === menuSlugs.ACCOUNTS && account && !accountMatchBlackList.includes(`/${account}`)
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
				<Z3usLogoBrand />
				<Box className={styles.navigationMenu}>
					<LayoutGroup>
						{[
							{ text: t('accounts.navigation.accounts'), href: menuSlugs.ACCOUNTS },
							{ text: t('accounts.navigation.transfer'), href: menuSlugs.TRANSFER },
							{ text: t('accounts.navigation.staking'), href: menuSlugs.STAKING },
							{ text: t('accounts.navigation.swap'), href: menuSlugs.SWAP },
							{ text: t('accounts.navigation.settings'), href: menuSlugs.SETTINGS },
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
						case menuSlugs.ACCOUNTS:
							return <Home2Icon />
						case menuSlugs.TRANSFER:
							return <SwitchHorizontal />
						case menuSlugs.STAKING:
							return <CoinsIcon />
						case menuSlugs.SWAP:
							return <Swap2Icon />
						case menuSlugs.SETTINGS:
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
			{ href: menuSlugs.ACCOUNTS },
			{ href: menuSlugs.TRANSFER },
			{ href: menuSlugs.STAKING },
			{ href: menuSlugs.SWAP },
			{ href: menuSlugs.SETTINGS },
		].map(({ href }) => (
			<MenuItemMobile key={href} href={href} />
		))}
	</Box>
)
