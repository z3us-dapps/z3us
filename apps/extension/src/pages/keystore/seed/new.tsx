import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { FallbackLoading } from 'ui/src/components/fallback-renderer'
import { Text } from 'ui/src/components/typography'
import { KeystoreType } from 'ui/src/store/types'

import { createMnemonic, secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import { Title } from '../components/title'
import NewPhraseDisplay from './components/new-phrase-display'
import NewPhraseEnter from './components/new-phrase-enter'
import * as styles from './styles.css'

const messages = defineMessages({
	create_new_wallet_title: {
		defaultMessage: 'Create a new wallet',
		id: 'wx278L',
	},
	create_new_wallet_sub_title: {
		defaultMessage: 'The password will be used to unlock your wallet.',
		id: 'a4CP1S',
	},
})

export const New: React.FC = () => {
	const navigate = useNavigate()

	const intl = useIntl()

	const [mnemonic, setMnemonic] = useState<string>('')
	const [words, setWords] = useState<string[]>([])
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		if (!mnemonic) setMnemonic(createMnemonic())
	}, [])

	useEffect(() => {
		setWords(mnemonic.split(' '))
	}, [mnemonic])

	const handleSubmit = (): Data => secretToData(DataType.MNEMONIC, mnemonic)

	const handleDone = () => navigate('/')

	if (!mnemonic) return <FallbackLoading />

	switch (step) {
		case 3:
			return <Done onNext={handleDone} />
		case 2:
			return (
				<Box className={styles.keystoreNewWrapper}>
					<Title
						title={intl.formatMessage(messages.create_new_wallet_title)}
						subTitle={intl.formatMessage(messages.create_new_wallet_sub_title)}
					/>
					<KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} onNext={() => setStep(3)} />
				</Box>
			)
		case 1:
			return <NewPhraseEnter words={words} onBack={() => setStep(0)} onNext={() => setStep(2)} />
		default:
			return <NewPhraseDisplay words={words} onBack={() => navigate(-1)} onNext={() => setStep(1)} />
	}
}

export default New
