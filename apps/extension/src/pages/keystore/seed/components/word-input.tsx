import React, { useMemo } from 'react'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'

import { getWordList } from '@src/crypto/secret'

import * as styles from '../styles.css'

interface IProps {
	index: number
	word: string
	onChange: (index: number, word: string) => void
}

const validWords = getWordList()

export const WordInput: React.FC<IProps> = ({ index, word, onChange }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}
		onChange(index, event.target.value)
	}

	const possibleWords = useMemo(() => (word?.length > 2 ? validWords.filter(w => w.startsWith(word)) : []), [word])
	const isValid = useMemo(() => validWords.includes(word), [word])

	return (
		<Box>
			<Input
				styleVariant="secondary"
				sizeVariant="large"
				leftIconClassName={styles.keystoreRestoreInputClassWrapper}
				leftIcon={
					<Box>
						<Text>{index + 1}.</Text>
						<Text>{isValid ? '' : 'notvalid'}.</Text>
						<Text>{possibleWords.join('')}.</Text>
					</Box>
				}
				value={word}
				onChange={handleChange}
			/>
		</Box>
	)
}

export default WordInput
