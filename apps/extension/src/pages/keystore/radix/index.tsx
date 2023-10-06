// import { Paring } from '@radixdlt/connector-extension/src/pairing/pairing'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { Box } from 'ui/src/components/box'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import KeystoreForm from './components/keystore-form'
import { PASSWORD_STORAGE_KEY, Pairing, PairingState } from './components/pairing'
import * as styles from './styles.css'

export const Radix: React.FC = () => {
	const navigate = useNavigate()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [pairingState, setPairingState] = useState<PairingState>(PairingState.LOADING)
	const [connectionPassword, setConnectionPassword] = useState<string>('')

	useEffect(() => {
		if (keystore?.type !== KeystoreType.RADIX_WALLET) {
			navigate('/')
			return
		}
		browser.storage.local.remove(PASSWORD_STORAGE_KEY)
	}, [keystore])

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
