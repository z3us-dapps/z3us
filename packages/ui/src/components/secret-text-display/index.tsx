import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import * as styles from '../seed-phrase-display/styles.css'

interface IProps {
	secret: string
}

export const SecretTextDisplay: React.FC<IProps> = ({ secret }) => (
	<Box className={styles.inputBlurSingleWrapper}>
		<Box className={styles.inputBlurSingleWordWrapper}>
			<Text>{secret}</Text>
		</Box>
	</Box>
)

export default SecretTextDisplay
