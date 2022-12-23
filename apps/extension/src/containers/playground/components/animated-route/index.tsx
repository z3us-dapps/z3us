import React from 'react'
import { motion } from 'framer-motion'

export const MOTION_VARIANTS_BACK = {
	initial: ({ direction }: { direction: 'forward' | 'backward' }) => ({
		x: direction === 'backward' ? '-100%' : '100%',
		transition: {
			type: 'spring',
			duration: 5,
			delay: 0,
		},
	}),
	in: {
		x: 0,
		transition: {
			type: 'spring',
			duration: 1,
			delay: 0,
		},
	},
	out: ({ direction }: { direction: 'forward' | 'backward' }) => ({
		x: direction === 'backward' ? '100%' : '-100%',
		transition: {
			type: 'spring',
			duration: 1,
			delay: 0,
		},
	}),
}

export const MOTION_VARIANTS = {
	initial: ({ direction }: { direction: 'forward' | 'backward' }) => ({
		x: direction === 'backward' ? 0 : 0,
		opacity: 0,
		// x: direction === 'backward' ? '-100%' : '100%',
		transition: {
			type: 'spring',
			duration: 5,
			delay: 0,
		},
	}),
	in: {
		x: 0,
		opacity: 1,
		transition: {
			type: 'spring',
			duration: 1,
			delay: 0,
		},
	},
	out: ({ direction }: { direction: 'forward' | 'backward' }) => ({
		opacity: 0,
		x: direction === 'backward' ? 0 : 0,
		// x: direction === 'backward' ? '100%' : '-100%',
		transition: {
			type: 'spring',
			duration: 1,
			delay: 0,
		},
	}),
}

export const AnimatedPage = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
	<motion.div
		className="Page"
		custom={{ direction: 'forward' }}
		initial="initial"
		animate="in"
		exit="out"
		variants={MOTION_VARIANTS}
		style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
	>
		{children}
	</motion.div>
)
