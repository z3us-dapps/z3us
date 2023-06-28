import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

interface ITransferPageAnimationProps {
	children: React.ReactNode
	slideWrapperHeight: number
	page: number
	direction: number
}

export const TransferPageAnimation: React.FC<ITransferPageAnimationProps> = props => {
	const { children, slideWrapperHeight, page, direction } = props

	return (
		<AnimatePresence initial={false} custom={direction}>
			<motion.div
				key={page}
				custom={direction}
				variants={{
					initial: (_direction: number) => ({
						x: _direction > 0 ? 40 : -40,
						opacity: 0,
						position: 'absolute',
						height: `${slideWrapperHeight}px`,
					}),
					animate: {
						zIndex: 1,
						x: 0,
						opacity: 1,
						position: 'relative',
						height: 'auto',
					},
					exit: (_direction: number) => ({
						zIndex: 0,
						x: _direction < 0 ? 40 : -40,
						opacity: 0,
						position: 'absolute',
						height: `${slideWrapperHeight}px`,
					}),
				}}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{
					x: { type: 'spring', stiffness: 150, damping: 30 },
					opacity: { duration: 0.3 },
				}}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	)
}
