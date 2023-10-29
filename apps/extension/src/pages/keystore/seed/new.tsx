import { FallbackLoading } from 'packages/ui/src/components/fallback-renderer'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSharedStore } from 'ui/src/hooks/use-store'
import { KeystoreType } from 'ui/src/store/types'

import { createMnemonic, secretToData } from '@src/crypto/secret'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import NewPhraseDisplay from './new-phrase-display'
import NewPhraseEnter from './new-phrase-enter'

export const New: React.FC = () => {
	const navigate = useNavigate()
	const { isUnlocked, isLoading } = useIsUnlocked()
	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [mnemonic, setMnemonic] = useState<string>('')
	const [words, setWords] = useState<string[]>([])
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		if (keystore?.type !== KeystoreType.LOCAL) navigate('/')
	}, [keystore])

	useEffect(() => {
		if (!isLoading && !isUnlocked) navigate('/')
	}, [isUnlocked, isLoading])

	useEffect(() => {
		if (!mnemonic) setMnemonic(createMnemonic())
	}, [])

	useEffect(() => {
		setWords(mnemonic.split(' '))
	}, [mnemonic])

	const handleCreateKeystore = (): Data => secretToData(DataType.MNEMONIC, mnemonic)

	const handleDone = () => navigate('/')

	if (!mnemonic) return <FallbackLoading />

	switch (step) {
		case 3:
			return <Done onNext={handleDone} />
		case 2:
			return (
				<KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleCreateKeystore} onNext={() => setStep(3)} />
			)
		case 1:
			return <NewPhraseEnter words={words} onBack={() => setStep(0)} onNext={() => setStep(2)} />
		default:
			return <NewPhraseDisplay words={words} onBack={() => navigate(-1)} onNext={() => setStep(1)} />
	}
}

export default New
