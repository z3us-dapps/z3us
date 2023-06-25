/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentContainer } from '@/components/content-container'
import { NextButton } from '@/components/next-button'
import { NextLink } from '@/components/next-link'
import { clsx } from 'clsx'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, HashRouter as Router, Routes, redirect, useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ConnectButton, useConnectButtonDappInfo } from 'ui/src/components/connect-button'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { ExternalLinkIcon, LoadingBarsIcon } from 'ui/src/components/icons'
import { GithubIcon } from 'ui/src/components/icons/github-icon'
import { TelegramIcon } from 'ui/src/components/icons/telegram-icon'
import { TwitterIcon } from 'ui/src/components/icons/twitter-icon'
import { NotificationsDropdown } from 'ui/src/components/notifications-dropdown'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'
import { AccountViewDropdown } from 'ui/src/containers/accounts/account-view-dropdown'
import { AccountDesktopLavaMenu } from 'ui/src/containers/accounts/navigation'

import * as styles from './header.css'

const fetchLocalStorage = () => {
	let data: any
	const localStorageKeys = Object.keys(localStorage)
	const matchingKey = localStorageKeys.find(key => /^rdt:account/.test(key))

	if (matchingKey) {
		data = JSON.parse(localStorage.getItem(matchingKey))
	}

	return data
}

export const Header = () => {
	const navigate = useNavigate()
	const router = useRouter()
	const [isFirstConnect, setIsFirstConnect] = useState<boolean>(false)
	// TODO make is connected hook
	const localStorage = fetchLocalStorage()
	const { connected } = useConnectButtonDappInfo()

	const isDappConnected = connected || localStorage?.connected

	const handleGoToDapp = () => {
		// router.push('#/accounts/all', undefined, { scroll: false })
	}

	// TODO: refactor
	useEffect(() => {
		if (connected && !isFirstConnect) {
			setIsFirstConnect(true)
		}
	}, [connected])

	return (
		<Box className={clsx(styles.headerWrapper, isDappConnected && styles.headerWrapperBorderColor)}>
			<ContentContainer>
				<Box className={styles.headerInnerWrapper}>
					<Box className={styles.landingHeaderBrandWrapper}>
						<Link to="/">
							<Z3usLogoText />
						</Link>
						<Box>
							<AccountDesktopLavaMenu />
						</Box>
					</Box>
					<Box display="flex" gap="small" alignItems="center">
						{isDappConnected ? (
							<Box>
								<Button
									styleVariant="tertiary"
									sizeVariant="small"
									onClick={handleGoToDapp}
									rightIcon={<ExternalLinkIcon />}
								>
									Go to Dapp
								</Button>
								<NotificationsDropdown />
								<CopyAddressButton address="rdx1b707388613169bf701d533e143d8f698c9090f605e677a967eaf70a4c69250ce" />
								<AccountViewDropdown />
							</Box>
						) : null}
						<Box className={styles.connectButtonWrapper}>
							<ConnectButton />
						</Box>
					</Box>
				</Box>
			</ContentContainer>
		</Box>
	)
}
