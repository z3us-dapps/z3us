import { Paring } from '@radixdlt/connector-extension/src/pairing/pairing'
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import 'ui/src/components-v2/system/global.css'
import { Text } from 'ui/src/components-v2/typography'

import { AnimatedPage } from '@src/components/animated-page'

import * as styles from './styles.css'

const Pairing: React.FC = () => {
	return (
		<AnimatedPage>
			<Box padding="xxxlarge" className={styles.pairingWrapper}>
				<Text size="xlarge">we are here</Text>
				<Paring />
			</Box>
		</AnimatedPage>
	)
}

export default Pairing
