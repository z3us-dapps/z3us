import clsx, { type ClassValue } from 'clsx'
import { LayoutGroup, motion } from 'framer-motion'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { ToolTip } from 'ui/src/components-v2/tool-tip'
import { Text } from 'ui/src/components-v2/typography'
import { BellIcon, CoinsIcon, Home2Icon, Settings2Icon, Swap2Icon, SwitchHorizontal } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import { CopyAddressButton } from '@src/components/copy-address-button'
import { Link } from '@src/components/link'
import * as containerStyles from '@src/components/styles/container-styles.css'
import Translation from '@src/components/translation'
import { WalletDropdown } from '@src/components/wallet-dropdown'
import { Z3usLogo } from '@src/components/z3us-logo-babylon'
import { accountMenuSlugs, routes } from '@src/constants'
import { AccountTabletNavigationDropdown } from '@src/containers/accounts/account-tablet-navigation-dropdown'
import { AccountViewDropdown } from '@src/containers/accounts/account-view-dropdown'
import { useAccountParams } from '@src/hooks/use-account-params'

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
	const { pathname } = useLocation()

	return (
		<Box component="nav" className={clsx(styles.navigationWrapper, containerStyles.containerWrapper)}>
			<Box className={clsx(styles.navigationContainer, containerStyles.containerInnerWrapper)}>
				<Z3usLogo />
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
					<ToolTip message={<Translation capitalizeFirstLetter text="global.search" />}>
						<Button to={`${pathname}?query=hello`} styleVariant="ghost" sizeVariant="small" iconOnly rounded>
							<BellIcon />
						</Button>
					</ToolTip>
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

interface IMobileHeaderNavigationRequiredProps {
	copyAddressBtnVisible: boolean
}

interface IMobileHeaderNavigationOptionalProps {
	className?: ClassValue
	style?: React.CSSProperties
	isShadowVisible?: boolean
	isAllAccount?: boolean
}

interface IMobileHeaderNavigationProps
	extends IMobileHeaderNavigationRequiredProps,
		IMobileHeaderNavigationOptionalProps {}

const mobileHeaderNavigationDefaultProps: IMobileHeaderNavigationOptionalProps = {
	className: undefined,
	style: undefined,
	isShadowVisible: false,
	isAllAccount: false,
}

export const MobileHeaderNavigation = forwardRef<HTMLElement, IMobileHeaderNavigationProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		// eslint-disable-next-line
		const { className, style, copyAddressBtnVisible, isShadowVisible, isAllAccount } = props

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
						<Z3usLogo />
						<AccountViewDropdown
							styleVariant="tertiary"
							// styleVariant={isAllAccount ? 'tertiary' : 'white-transparent'}
							isLeftButtonIconVisible={false}
						/>
					</Box>
					<Box display="flex" alignItems="center" gap="medium">
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

MobileHeaderNavigation.defaultProps = mobileHeaderNavigationDefaultProps

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
