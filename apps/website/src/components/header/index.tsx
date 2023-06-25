/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextButton } from '@/components/next-button'
import { NextLink } from '@/components/next-link'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, HashRouter as Router, Routes, redirect } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ConnectButton, useConnectButtonDappInfo } from 'ui/src/components/connect-button'
import { ExternalLinkIcon, LoadingBarsIcon } from 'ui/src/components/icons'
import { GithubIcon } from 'ui/src/components/icons/github-icon'
import { TelegramIcon } from 'ui/src/components/icons/telegram-icon'
import { TwitterIcon } from 'ui/src/components/icons/twitter-icon'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'
import { NoneSharedStoreContext } from 'ui/src/context/state'

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
	const router = useRouter()
	const [isFirstConnect, setIsFirstConnect] = useState<boolean>(false)
	// TODO make is connected hook
	const localStorage = fetchLocalStorage()
	const { connected } = useConnectButtonDappInfo()

	const handleGoToDapp = () => {
		router.push('#/accounts/all', undefined, { scroll: false })
	}

	// TODO: refactor
	useEffect(() => {
		if (connected && !isFirstConnect) {
			setIsFirstConnect(true)
		}
	}, [connected])

	return (
		<Box className={styles.headerWrapper}>
			<Box className={styles.landingHeaderBrandWrapper}>
				<NextLink href="/">
					<Z3usLogoText />
				</NextLink>
			</Box>
			<Box display="flex" gap="small" alignItems="center">
				<NextButton sizeVariant="small" styleVariant="ghost" iconOnly to="https://t.me/z3us_dapps">
					<TelegramIcon />
				</NextButton>
				<NextButton sizeVariant="small" styleVariant="ghost" iconOnly to="https://twitter.com/z3us_dapps">
					<TwitterIcon />
				</NextButton>
				<NextButton sizeVariant="small" styleVariant="ghost" iconOnly to="https://github.com/z3us-dapps">
					<GithubIcon />
				</NextButton>
				{connected || localStorage?.connected ? (
					<Box>
						<Button
							styleVariant="tertiary"
							sizeVariant="small"
							onClick={handleGoToDapp}
							rightIcon={<ExternalLinkIcon />}
						>
							Go to Dapp
						</Button>
					</Box>
				) : null}
				<Box className={styles.connectButtonWrapper}>
					<ConnectButton />
				</Box>
			</Box>
		</Box>
	)
}
