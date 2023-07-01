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

import * as styles from './index-page.css'

const AppPage = dynamic(() => import('../app-page'), { ssr: false })

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
							className={styles.indexPageAppWrapper}
							initial={{ opacity: 0, position: 'absolute' }}
							animate={{ opacity: 1, position: 'relative' }}
							exit={{ opacity: 0, position: 'absolute' }}
							transition={{
								opacity: { ease: 'linear' },
								layout: { duration: 0.15 },
							}}
						>
							<AppPage />
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</>
	)
}
