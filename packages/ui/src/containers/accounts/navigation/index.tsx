import clsx, { type ClassValue } from 'clsx'
import { LayoutGroup, motion } from 'framer-motion'
import React, { forwardRef, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ConnectButton } from 'ui/src/components/connect-button'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { CoinsIcon, Home2Icon, Settings2Icon, Swap2Icon, SwitchHorizontal } from 'ui/src/components/icons'
import { NotificationsDropdown } from 'ui/src/components/notifications-dropdown'
import { Link } from 'ui/src/components/router-link'
import * as containerStyles from 'ui/src/components/styles/container-styles.css'
import { Text } from 'ui/src/components/typography'
import { WalletDropdown } from 'ui/src/components/wallet-dropdown'
import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'
import { accountMenuSlugs } from 'ui/src/constants/accounts'
import { routes } from 'ui/src/constants/routes'
import { AccountTabletNavigationDropdown } from 'ui/src/containers/accounts/account-tablet-navigation-dropdown'
import { AccountViewDropdown } from 'ui/src/containers/accounts/account-view-dropdown'
import { NoneSharedStoreContext } from 'ui/src/context/state'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './navigation.css'

const useSelectedItem = (href: string) => {
	const { account } = useAccountParams()
	const location = useLocation()
	const splitPath = href.split('/')
	const splitPathName = splitPath[2]
	const locationSplitPath = location.pathname.split('/')
	const locationSplitPathName = locationSplitPath[2]
	const accountMatchBlackList = [routes.TRANSFER, routes.STAKING, routes.SWAP, routes.SETTINGS]
	const isAccountsMatch = href === accountMenuSlugs.ACCOUNTS && account && !accountMatchBlackList.includes(account)

	return splitPathName === locationSplitPathName || isAccountsMatch
}

const MenuItemDesktop = ({ text, href }) => {
	const selected = useSelectedItem(href)

	return (
		<Link to={href} className={styles.navigationMenuLink} underline="never">
			{selected ? <motion.span layoutId="underline" className={styles.navigationMenuActiveLine} /> : null}
			<Text
				size="medium"
				weight="medium"
				color={null}
				className={clsx(styles.navigationMenuLinkText, selected && styles.navigationMenuLinkTextSelected)}
				capitalizeFirstLetter
			>
				{text}
			</Text>
		</Link>
	)
}

export const DesktopNavigation: React.FC = () => {
	const { t } = useTranslation()

	const { z3usLogoLink } = useContext(NoneSharedStoreContext)

	return (
		<Box component="nav" className={clsx(styles.navigationWrapper, containerStyles.containerWrapper)}>
			<Box className={clsx(styles.navigationContainer, containerStyles.containerInnerWrapper)}>
				{z3usLogoLink || (
					<Link to={accountMenuSlugs.ACCOUNTS}>
						<Z3usLogo />
					</Link>
				)}
				<Box className={styles.navigationMenuTabletWrapper}>
					<AccountTabletNavigationDropdown />
				</Box>
				<Box className={styles.navigationMenu}>
					<LayoutGroup id="accounts-menu">
						{[
							{ text: t('accounts.navigation.accounts'), href: accountMenuSlugs.ACCOUNTS },
							{ text: t('accounts.navigation.transfer'), href: accountMenuSlugs.TRANSFER },
							{ text: t('accounts.navigation.staking'), href: accountMenuSlugs.STAKING },
							// { text: t('accounts.navigation.swap'), href: accountMenuSlugs.SWAP },
							{ text: t('accounts.navigation.settings'), href: accountMenuSlugs.SETTINGS },
						].map(({ text, href }) => (
							<MenuItemDesktop text={text} key={href} href={href} />
						))}
					</LayoutGroup>
				</Box>
				<Box display="flex" alignItems="center" gap="medium">
					<NotificationsDropdown />
					<CopyAddressButton address="rdx1b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce" />
					<AccountViewDropdown />
					{/* <WalletDropdown /> */}
					<ConnectButton />
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

interface IMobileHeaderNavigationProps {
	copyAddressBtnVisible: boolean
	className?: ClassValue
	style?: React.CSSProperties
	isShadowVisible?: boolean
}

export const MobileHeaderNavigation = forwardRef<HTMLElement, IMobileHeaderNavigationProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { z3usLogoLink } = useContext(NoneSharedStoreContext)
		const { className, style, copyAddressBtnVisible, isShadowVisible = false } = props

		return (
			<Box
				component="nav"
				ref={ref}
				className={clsx(
					className,
					styles.accountsHomeMobileHeader,
					isShadowVisible && styles.accountsHomeMobileHeaderShadow,
				)}
				style={style}
			>
				<Box className={styles.accountsHomeMobileHeaderWalletWrapper}>
					<Box display="flex" alignItems="center" gap="small" flexGrow={1}>
						{z3usLogoLink || (
							<Link to={accountMenuSlugs.ACCOUNTS}>
								<Z3usLogo />
							</Link>
						)}
						<AccountViewDropdown
							styleVariant="tertiary"
							// styleVariant={isAllAccount ? 'tertiary' : 'white-transparent'}
							isLeftButtonIconVisible={false}
						/>
					</Box>
					<Box display="flex" alignItems="center" gap="medium">
						<ConnectButton />
						<Box
							transition="fast"
							style={{
								opacity: copyAddressBtnVisible ? 1 : 0,
								pointerEvents: copyAddressBtnVisible ? 'all' : 'none',
							}}
						>
							{copyAddressBtnVisible ? (
								<CopyAddressButton
									styleVariant="white-transparent"
									address="rdx1b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce"
								/>
							) : null}
						</Box>
						<WalletDropdown />
					</Box>
				</Box>
			</Box>
		)
	},
)

export const MobileFooterNavigation: React.FC = () => (
	<Box component="nav" className={styles.navigationMobileWrapper}>
		{[
			{ href: accountMenuSlugs.ACCOUNTS },
			{ href: accountMenuSlugs.TRANSFER },
			{ href: accountMenuSlugs.STAKING },
			// { href: accountMenuSlugs.SWAP },
			{ href: accountMenuSlugs.SETTINGS },
		].map(({ href }) => (
			<MenuItemMobile key={href} href={href} />
		))}
	</Box>
)
