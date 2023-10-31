// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useMemo } from 'react'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'

// import { getWordList } from '@src/crypto/secret'
import * as styles from '../styles.css'

interface IProps {
	index: number
	word: string
	onChange: (index: number, word: string) => void
	onFocus: (index: number, word: string) => void
}

// const validWords = getWordList()

export const WordInput: React.FC<IProps> = ({ index, word, onChange, onFocus }) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}
		onChange(index, event.target.value)
	}

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		onFocus(index, event.target.value)
	}

	// const possibleWords = useMemo(() => (word?.length > 2 ? validWords.filter(w => w.startsWith(word)) : []), [word])
	// const isValid = useMemo(() => possibleWords.includes(word), [word, possibleWords])
	const isValid = true

	return (
		<Box className={styles.keystoreRestoreInputWrapper}>
			<Input
				styleVariant={word?.length > 0 && !isValid ? 'secondary-error' : 'secondary'}
				sizeVariant="large"
				leftIconClassName={styles.keystoreRestoreInputClassWrapper}
				leftIcon={
					<Box>
						<Text className={styles.keystoreRestoreInputWordOverlay}>{word}</Text>
						<Text>{index + 1}.</Text>
						{/* <Text>{isValid ? '' : 'notvalid'}.</Text> */}
						{/* <Text>{possibleWords.join('')}.</Text> */}
					</Box>
				}
				value={word}
				onChange={handleChange}
				onFocus={handleFocus}
			/>
		</Box>
	)
}

export default WordInput
