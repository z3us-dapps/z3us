import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './styles.css'

const NotFound = () => (
	<Box padding="large">
		<Box className={styles.teststyle} paddingTop="large" display="flex" flexDirection="column">
			<Text size="code">code</Text>
			<Text size="xsmall">xsmall</Text>
			<Text size="small">small</Text>
			<Text size="medium">medium</Text>
			<Text size="large">large</Text>
			<Text size="xlarge">xlarge</Text>
			<Text size="xxlarge">xxlarge</Text>
			<Text size="xxxlarge" color="strong">
				Testing new text more bumps on the test
			</Text>
		</Box>
	</Box>
)

export default NotFound
