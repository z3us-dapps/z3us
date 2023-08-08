import React, { useRef } from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './connect-button.css'

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'radix-connect-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
		}
	}
}

export const ConnectButton = () => {
	const radixConnectButtonRef = useRef(null)

	return (
		<Box className={styles.radixConnectButtonWrapper}>
			<radix-connect-button ref={radixConnectButtonRef} />
		</Box>
	)
}
