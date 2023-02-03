import React from 'react'
import { motion } from 'framer-motion'

export const MOTION_VARIANTS = {
	initial: ({ direction }: { direction: 'forward' | 'backward' }) => ({
		x: direction === 'backward' ? 0 : 0,
		opacity: 0,
		position: 'relative',
		transition: {
			type: 'spring',
			duration: 5,
			delay: 0,
		},
	}),
	in: {
		x: 0,
		opacity: 1,
		position: 'relative',
		transition: {
			type: 'spring',
			duration: 1,
			delay: 0,
		},
	},
	out: ({ direction }: { direction: 'forward' | 'backward' }) => ({
		opacity: 0,
		x: direction === 'backward' ? 0 : 0,
		position: 'absolute',
		transition: {
			type: 'spring',
			duration: 1,
			delay: 0,
		},
	}),
}

export const AnimatedPage = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
	<motion.div
		layout
		custom={{ direction: 'forward' }}
		initial="initial"
		animate="in"
		exit="out"
		variants={MOTION_VARIANTS}
		style={{ width: '100%', height: '100%', top: 0, left: 0 }}
	>
		{children}
	</motion.div>
)
