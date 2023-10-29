import React, { useEffect, useState } from 'react'

import WalletSecretForm from 'ui/src/components/form/wallet-secret-form'
import SeedPhraseDisplay from 'ui/src/components/seed-phrase-display'
import { useSharedStore } from 'ui/src/hooks/use-store'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import { KeystoreType } from 'ui/src/store/types'

import SecretTextDisplay from '../secret-text-display'

const SecretDisplay: React.FC = () => {
	const { isWallet } = useZdtState()

	const { keystore } = useSharedStore(state => ({
		keystore: state.keystores.find(({ id }) => id === state.selectedKeystoreId),
	}))

	const [secret, setSecret] = useState<string | undefined>()
	const [words, setWords] = useState<string[]>([])

	useEffect(() => {
		setWords(secret?.split(' ') || [])
	}, [secret])

	if (!isWallet || keystore?.type !== KeystoreType.LOCAL) return null
	if (!secret) return <WalletSecretForm onUnlock={setSecret} />

	return words?.length === 1 ? <SecretTextDisplay secret={secret} /> : <SeedPhraseDisplay words={words} />
}

export default SecretDisplay
