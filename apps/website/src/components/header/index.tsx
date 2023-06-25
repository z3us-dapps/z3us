import { NextButton } from '@/components/next-button'
import { NextLink } from '@/components/next-link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ConnectButton } from 'ui/src/components/connect-button'
import { LoadingBarsIcon } from 'ui/src/components/icons'
import { GithubIcon } from 'ui/src/components/icons/github-icon'
import { TelegramIcon } from 'ui/src/components/icons/telegram-icon'
import { TwitterIcon } from 'ui/src/components/icons/twitter-icon'
import { Z3usLogoText } from 'ui/src/components/z3us-logo-babylon'

import * as styles from './header.css'

export const Header = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleConnect = () => {
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			router.push('#/accounts/all', undefined, { scroll: false })
		}, 1000)
	}

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
				<Box>
					<Button
						sizeVariant="small"
						onClick={handleConnect}
						rightIcon={
							isLoading ? (
								<Box marginLeft="small">
									<LoadingBarsIcon />
								</Box>
							) : null
						}
					>
						Connect
					</Button>
				</Box>
				<ConnectButton />
			</Box>
		</Box>
	)
}
