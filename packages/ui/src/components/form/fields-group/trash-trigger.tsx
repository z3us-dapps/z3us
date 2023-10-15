import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { TrashIcon } from 'ui/src/components/icons'

const messages = defineMessages({
	remove: {
		id: 'G/yZLu',
		defaultMessage: 'Remove',
	},
})

export const TrashTrigger: React.FC = () => {
	const intl = useIntl()

	return (
		<Button
			styleVariant="tertiary"
			sizeVariant="xlarge"
			fullWidth
			leftIcon={
				<Box marginLeft="small">
					<TrashIcon />
				</Box>
			}
		>
			{intl.formatMessage(messages.remove)}
		</Button>
	)
}
