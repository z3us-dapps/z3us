/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentContainer } from '@/components/content-container'
import { NextButton } from '@/components/next-button'
import { NextLink } from '@/components/next-link'
import { ShowHideUi } from '@/components/show-hide-ui'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { GithubIcon, TelegramIcon, TwitterIcon } from 'packages/ui/src/components/icons'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, HashRouter as Router, Routes, redirect } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ConnectButton } from 'ui/src/components/connect-button'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { NotificationsDropdown } from 'ui/src/components/notifications-dropdown'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Z3usLogo, Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'
import { AccountDesktopLavaMenu, MobileMenu } from 'ui/src/containers/accounts/navigation'
import { AccountViewDropdown } from 'ui/src/containers/accounts/navigation/account-view-dropdown'
import { useConnected } from 'ui/src/hooks/dapp/use-connected'

import * as styles from './styles.css'

export const Header = () => {
	// const router = useRouter()
	// const isConnected = useConnected()
	const isConnected = false

	return (
		<Box className={clsx(styles.headerWrapper, isConnected && styles.headerWrapperBorderColor)}>
			<ContentContainer>
				<Box className={styles.landingPageHeaderInnerWrapper}>
					<NextLink href="/" className={styles.landingHeaderZ3usLink}>
						<Z3usLogo isHoverMaskEnabled={false} />
						<Z3usLogoText />
					</NextLink>
					<Box className={styles.landingPageHeaderMenuWrapper}>
						<Box className={styles.headerTextLinks}>
							<NextLink href="/" underline="hover">
								Support
							</NextLink>
							<NextLink href="/" underline="hover">
								Faq
							</NextLink>
						</Box>
						<Box className={styles.headerSocialLinks}>
							<ToolTip message="global.telegram">
								<NextButton
									rounded
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://t.me/z3us_dapps"
									target="_blank"
								>
									<TelegramIcon />
								</NextButton>
							</ToolTip>
							<ToolTip message="global.twitter">
								<NextButton
									rounded
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://twitter.com/z3us_dapps"
									target="_blank"
								>
									<TwitterIcon />
								</NextButton>
							</ToolTip>
							<ToolTip message="global.github">
								<NextButton
									rounded
									sizeVariant="small"
									styleVariant="ghost"
									iconOnly
									to="https://github.com/z3us-dapps/z3us"
									target="_blank"
								>
									<GithubIcon />
								</NextButton>
							</ToolTip>
						</Box>
					</Box>
				</Box>
			</ContentContainer>
		</Box>
	)
}

{
	/* <ContentContainer>
				<Box className={styles.headerInnerWrapper}>
					<Box className={styles.headerMobileMenuWrapper}>
						<MobileMenu />
					</Box>
					<Box className={styles.landingHeaderBrandWrapper}>
						<Link to="/">
							<Z3usLogoText className={styles.landingLogoWrapper} />
						</Link>
					</Box>
					<Box className={styles.connectedMenuWrapper}>
						<ShowHideUi
							showCondition={isConnected}
							showUi={
								<Box className={styles.connectedMenuVisibleWrapper}>
									<Box flexGrow={1}>
										<AccountDesktopLavaMenu />
									</Box>
									<NotificationsDropdown />
									<Box className={styles.navigationCopyAddressWrapper}>
										<CopyAddressButton address="TODO" />
									</Box>
									<AccountViewDropdown />
								</Box>
							}
						/>
					</Box>
					<Box className={styles.connectButtonWrapper}>
						<ConnectButton />
					</Box>
				</Box>
			</ContentContainer> */
}
