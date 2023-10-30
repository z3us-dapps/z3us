/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { ArrowLeftIcon } from 'ui/src/components/icons'
import { SeedPhraseDisplayInput } from 'ui/src/components/seed-phrase-display'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

function shuffle<T>(array: T[]): T[] {
	let currentIndex = array.length
	let randomIndex

	// While there remain elements to shuffle.
	while (currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1

		// And swap it with the current element.
		;[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
	}

	return array
}

const messages = defineMessages({
	phrase_enter_title: {
		defaultMessage: 'Verify recovery phrase',
		id: 'RTnITK',
	},
	phrase_enter_sub_title: {
		defaultMessage:
			'Select each word below in their correct order by clicking each pill, to restart click on one of the inputs.',
		id: 'shWhSA',
	},
	phrase_display_continue: {
		defaultMessage: 'Continue',
		id: 'acrOoz',
	},
})

interface IProps {
	words: string[]
	onBack: () => void
	onNext: () => void
}

export const NewPhraseEnter: React.FC<IProps> = ({ words, onBack, onNext }) => {
	const intl = useIntl()

	const [shuffled, setShuffled] = useState<string[]>([])
	const [verification, setVerification] = useState<string[]>([])

	useEffect(() => {
		setShuffled(shuffle([...words]))
	}, [words])

	const handleAddWord = (word: string) => {
		setVerification([...verification, word])
	}

	const handleClear = () => {
		setVerification([])
	}

	return (
		<Box className={styles.keystoreNewWrapper}>
			<Button onClick={onBack} styleVariant="ghost" sizeVariant="small" iconOnly>
				<ArrowLeftIcon />
			</Button>
			<Box className={styles.keystoreNewTextWrapper}>
				<Text size="xxlarge" weight="strong" color="strong">
					{intl.formatMessage(messages.phrase_enter_title)}
				</Text>
				<Text>{intl.formatMessage(messages.phrase_enter_sub_title)}</Text>
			</Box>
			<Box className={styles.keystoreNewPhraseGridButtonWrapper}>
				{shuffled.map((word, i) => {
					const isDisabled = verification.includes(word)
					return (
						<Box key={`${i}-${word}`} style={{ opacity: isDisabled ? 0.5 : 1 }}>
							<Button
								fullWidth
								sizeVariant="xsmall"
								styleVariant="tertiary"
								rounded
								onClick={() => handleAddWord(word)}
								disabled={isDisabled}
							>
								{word}
							</Button>
						</Box>
					)
				})}
			</Box>
			<Box className={styles.keystoreNewPhraseGridWrapper}>
				{words.map((word, i) => (
					<SeedPhraseDisplayInput key={word} word={verification[i] || ''} index={i} onClear={handleClear} />
				))}
			</Box>
			<Button
				onClick={onNext}
				sizeVariant="xlarge"
				styleVariant="primary"
				fullWidth
				disabled={words.join('') !== verification.join('')}
			>
				{intl.formatMessage(messages.phrase_display_continue)}
			</Button>
		</Box>
	)
}

export default NewPhraseEnter
