import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import React from 'react'

import * as styles from './styles.css'

const MotionBox: React.FC<PropsWithChildren> = ({ children }) => (
	<motion.div
		className={styles.animatedPageWrapper}
		initial={{ opacity: 0, position: 'absolute' }}
		animate={{ opacity: 1, position: 'relative' }}
		exit={{ opacity: 0, position: 'absolute' }}
		transition={{
			duration: 0.0,
			// duration: 0.3,
			ease: 'easeOut',
		}}
	>
		{children}
	</motion.div>
)

export default MotionBox
