// import { Paring } from '@radixdlt/connector-extension/src/pairing/pairing'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { KeystoreType } from 'ui/src/store/types'

import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import { PASSWORD_STORAGE_KEY, Pairing, PairingState } from './components/pairing'

export const Radix: React.FC = () => {
	const navigate = useNavigate()

	const [pairingState, setPairingState] = useState<PairingState>(PairingState.LOADING)
	const [connectionPassword, setConnectionPassword] = useState<string>('')
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		browser.storage.local.remove(PASSWORD_STORAGE_KEY)
	}, [])

	useEffect(() => {
		if (step === 0 && pairingState === PairingState.PAIRED) setStep(1)
	}, [pairingState])

	const handleSubmit = (): Data => ({
		type: DataType.STRING,
		secret: connectionPassword,
	})

	const handleDone = () => navigate('/')

	switch (step) {
		case 2:
			return <Done onNext={handleDone} />
		case 1:
			return <KeystoreForm keystoreType={KeystoreType.RADIX_WALLET} onSubmit={handleSubmit} onNext={() => setStep(2)} />
		default:
			return (
				<Pairing
					pairingState={pairingState}
					connectionPassword={connectionPassword}
					onPairingStateChange={setPairingState}
					onConnectionPasswordChange={setConnectionPassword}
				/>
			)
	}
}

export default Radix
