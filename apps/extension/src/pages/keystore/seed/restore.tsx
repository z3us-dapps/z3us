import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { Input } from 'ui/src/components/input'
import { SeedPhraseDisplayInput } from 'ui/src/components/seed-phrase-display'
import { SelectSimple } from 'ui/src/components/select'
import { Text } from 'ui/src/components/typography'
import type { Keystore } from 'ui/src/store/types'
import { KeystoreType } from 'ui/src/store/types'
import { generateId } from 'ui/src/utils/generate-id'

import { Strength, secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import * as styles from './styles.css'

const messages = defineMessages({
	seed_restore_title: {
		defaultMessage: 'Restore from seed phrase',
		id: '6I8Iyd',
	},
	seed_restore_sub_title: {
		defaultMessage: 'please enter your recovery to your wallet.',
		id: '92Ggeb',
	},

	seed_restore_phrase_select_box: {
		defaultMessage: 'Enter phrase word length:',
		id: 'hb1Im9',
	},
	seed_restore_continue: {
		defaultMessage: 'Continue',
		id: 'acrOoz',
	},

	create_new_wallet_title: {
		defaultMessage: 'Create a new wallet',
		id: 'wx278L',
	},
	create_new_wallet_sub_title: {
		defaultMessage: 'The password will be used to unlock your wallet.',
		id: 'a4CP1S',
	},
})

const strengthToWordCounts = {
	[Strength.WORD_COUNT_12]: 12,
	[Strength.WORD_COUNT_15]: 15,
	[Strength.WORD_COUNT_18]: 18,
	[Strength.WORD_COUNT_21]: 21,
	[Strength.WORD_COUNT_24]: 24,
}

const strengthOptions = [
	{ id: String(Strength.WORD_COUNT_12), title: `${strengthToWordCounts[Strength.WORD_COUNT_12]}` },
	{ id: String(Strength.WORD_COUNT_15), title: `${strengthToWordCounts[Strength.WORD_COUNT_15]}` },
	{ id: String(Strength.WORD_COUNT_18), title: `${strengthToWordCounts[Strength.WORD_COUNT_18]}` },
	{ id: String(Strength.WORD_COUNT_21), title: `${strengthToWordCounts[Strength.WORD_COUNT_21]}` },
	{ id: String(Strength.WORD_COUNT_24), title: `${strengthToWordCounts[Strength.WORD_COUNT_24]}` },
]

export const Restore: React.FC = () => {
	const intl = useIntl()
	const navigate = useNavigate()

	const [strength, setStrength] = useState<string>(String(Strength.WORD_COUNT_12))
	const [words, setWords] = useState<string[]>(
		Array.from<string>({ length: strengthToWordCounts[Strength.WORD_COUNT_12] }),
	)
	const [step, setStep] = useState<number>(0)

	useEffect(() => {
		setWords(Array.from<string>({ length: strengthToWordCounts[strength] }))
	}, [strength])

	const handleChange = (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}
		const newWords = [...words]
		newWords[idx] = event.target.value
		setWords(newWords)
	}

	const handleSelect = (s: string) => {
		setStrength(s)
	}

	const handleSubmit = (): [Keystore, Data] => {
		const id = generateId()
		const keystore: Keystore = {
			id,
			name: id,
			type: KeystoreType.LOCAL,
		}
		const data = secretToData(DataType.MNEMONIC, words.join(' '))
		return [keystore, data]
	}

	const handleDone = () => navigate('/')

	switch (step) {
		case 2:
			return <Done onNext={handleDone} />
		// case 1:
		// 	return <KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} onNext={() => setStep(2)} />

		case 1:
			return (
				<Box className={styles.keystoreNewWrapper}>
					<Box className={styles.keystoreNewTextWrapper}>
						<Text size="xxlarge" weight="strong" color="strong">
							{intl.formatMessage(messages.create_new_wallet_title)}
						</Text>
						<Text>{intl.formatMessage(messages.create_new_wallet_sub_title)}</Text>
					</Box>
					<KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} onNext={() => setStep(2)} />
				</Box>
			)
		default:
			return (
				<Box className={styles.keystoreNewWrapper}>
					<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
						<ArrowLeftIcon />
					</Button>
					<Box className={styles.keystoreNewTextWrapper}>
						<Text color="strong" size="xxlarge" weight="strong">
							{intl.formatMessage(messages.seed_restore_title)}
						</Text>
						<Text>{intl.formatMessage(messages.seed_restore_sub_title)}</Text>
					</Box>

					<Box className={styles.keystoreSelectWrapper}>
						<Text size="xsmall">{intl.formatMessage(messages.seed_restore_phrase_select_box)}</Text>
						<SelectSimple sizeVariant="small" value={strength} onValueChange={handleSelect} data={strengthOptions} />
					</Box>

					<Box className={styles.keystoreRestoreWrapper}>
						<Box className={styles.keystoreRestoreGridWrapper}>
							{words.map((_, i) => (
								// eslint-disable-next-line react/no-array-index-key
								<Box key={i}>
									<Input
										styleVariant="secondary"
										sizeVariant="large"
										leftIconClassName={styles.keystoreRestoreInputClassWrapper}
										leftIcon={
											<Box>
												<Text>{i + 1}.</Text>
											</Box>
										}
										value={words[i]}
										onChange={handleChange(i)}
									/>
								</Box>
							))}
						</Box>
					</Box>

					<Button
						onClick={() => setStep(1)}
						sizeVariant="xlarge"
						styleVariant="primary"
						fullWidth
						disabled={!!words.find(w => w === '')}
					>
						{intl.formatMessage(messages.seed_restore_continue)}
					</Button>
				</Box>
			)
	}
}

export default Restore
