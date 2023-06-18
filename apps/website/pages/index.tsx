/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppPage } from '@/components/layouts/app-page'
import { LandingPage } from '@/components/layouts/landing-page'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Link, Route, HashRouter as Router, Routes, redirect } from 'react-router-dom'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { Text } from 'ui/src/components-v2/typography'
import { LoadingBarsIcon } from 'ui/src/components/icons'

const App = () => {
	const router = useRouter()
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleConnect = () => {
		setIsLoading(true)
		setTimeout(() => {
			setIsConnected(true)
			setIsLoading(false)
		}, 1000)
	}

	// if (!isConnected) {
	// 	router.push('/')
	// }

	return (
		<>
			<Head>
				<title>iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple</title>
				<meta
					name="description"
					content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
					key="desc"
				/>
				<meta property="og:description" content="And a social description for our cool page" />
				<meta property="og:image" content="https://example.com/images/cool-page.jpg" />
			</Head>

			<Router>
				<Box padding="large">
					<Button
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
				{isConnected ? <AppPage /> : <LandingPage />}
			</Router>
		</>
	)
}

export default App
