import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import React from 'react'

import * as styles from './styles.css'

const MotionBox: React.FC<PropsWithChildren> = ({ children }) => (
	<motion.div
		className={styles.animatedPageWrapper}
		initial={{ scale: 0.95, opacity: 0 }}
		animate={{ scale: 1, opacity: 1 }}
		exit={{ scale: 0.95, opacity: 0 }}
		transition={{
			duration: 0.3,
			ease: 'easeOut',
		}}
	>
		{children}
	</motion.div>
)

export default MotionBox
