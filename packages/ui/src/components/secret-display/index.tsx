import React, { useEffect, useState } from 'react'

import WalletSecretForm from 'ui/src/components/form/wallet-secret-form'
import SeedPhraseDisplay from 'ui/src/components/seed-phrase-display'
import { useZdtState } from 'ui/src/hooks/zdt/use-zdt'
import type { Keystore } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'

import SecretTextDisplay from '../secret-text-display'

interface IProps {
	keystore: Keystore
}

const SecretDisplay: React.FC<IProps> = ({ keystore }) => {
	const { isWallet } = useZdtState()

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
