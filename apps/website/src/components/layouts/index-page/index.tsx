/* eslint-disable @typescript-eslint/no-unused-vars */
// import { Header } from '@/components/header'
import { LandingPage } from '@/components/layouts/landing-page'
import clsx from 'clsx'
import { AnimatePresence, m as motion } from 'framer-motion'
import dynamic from 'next/dynamic'
// import { useConnected } from 'packages/ui/src/hooks/dapp/use-connected'
import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './index-page.css'

const AppPage = dynamic(() => import('../app-page'), { ssr: false })

const pageTransition = {
	opacity: { ease: 'linear' },
	layout: { duration: 0.15 },
}

export const IndexPage: React.FC = () => {
	// const isConnected = useConnected()
	const isConnected = false

	return (
		<Box className={clsx(isConnected && styles.connectedPageWrapper)}>
			{/* <Header /> */}
			<Box className={styles.indexPageWrapper}>
				<AnimatePresence initial={false}>
					{!isConnected && (
						<motion.div
							initial={{ opacity: 0, position: 'absolute' }}
							animate={{ opacity: 1, position: 'relative' }}
							exit={{ opacity: 0, position: 'absolute' }}
							transition={pageTransition}
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
							transition={pageTransition}
						>
							<AppPage />
						</motion.div>
					)}
				</AnimatePresence>
			</Box>
		</Box>
	)
}
