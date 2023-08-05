import clsx, { type ClassValue } from 'clsx'
import { LayoutGroup } from 'framer-motion'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import React, { forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ConnectButton } from 'ui/src/components/connect-button'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import {
	DialogClose,
	DialogContent,
	DialogOverlay,
	DialogPortal,
	DialogRoot,
	DialogTrigger,
} from 'ui/src/components/dialog'
import { Close2Icon, CoinsIcon, Home2Icon, Settings2Icon, SwitchHorizontal } from 'ui/src/components/icons'
import { PillNavigation } from 'ui/src/components/pill-navigation'
import { Link } from 'ui/src/components/router-link'
import * as containerStyles from 'ui/src/components/styles/container-styles.css'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Z3usLogo } from 'ui/src/components/z3us-logo-babylon'

import { AccountViewDropdown } from './account-view-dropdown'
import * as styles from './navigation.css'

export const AccountDesktopLavaMenu = () => {
	const { t } = useTranslation()

	return (
		<Box className={styles.navigationMenu}>
			<LayoutGroup id="accounts-menu">
				{[
					{ text: t('accounts.navigation.accounts'), href: '/accounts' },
					{ text: t('accounts.navigation.transfer'), href: '/accounts/transfer' },
					{ text: t('accounts.navigation.staking'), href: '/accounts/staking' },
					// { text: t('accounts.navigation.swap'), href: '/accounts/swap'  },
					{ text: t('accounts.navigation.settings'), href: '/accounts/settings' },
				].map(({ text, href }) => (
					<NavLink to={href} end>
						{({ isActive }) => <PillNavigation text={text} key={href} href={href} matchActiveFn={() => isActive} />}
					</NavLink>
				))}
			</LayoutGroup>
		</Box>
	)
}

export const DesktopNavigation: React.FC = () => {
	const { selectedAccount } = useNoneSharedStore(state => ({
		selectedAccount: state.selectedAccount,
	}))

	return (
		<Box component="nav" className={clsx(styles.navigationWrapper, containerStyles.containerWrapper)}>
			<Box className={clsx(styles.navigationInnerWrapper, containerStyles.containerInnerWrapper)}>
				<Link to="/accounts">
					<Z3usLogo />
				</Link>
				<AccountDesktopLavaMenu />
				<Box display="flex" alignItems="center" gap="medium" flexGrow={1} justifyContent="flex-end">
					<CopyAddressButton address={selectedAccount} />
					<AccountViewDropdown />
					<ConnectButton />
				</Box>
			</Box>
		</Box>
	)
}

const MenuItemMobile = ({ href, children }: { href: string; children: React.ReactNode }) => (
	<NavLink to={href} end>
		{({ isActive }) => (
			<Link to={href} className={styles.navigationMenuLinkMobile} underline="never">
				<Box
					className={clsx(
						styles.navigationMenuLinkMobileCircle,
						isActive && styles.navigationMenuLinkMobileCircleSelect,
					)}
				>
					{children}
				</Box>
			</Link>
		)}
	</NavLink>
)

interface IMobileHeaderNavigationProps {
	copyAddressBtnVisible: boolean
	className?: ClassValue
	style?: React.CSSProperties
	isShadowVisible?: boolean
}

export const MobileHeaderNavigation = forwardRef<HTMLElement, IMobileHeaderNavigationProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { selectedAccount } = useNoneSharedStore(state => ({
			selectedAccount: state.selectedAccount,
		}))

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
						<Link to="/accounts">
							<Z3usLogo />
						</Link>
						<AccountViewDropdown styleVariant="tertiary" isLeftButtonIconVisible={false} />
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
								<CopyAddressButton styleVariant="white-transparent" address={selectedAccount} />
							) : null}
						</Box>
					</Box>
				</Box>
			</Box>
		)
	},
)

export const MobileFooterNavigation: React.FC = () => (
	<Box component="nav" className={styles.navigationMobileWrapper}>
		{[
			{ href: '/accounts', icon: <Home2Icon /> },
			{ href: '/accounts/transfer/*', icon: <SwitchHorizontal /> },
			{ href: '/accounts/staking/*', icon: <CoinsIcon /> },
			// { href: '/accounts/swap/*', icon: <Swap2Icon />  },
			{ href: '/accounts/settings/*', icon: <Settings2Icon /> },
		].map(({ href, icon }) => (
			<MenuItemMobile key={href} href={href}>
				{icon}
			</MenuItemMobile>
		))}
	</Box>
)

export const MobileMenu: React.FC = () => (
	<DialogRoot>
		<DialogTrigger asChild>
			<Box>
				<ToolTip side="right" message="global.menu">
					<Z3usLogo />
				</ToolTip>
			</Box>
		</DialogTrigger>
		<DialogPortal>
			<DialogOverlay className={dialogStyles.dialogOverlay} />
			<DialogContent className={styles.mobileSlideOutDialogContent}>
				<Box padding="medium">
					<Box display="flex" flexDirection="column" justifyContent="flex-end">
						<Box display="flex" width="full" justifyContent="flex-end">
							<DialogClose asChild>
								<Box>
									<ToolTip message="global.close">
										<Button iconOnly styleVariant="ghost" sizeVariant="small">
											<Close2Icon />
										</Button>
									</ToolTip>
								</Box>
							</DialogClose>
						</Box>
						<DialogClose asChild>
							<Link to="/">go to home</Link>
						</DialogClose>
					</Box>
				</Box>
			</DialogContent>
		</DialogPortal>
	</DialogRoot>
)
