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

	// const handleConnect = () => {
	// 	console.log(111111111111111, 'handle connect')
	// }

	// useEffect(() => {
	// 	const connectBtn = radixConnectButtonRef.current
	// 	if (connectBtn) {
	// 		connectBtn.addEventListener('onConnect', handleConnect)
	// 	}

	// 	return () => {
	// 		if (connectBtn) {
	// 			connectBtn.removeEventListener('onConnect', handleConnect)
	// 		}
	// 	}
	// }, [radixConnectButtonRef.current])

	return (
		<Box className={styles.radixConnectButtonWrapper}>
			<radix-connect-button ref={radixConnectButtonRef} />
		</Box>
	)
}

interface IUseConnectButtonDappInfo {
	dAppName: string
	personaLabel: string
	loading: boolean
	connected: boolean
	connecting: boolean
	showPopover: boolean
	showNotification: boolean
	requestItems: any
	accounts: any
	personaData: any
}

// requestItems: RequestItem[]
// accounts: Account[]
// personaData: PersonaData[]

export const useConnectButtonDappInfo = () => {
	const [dappInfo, setDappInfo] = useState<IUseConnectButtonDappInfo>({
		dAppName: null,
		personaLabel: null,
		loading: false,
		connected: false,
		connecting: false,
		showPopover: false,
		showNotification: false,
		requestItems: null,
		accounts: null,
		personaData: null,
	})
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isChecking, setIsChecking] = useState<boolean>(true)
	const DELAY_CHECK = 1000

	// const handleConnect = () => {}

	useInterval(
		() => {
			const radixConnectBtn = document.querySelector('radix-connect-button')

			if (radixConnectBtn?.dAppName) {
				// setIsChecking(false)
				setDappInfo({
					dAppName: radixConnectBtn.dAppName,
					personaLabel: radixConnectBtn.personaLabel,
					loading: radixConnectBtn.loading,
					connected: radixConnectBtn.connected,
					connecting: radixConnectBtn.connecting,
					showPopover: radixConnectBtn.showPopover,
					showNotification: radixConnectBtn.showNotification,
					requestItems: radixConnectBtn.requestItems,
					accounts: radixConnectBtn.accounts,
					personaData: radixConnectBtn.personaData,
				})
			}
		},
		isChecking ? DELAY_CHECK : null,
	)

	// useEffect(() => {
	// 	if (radixConnectBtn) {
	// 		radixConnectBtn.addEventListener('onConnect', handleConnect)
	// 	}

	// 	return () => {
	// 		if (radixConnectBtn) {
	// 			radixConnectBtn.removeEventListener('onConnect', handleConnect)
	// 		}
	// 	}
	// }, [])

	return dappInfo
}
