import React, { useState } from 'react'
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
	return (
		<Box className={styles.radixConnectButtonWrapper}>
			<radix-connect-button />
		</Box>
	)
}

interface IUseConnectButtonDappInfo {
	dAppName: string
}

export const UseConnectButtonDappInfo = () => {
	const [dappInfo, setDappInfo] = useState<IUseConnectButtonDappInfo>(null)
	const [delay] = useState<number>(1000)
	const [isChecking, setIsChecking] = useState<boolean>(true)

	useInterval(
		() => {
			const radixConnectBtn = document.querySelector('radix-connect-button')
			if (radixConnectBtn.dAppName) {
				setIsChecking(false)
				setDappInfo({
					dAppName: radixConnectBtn.dAppName,
				})
			}
		},
		isChecking ? delay : null,
	)

	return dappInfo
}
