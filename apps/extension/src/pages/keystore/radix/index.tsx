// import { Paring } from '@radixdlt/connector-extension/src/pairing/pairing'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import browser from 'webextension-polyfill'

import type { Keystore } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'
import { generateId } from 'ui/src/utils/generate-id'

import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import { PASSWORD_STORAGE_KEY, Pairing, PairingState } from './components/pairing'

export const Radix: React.FC = () => {
	const navigate = useNavigate()
	const { isUnlocked, isLoading } = useIsUnlocked()

	const [pairingState, setPairingState] = useState<PairingState>(PairingState.LOADING)
	const [connectionPassword, setConnectionPassword] = useState<string>('')
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		browser.storage.local.remove(PASSWORD_STORAGE_KEY)
	}, [])

	useEffect(() => {
		if (!isLoading && !isUnlocked) navigate('/')
	}, [isUnlocked, isLoading])

	useEffect(() => {
		if (step === 0 && pairingState === PairingState.PAIRED) setStep(1)
	}, [pairingState])

	const handleSubmit = (): [Keystore, Data] => {
		const id = generateId()
		const keystore: Keystore = {
			id,
			name: '',
			type: KeystoreType.RADIX_WALLET,
		}
		const data = {
			type: DataType.STRING,
			secret: connectionPassword,
		}
		return [keystore, data]
	}

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
