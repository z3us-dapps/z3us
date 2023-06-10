import clsx, { type ClassValue } from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'

import { Box } from 'ui/src/components-v2/box'

import * as styles from './height-animate-panel.css'

interface IHeightAnimatePanelProps {
	children: React.ReactNode
	className?: ClassValue
	duration?: number
}
export const HeightAnimatePanel: React.FC<IHeightAnimatePanelProps> = props => {
	const { children, className, duration = 0.1 } = props

	const containerRef = useRef<HTMLDivElement | null>(null)
	const [height, setHeight] = useState<number | 'auto'>('auto')

	useEffect(() => {
		const resizeObserver = new ResizeObserver(entries => {
			const observedHeight = entries[0].contentRect.height
			setHeight(observedHeight)
		})

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current)
		}

		return () => {
			if (containerRef.current) {
				resizeObserver.disconnect()
			}
		}
	}, [])

	return (
		<Box className={clsx(styles.heightAnimatePanelWrapper, className)}>
			<motion.div style={{ height }} animate={{ height }} transition={{ duration }}>
				<div ref={containerRef}>{children}</div>
			</motion.div>
		</Box>
	)
}
