import { Button } from 'packages/ui/src/components/button'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { secretToData } from '@src/crypto/secret'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'

export const New: React.FC = () => {
	const navigate = useNavigate()
	const { isUnlocked, isLoading } = useIsUnlocked()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [key, setKey] = useState<string>('')
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		if (keystore?.type !== KeystoreType.LOCAL) {
			navigate('/')
		}
	}, [keystore])

	useEffect(() => {
		if (!isLoading && !isUnlocked) navigate('/')
	}, [isUnlocked, isLoading])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}

		setKey(event.target.value)
	}

	const handleSubmit = (): Data => secretToData(DataType.PRIVATE_KEY, key)

	const handleDone = () => navigate('/')

	switch (step) {
		case 2:
			return <Done onNext={handleDone} />
		case 1:
			return <KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} onNext={() => setStep(2)} />
		default:
			return (
				<Box padding="xxxlarge">
					<Input value={key} elementType="textarea" type="textarea" onChange={handleChange} />
					<Button onClick={() => setStep(1)} sizeVariant="xlarge" styleVariant="primary" fullWidth disabled={!key}>
						Next
					</Button>
				</Box>
			)
	}
}

export default New
