import React from 'react'

import { Box } from 'ui/src/components/box'
import { Input } from 'ui/src/components/input'
import { Text } from 'ui/src/components/typography'

import * as styles from '../seed-phrase-display/styles.css'

interface IProps {
	secret: string
}

export const SecretTextDisplay: React.FC<IProps> = ({ secret }) => (
	<Box className={styles.inputBlurWrapper}>
		<Input styleVariant="secondary" sizeVariant="large" disabled />
		<Box className={styles.inputBlurWordWrapper}>
			<Text>{secret}</Text>
		</Box>
	</Box>
)

export default SecretTextDisplay
