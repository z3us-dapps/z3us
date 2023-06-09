import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Text } from 'ui/src/components-v2/typography'

import * as styles from './fallback-renderer.css'

type IFallbackRendererProps = {
	error: any
}

export const FallbackRenderer: React.FC<IFallbackRendererProps> = props => {
	const { error } = props

	return (
		<Box className={styles.chartTooltipWrapper}>
			<Box display="flex" alignItems="center" gap="small">
				<Text size="xsmall" color="strong">
					oops, something went wrong
				</Text>
				<Text size="xsmall" color="strong">
					<pre>{error.message}</pre>
				</Text>
			</Box>
		</Box>
	)
}
