// import { Paring } from '@radixdlt/connector-extension/src/pairing/pairing'
import React, { useState } from 'react'

import { Box } from 'ui/src/components/box'

import KeystoreForm from './components/keystore-form'
import { Pairing, PairingState } from './components/pairing'
import * as styles from './styles.css'

export const New: React.FC = () => {
	const [pairingState, setPairingState] = useState<PairingState>(PairingState.LOADING)
	const [connectionPassword, setConnectionPassword] = useState<string>('')

	return (
		<Box>
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
		</Box>
	)
}

export default New
