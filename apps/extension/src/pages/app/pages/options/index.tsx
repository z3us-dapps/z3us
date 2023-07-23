import { Options as RadixOptions } from '@radixdlt/connector-extension/src/options/options'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import '@src/styles/global-style.css'

import * as styles from './styles.css'

const Options: React.FC = () => (
	<Box>
		<Box padding="xxxlarge" className={styles.pairingWrapper}>
			<Text size="xlarge">Radix Connector Options</Text>
			<RadixOptions />
		</Box>
	</Box>
)

export default Options
