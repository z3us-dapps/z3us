import React from 'react'
import { Toaster } from 'sonner'

import * as styles from './toasts.css'

export const Toasts: React.FC = () => (
	<Toaster
		toastOptions={{
			className: styles.toastsWrapper,
		}}
		richColors
		position="top-center"
		closeButton
		visibleToasts={3}
		offset="20px"
	/>
)
