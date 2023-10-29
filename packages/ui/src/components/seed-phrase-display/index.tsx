import React from 'react'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface IProps {
	words: string[]
}

export const SeedPhraseDisplay: React.FC<IProps> = ({ words }) => (
	<Box className={styles.phraseGridWrapper}>
		{words.map((word, i) => (
			<Box key={word} className={styles.inputBlurWrapper}>
				<Input
					styleVariant="secondary"
					sizeVariant="large"
					disabled
					leftIcon={
						<Box>
							<Text>{i + 1}.</Text>
						</Box>
					}
				/>
				<Box className={styles.inputBlurWordWrapper}>
					<Text>{word}</Text>
				</Box>
			</Box>
		))}
	</Box>
)

export default SeedPhraseDisplay
