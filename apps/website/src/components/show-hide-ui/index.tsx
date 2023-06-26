import { AnimatePresence, m as motion } from 'framer-motion'
import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './show-hide-ui.css'

interface IShowHideUiProps {
	showCondition: boolean
	showUi: React.ReactElement
	hideUi?: React.ReactElement
}

export const ShowHideUi: React.FC<IShowHideUiProps> = props => {
	const { showCondition, showUi, hideUi } = props

	return (
		<Box className={styles.showHideUiWrapper}>
			<AnimatePresence initial={false}>
				{!showCondition && !!hideUi && (
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
						{hideUi}
					</motion.div>
				)}
			</AnimatePresence>
			<AnimatePresence initial={false}>
				{showCondition && (
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
						{showUi}
					</motion.div>
				)}
			</AnimatePresence>
		</Box>
	)
}
