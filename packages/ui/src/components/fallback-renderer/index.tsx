import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useRouteError } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { LoadingBarsIcon } from 'ui/src/components/icons'
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
		<Box className={styles.fallbackRendererWrapper}>
			<Box display="flex" alignItems="center" gap="small">
				<Text size="xsmall" color="strong">
					{intl.formatMessage(messages.title)}
				</Text>
				<Text size="xsmall" color="strong">
					<pre>{error.message}</pre>
				</Text>
				<Button fullWidth styleVariant="primary" sizeVariant="xlarge" onClick={handleButtonClick}>
					{intl.formatMessage(messages.title)}
				</Button>
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

export const RouterErrorBoundary: React.FC = () => {
	const error = useRouteError() as Error

	return <FallbackRenderer error={error} />
}
