/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentContainer } from '@/components/content-container'
import { NextButton } from '@/components/next-button'
import { NextLink } from '@/components/next-link'
import { ShowHideUi } from '@/components/show-hide-ui'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import { useNoneSharedStore } from 'packages/ui/src/hooks/use-store'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, HashRouter as Router, Routes, redirect, useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ConnectButton } from 'ui/src/components/connect-button'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { NotificationsDropdown } from 'ui/src/components/notifications-dropdown'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'
import { AccountDesktopLavaMenu, MobileMenu } from 'ui/src/containers/accounts/navigation'
import { AccountViewDropdown } from 'ui/src/containers/accounts/navigation/account-view-dropdown'
import { useConnected } from 'ui/src/hooks/dapp/use-connected'

import * as styles from './header.css'

export const Header = () => {
	const navigate = useNavigate()
	const router = useRouter()
	const isConnected = useConnected()

	// const { selectedAccount } = useNoneSharedStore(state => ({
	// 	selectedAccount: state.selectedAccount,
	// }))

	return (
		<Box className={clsx(styles.headerWrapper, isConnected && styles.headerWrapperBorderColor)}>
			<ContentContainer>
				<Box className={styles.headerInnerWrapper}>
					{/* TODO: need to handle this menu when connected */}
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
										{/* <CopyAddressButton address={selectedAccount} /> */}
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
			</ContentContainer>
		</Box>
	)
}
