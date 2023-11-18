import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useRouteError } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { LoadingBarsIcon } from 'ui/src/components/icons'
import { LayoutCenterCard } from 'ui/src/components/layout/layout-center-card'
import { Text } from 'ui/src/components/typography'

import { Button } from '../button'
import * as styles from './fallback-renderer.css'

const messages = defineMessages({
	title: {
		id: 'DxsXjT',
		defaultMessage: 'Oops, something went wrong...',
	},
	reload: {
		id: 'lqJIil',
		defaultMessage: 'Click here to reload the app',
	},
})

type IProps = {
	error: any
}

export const FallbackRenderer: React.FC<IProps> = ({ error }) => {
	const intl = useIntl()
	const navigate = useNavigate()

	const handleButtonClick = () => {
		navigate('/')
	}

	return (
		<LayoutCenterCard>
			<Text size="large" color="strong">
				{intl.formatMessage(messages.title)}
			</Text>
			<Box paddingTop="large">
				<Text size="xsmall">
					<pre>{error.message}</pre>
				</Text>
			</Box>
			<Box marginTop="large">
				<Button fullWidth styleVariant="primary" sizeVariant="xlarge" onClick={handleButtonClick}>
					{intl.formatMessage(messages.title)}
				</Button>
			</Box>
		</LayoutCenterCard>
	)
}

export const FallbackLoading: React.FC = () => (
	<Box className={styles.fallbackLoadingWrapper}>
		<LoadingBarsIcon />
	</Box>
)

export const RouterErrorBoundary: React.FC = () => {
	const error = useRouteError() as Error

	return <FallbackRenderer error={error} />
}
