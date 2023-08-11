import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'
import React from 'react'

const MotionBox: React.FC<PropsWithChildren> = ({ children }) => (
	<motion.div
		style={{
			zIndex: 10,
			position: 'absolute',
			height: '50vh',
			width: '50vw',
			backgroundColor: 'skyblue',
		}}
		initial={{
			scale: 0,
		}}
		animate={{ scale: 1, left: 0, top: '200px' }}
		exit={{
			scale: 0,
		}}
		transition={{
			duration: 3,
			ease: 'easeOut',
		}}
	>
		{children}
	</motion.div>
)

export default MotionBox
