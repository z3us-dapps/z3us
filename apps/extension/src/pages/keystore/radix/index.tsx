// import { Paring } from '@radixdlt/connector-extension/src/pairing/pairing'
import { chromeLocalStore } from '@radixdlt/connector-extension/src/chrome/helpers/chrome-local-store'
import React, { useEffect, useState } from 'react'

import { Box } from 'ui/src/components/box'

import KeystoreForm from './components/keystore-form'
import { PASSWORD_STORAGE_KEY, Pairing, PairingState } from './components/pairing'
import * as styles from './styles.css'

export const Radix: React.FC = () => {
	const [pairingState, setPairingState] = useState<PairingState>(PairingState.LOADING)
	const [connectionPassword, setConnectionPassword] = useState<string>('')

	useEffect(() => {
		chromeLocalStore.removeItem(PASSWORD_STORAGE_KEY)
	}, [])

	return (
		<Box padding="xxxlarge" className={styles.pairingWrapper}>
			<Box>
				<Pairing
					pairingState={pairingState}
					connectionPassword={connectionPassword}
					onPairingStateChange={setPairingState}
					onConnectionPasswordChange={setConnectionPassword}
				/>
			</Box>
			<Box>{pairingState === PairingState.PAIRED && <KeystoreForm connectionPassword={connectionPassword} />}</Box>
		</Box>
	)
}

export default Radix
