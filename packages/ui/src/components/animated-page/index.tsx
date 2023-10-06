import { motion } from 'framer-motion'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { FallbackLoading, FallbackRenderer } from '../fallback-renderer'

export const AnimatedPage = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
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
		<React.Suspense fallback={<FallbackLoading />}>
			<ErrorBoundary fallbackRender={FallbackRenderer}>{children}</ErrorBoundary>
		</React.Suspense>
	</motion.div>
)
