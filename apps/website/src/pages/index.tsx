/* eslint-disable @typescript-eslint/no-unused-vars */
import { LandingPage } from '@/components/layouts/landing-page'
import { LazyMotion } from '@/components/lazy-motion'
import { AnimatePresence, m as motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Link, Route, HashRouter as Router, Routes, redirect } from 'react-router-dom'

import { Box } from 'ui/src/components/box'

const AppPage = dynamic(() => import('../components/layouts/app-page'), { ssr: false })

const App = () => {
	const router = useRouter()
	const isConnected = router.asPath.includes('/#/accounts')

	return (
		<>
			<Head>
				{/* TODO: meta description for z3us.com */}
				<title>iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple</title>
				<meta
					name="description"
					content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
					key="home-page"
				/>
				<meta property="og:description" content="And a social description for our cool page" />
				<meta property="og:image" content="https://example.com/images/cool-page.jpg" />
			</Head>
			<LazyMotion>
				<Router>
					<Box>
						<AnimatePresence initial={false}>
							{!isConnected && (
								<motion.div
									initial={{ opacity: 0, position: 'absolute' }}
									animate={{ opacity: 1, position: 'relative' }}
									exit={{ opacity: 0, position: 'absolute' }}
									transition={{
										opacity: { ease: 'linear' },
										layout: { duration: 0.15 },
									}}
								>
									<LandingPage />
								</motion.div>
							)}
						</AnimatePresence>
						<AnimatePresence initial={false}>
							{isConnected && (
								<motion.div
									initial={{ opacity: 0, position: 'absolute' }}
									animate={{ opacity: 1, position: 'relative' }}
									exit={{ opacity: 0, position: 'absolute' }}
									transition={{
										opacity: { ease: 'linear' },
										layout: { duration: 0.15 },
									}}
									style={{ width: '100%', height: '100%', top: 0, left: 0 }}
								>
									<AppPage />
								</motion.div>
							)}
						</AnimatePresence>
					</Box>
				</Router>
			</LazyMotion>
		</>
	)
}

export default App
