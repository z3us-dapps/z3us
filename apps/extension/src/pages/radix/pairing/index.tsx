import { Paring } from '@radixdlt/connector-extension/src/pairing/pairing'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Text } from 'ui/src/components/typography'

import '@src/styles/global-style.css'

import * as styles from './styles.css'

const Pairing: React.FC = () => (
	<Box>
		<Box padding="xxxlarge" className={styles.pairingWrapper}>
			<Text size="xlarge">Radix Connector Pairing</Text>
			<Paring />
		</Box>
	</Box>
)

export default Pairing
