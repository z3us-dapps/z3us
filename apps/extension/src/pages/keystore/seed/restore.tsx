import type { RefObject } from 'react'
import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon, Close2Icon } from 'ui/src/components/icons'
import { SelectSimple } from 'ui/src/components/select'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { KeystoreType } from 'ui/src/store/types'

import { Strength, getWordList, secretToData } from '@src/crypto/secret'
import type { Data } from '@src/types/vault'
import { DataType } from '@src/types/vault'

import Done from '../components/done'
import KeystoreForm from '../components/keystore-form'
import { Title } from '../components/title'
import WordInput from './components/word-input'
import * as styles from './styles.css'

const validWords = getWordList()

const messages = defineMessages({
	seed_restore_title: {
		defaultMessage: 'Restore from seed phrase',
		id: '6I8Iyd',
	},
	seed_restore_sub_title: {
		defaultMessage: 'Enter your recovery phrase to continue.',
		id: '0W6+5f',
	},
	seed_restore_phrase_select_box: {
		defaultMessage: 'Enter phrase word length:',
		id: 'hb1Im9',
	},
	seed_restore_continue: {
		defaultMessage: 'Continue',
		id: 'acrOoz',
	},
	restore_new_wallet_title: {
		defaultMessage: 'Create a new wallet',
		id: 'wx278L',
	},
	restore_new_wallet_sub_title: {
		defaultMessage: 'The password will be used to unlock your wallet.',
		id: 'a4CP1S',
	},
	incorrect_words: {
		defaultMessage: `{wordCount, plural,
			one {Word}
			other {Words}
		} {wordList} {wordCount, plural,
			one {is}
			other {are}
		} incorrect or misspelled`,
		id: 'En3v/Z',
	},
	phrase_clear_button: {
		defaultMessage: 'Clear',
		id: '/GCoTA',
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
	const btnRef = useRef<HTMLButtonElement>()
	const navigate = useNavigate()

	const [strength, setStrength] = useState<string>(String(Strength.WORD_COUNT_12))
	const [words, setWords] = useState<string[]>(
		Array.from<string>({ length: strengthToWordCounts[Strength.WORD_COUNT_12] }),
	)
	const [inputRefs, setInputRefs] = useState<RefObject<HTMLInputElement>[]>(
		Array.from({ length: strengthToWordCounts[Strength.WORD_COUNT_12] }, () => createRef<HTMLInputElement>()),
	)
	const [step, setStep] = useState<number>(0)
	const [possibleWords, setPossibleWords] = useState<string[]>([])
	const [focusedInput, setFocusedInput] = useState<number | undefined>(undefined)
	const isFocusedInput = typeof focusedInput !== undefined
	const filledWords = words.filter(value => value !== undefined)

	const incorrectWords = useMemo(
		() =>
			Object.keys(words)
				.filter(idx => words[idx] && !validWords.includes(words[idx]))
				.map(idx => +idx + 1),
		[words],
	)

	const setWordsByStrength = () => {
		setWords(Array.from<string>({ length: strengthToWordCounts[strength] }))
		setInputRefs(Array.from({ length: strengthToWordCounts[strength] }, () => createRef<HTMLInputElement>()))
	}

	useEffect(() => {
		setWordsByStrength()
	}, [strength])

	const handleChange = (idx: number, value: string) => {
		const newWords = [...words]
		newWords[idx] = value
		setWords(newWords)

		setPossibleWords(value?.length > 2 ? validWords.filter(w => w.startsWith(value)) : [])
	}

	const handleOnFocus = (idx: number) => {
		setFocusedInput(idx)
		setPossibleWords([])
	}

	const handleSelect = (s: string) => {
		setStrength(s)
	}

	const handleAddWord = (word: string) => {
		const nextInput = Number.isInteger(focusedInput) ? focusedInput + 1 : 0
		const newWords = [...words]
		newWords[focusedInput] = word

		setWords(newWords)
		setPossibleWords([])
		setFocusedInput(nextInput)

		if (nextInput !== undefined) {
			if (nextInput >= words.length) {
				btnRef?.current.focus()
			} else {
				inputRefs?.[nextInput].current.focus()
			}
		}
	}

	const handleSubmit = (): Data => secretToData(DataType.MNEMONIC, words.join(' '))

	const handleClearPhraseWords = () => {
		setWordsByStrength()
	}

	const handleDone = () => navigate('/')

	switch (step) {
		case 2:
			return <Done onNext={handleDone} />
		case 1:
			return (
				<Box className={styles.keystoreNewWrapper}>
					<Title
						title={intl.formatMessage(messages.restore_new_wallet_title)}
						subTitle={intl.formatMessage(messages.restore_new_wallet_sub_title)}
					/>
					<KeystoreForm keystoreType={KeystoreType.LOCAL} onSubmit={handleSubmit} onNext={() => setStep(2)} />
				</Box>
			)
		default:
			return (
				<Box className={styles.keystoreNewWrapper}>
					<Button onClick={() => navigate(-1)} styleVariant="ghost" sizeVariant="small" iconOnly>
						<ArrowLeftIcon />
					</Button>
					<Title
						title={intl.formatMessage(messages.seed_restore_title)}
						subTitle={intl.formatMessage(messages.seed_restore_sub_title)}
					/>
					<Box className={styles.keystoreSelectWrapper}>
						<Text size="xsmall">{intl.formatMessage(messages.seed_restore_phrase_select_box)}</Text>
						<SelectSimple sizeVariant="small" value={strength} onValueChange={handleSelect} data={strengthOptions} />
						<Box className={styles.keystoreClearButtonWrapper}>
							{filledWords?.length > 0 && (
								<Button
									sizeVariant="small"
									styleVariant="secondary"
									onClick={handleClearPhraseWords}
									leftIcon={<Close2Icon />}
								>
									{intl.formatMessage(messages.phrase_clear_button)}
								</Button>
							)}
						</Box>
					</Box>

					<Box className={styles.keystorePossibleWordWrapper}>
						{isFocusedInput &&
							possibleWords?.length > 0 &&
							possibleWords.map((word, i) => (
								// eslint-disable-next-line react/no-array-index-key
								<Box key={`${i}-${word}`}>
									<Button
										fullWidth
										sizeVariant="xsmall"
										styleVariant="tertiary"
										rounded
										onClick={() => handleAddWord(word)}
									>
										{word}
									</Button>
								</Box>
							))}
					</Box>

					<Box className={styles.keystoreRestoreWrapper}>
						<Box className={styles.keystoreRestoreGridWrapper}>
							{words.map((_, i) => (
								<WordInput
									// eslint-disable-next-line react/no-array-index-key
									key={i}
									ref={inputRefs[i]}
									index={i}
									word={words[i]}
									onChange={handleChange}
									onFocus={handleOnFocus}
								/>
							))}
						</Box>
					</Box>
					{incorrectWords.length > 0 && (
						<Box className={styles.keystoreRestoreErrorWrapper}>
							<ValidationErrorMessage
								message={intl.formatMessage(messages.incorrect_words, {
									wordCount: incorrectWords.length,
									wordList: intl.formatList(incorrectWords, { type: 'conjunction' }).toString(),
								})}
							/>
						</Box>
					)}
					<Box className={styles.keystoreRestoreContinueBtnWrapper}>
						<Button
							ref={btnRef}
							onClick={() => setStep(1)}
							sizeVariant="xlarge"
							styleVariant="primary"
							fullWidth
							disabled={!!words.find(w => w === '') || incorrectWords.length > 0}
						>
							{intl.formatMessage(messages.seed_restore_continue)}
						</Button>
					</Box>
				</Box>
			)
	}
}

export default Restore
