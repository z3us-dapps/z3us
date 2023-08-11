import { AnimatePresence, motion } from 'framer-motion'
import React, { Suspense, useMemo } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

const Staking: React.FC = () => {
	const location = useLocation()
	const outlet = useOutlet()

	const key = useMemo(() => location.pathname.split('/')[1], [location.pathname])

	return (
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
			<AnimatePresence initial={false}>
				<Suspense key={key} fallback={<div>Suspense AppsWrapper</div>}>
					{outlet}
				</Suspense>
			</AnimatePresence>
		</motion.div>
	)
}

export default Staking
