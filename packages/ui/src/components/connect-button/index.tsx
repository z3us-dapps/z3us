import React, { useRef, useState } from 'react'
import { useInterval } from 'usehooks-ts'

import { Box } from 'ui/src/components/box'

import * as styles from './connect-button.css'

declare global {
	namespace JSX {
		interface IntrinsicElements {
			'radix-connect-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
		}
	}
}

// eslint-disable-next-line arrow-body-style
export const ConnectButton = () => {
	const radixConnectButtonRef = useRef(null)

	return (
		<Box className={styles.radixConnectButtonWrapper}>
			<radix-connect-button ref={radixConnectButtonRef} />
		</Box>
	)
}
