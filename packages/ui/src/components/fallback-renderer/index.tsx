import React from 'react'

import { Box } from 'ui/src/components/box'
import { LoadingBarsIcon } from 'ui/src/components/icons'
import { Text } from 'ui/src/components/typography'

import * as styles from './fallback-renderer.css'

type IFallbackRendererProps = {
	error: any
}

export const FallbackRenderer: React.FC<IFallbackRendererProps> = props => {
	const { error } = props

	return (
		<Box className={styles.fallbackRendererWrapper}>
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

export const FallbackLoading: React.FC = () => (
	<Box className={styles.fallbackLoadingWrapper}>
		<Box display="flex" color="colorNeutral" alignItems="center" justifyContent="center">
			<LoadingBarsIcon />
		</Box>
	</Box>
)