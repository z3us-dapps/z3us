/* eslint-disable @typescript-eslint/no-unused-vars */
import { ContentContainer } from '@/components/content-container'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { LandingPage } from '@/components/layouts/landing-page'
import { AnimatePresence, m as motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Link, Route, HashRouter as Router, Routes, redirect, useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ConnectButton } from 'ui/src/components/connect-button'
import { LoadingBarsIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'

import * as styles from './index-page.css'

const AppPage = dynamic(() => import('../app-page'), { ssr: false })

// eslint-disable-next-line arrow-body-style
export const IndexPage: React.FC = () => {
	const location = useLocation()
	const isConnected = location.pathname.includes('/accounts')

	return (
		<>
			<Header />
			<Box className={styles.indexPageWrapper}>
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
							style={{ width: '100vw', height: 'calc(100vh - 71px)', top: 0, left: 0, overflow: 'hidden' }}
						>
							<AppPage />
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</>
	)
}
