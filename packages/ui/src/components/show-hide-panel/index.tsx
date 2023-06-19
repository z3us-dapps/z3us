import clsx, { type ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './show-hide-panel.css'

interface IShowHidePanelProps {
	children: React.ReactNode
	className?: ClassValue
	isChildrenVisible?: boolean
}
export const ShowHidePanel: React.FC<IShowHidePanelProps> = props => {
	const { children, isChildrenVisible = false, className } = props

	return (
		<Box className={clsx(styles.showHidePanelWrapper, className)}>
			<AnimatePresence initial={false}>
				{isChildrenVisible && (
					<motion.section
						initial="closed"
						animate="open"
						exit="closed"
						variants={{
							open: {
								opacity: 1,
								height: 'auto',
								transition: {
									type: 'spring',
									bounce: 0,
									duration: 0.7,
									delayChildren: 0.2,
								},
							},
							closed: {
								opacity: 1,
								height: 0,
								transition: {
									delay: 0.3,
									type: 'spring',
									bounce: 0,
									duration: 0.3,
								},
							},
						}}
					>
						<motion.div
							variants={{
								open: {
									opacity: 1,
									transition: { type: 'spring', stiffness: 300, damping: 24 },
								},
								closed: { opacity: 0, transition: { duration: 0.2 } },
							}}
						>
							{children}
						</motion.div>
					</motion.section>
				)}
			</AnimatePresence>
		</Box>
	)
}
