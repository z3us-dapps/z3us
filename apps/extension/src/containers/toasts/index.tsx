import React from 'react'
import * as Portal from '@radix-ui/react-portal'
import { motion, AnimatePresence } from 'framer-motion'
import { Toast } from 'ui/src/components/toasts/toast'
import { Box } from 'ui/src/components/atoms'
import { useSharedStore } from '@src/store'

export const Toasts: React.FC = () => {
	const { toasts, removeToast } = useSharedStore(state => ({
		toasts: state.toasts,
		addToast: state.addToastAction,
		removeToast: state.removeToastAction,
	}))

	return (
		<Box css={{ position: 'fixed', top: '0', width: '360px' }}>
			<AnimatePresence>
				{toasts.map(toast => (
					<Portal.Root key={toast.id} style={{ width: '100%' }}>
						<motion.div
							initial={{ opacity: 0, y: -75 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 0 }}
							style={{
								overflow: 'hidden',
							}}
						>
							<Toast
								key={toast.id}
								type={toast.type}
								title={toast.title}
								subTitle={toast.subTitle}
								duration={toast.duration}
								onClickClose={() => removeToast(toast.id)}
							>
								{toast.children}
							</Toast>
						</motion.div>
					</Portal.Root>
				))}
			</AnimatePresence>
		</Box>
	)
}
