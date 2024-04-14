import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'

import * as styles from '../styles.css'

interface IProps {
	index: number
	word: string
	onChange: (index: number, word: string) => void
	onFocus: (index: number, word: string) => void
}

export const WordInput = forwardRef<HTMLInputElement, IProps>((props, ref: React.Ref<HTMLInputElement | null>) => {
	const { index, word, onChange, onFocus } = props

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const evt = event.nativeEvent as InputEvent
		if (evt.isComposing) {
			return
		}
		onChange(index, event.target.value.trim())
	}

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		onFocus(index, event.target.value)
	}

	const isValid = true

	return (
		<Box className={styles.keystoreRestoreInputWrapper}>
			<Input
				ref={ref}
				styleVariant={word?.length > 0 && !isValid ? 'secondary-error' : 'secondary'}
				sizeVariant="large"
				leftIconClassName={styles.keystoreRestoreInputClassWrapper}
				leftIcon={
					<Box>
						<Text className={styles.keystoreRestoreInputWordOverlay}>{word}</Text>
						<Text>{index + 1}.</Text>
					</Box>
				}
				value={word}
				onChange={handleChange}
				onFocus={handleFocus}
			/>
		</Box>
	)
})

export default WordInput
