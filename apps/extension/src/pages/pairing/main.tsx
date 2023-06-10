import React from 'react'
import ReactDOM from 'react-dom/client'

import { Box } from 'ui/src/components-v2/box'
import 'ui/src/components-v2/system/global.css'
import { darkThemeClass, lightThemeClass } from 'ui/src/components-v2/system/theme.css'
import { Paring } from '@radixdlt/connector-extension/src/pairing/pairing'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './pairing.css'

export const PairingPage: React.FC = () => {
	return (
		<Box className={lightThemeClass} padding="xlarge">
			<Box className={styles.pairingWrapper}>
				<Text size="xlarge">we are here</Text>
				<Paring />
			</Box>
		</Box>
	)
}

ReactDOM.createRoot(document.getElementById('root')!).render(<PairingPage />)
