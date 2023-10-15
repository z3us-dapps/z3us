import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Button } from 'ui/src/components/button'

const messages = defineMessages({
	add: {
		id: '2/2yg+',
		defaultMessage: 'Add',
	},
})

export const AddTrigger: React.FC = () => {
	const intl = useIntl()

	return (
		<Button styleVariant="tertiary" sizeVariant="xlarge" fullWidth>
			{intl.formatMessage(messages.add)}
		</Button>
	)
}
