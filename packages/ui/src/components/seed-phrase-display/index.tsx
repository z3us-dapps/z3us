import React from 'react'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Close2Icon } from 'ui/src/components/icons'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface TProps {
	word: string
	index: number
	onClear?: () => void
}

export const SeedPhraseDisplayInput: React.FC<TProps> = ({ word, index, onClear }) => (
	<Box className={styles.inputBlurWrapper}>
		<Input
			styleVariant="secondary"
			sizeVariant="large"
			// disabled
			leftIcon={
				<Box>
					<Text>{index + 1}.</Text>
				</Box>
			}
			rightIcon={
				!!onClear && (
					<Box style={{ marginRight: '-10px' }}>
						<Button styleVariant="ghost" sizeVariant="xsmall" iconOnly onClick={onClear}>
							<Close2Icon />
						</Button>
					</Box>
				)
			}
		/>
		<Box className={styles.inputBlurWordWrapper}>
			<Text>{word}</Text>
		</Box>
	</Box>
)

interface IProps {
	words: string[]
}

export const SeedPhraseDisplay: React.FC<IProps> = ({ words }) => (
	<Box className={styles.phraseContainerWrapper}>
		<Box className={styles.phraseGridWrapper}>
			{words.map((word, i) => (
				<SeedPhraseDisplayInput key={word} word={word} index={i} />
			))}
		</Box>
	</Box>
)

export default SeedPhraseDisplay
