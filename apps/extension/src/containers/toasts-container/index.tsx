import React from 'react'
import { Toaster } from 'sonner'

import * as styles from './toasts-container.css'

export const Toasts: React.FC = () => (
	<Toaster
		toastOptions={{
			className: styles.toastsWrapper,
			descriptionClassName: 'my-toast-description',
		}}
		position="top-center"
		closeButton
		// expand
		visibleToasts={3}
		offset="20px"
	/>
)
