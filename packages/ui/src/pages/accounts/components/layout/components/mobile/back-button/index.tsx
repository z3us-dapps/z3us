import { LeftArrowIcon } from 'packages/ui/src/components/icons'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'

const messages = defineMessages({
	back: {
		id: 'accounts.layout.back_button.title',
		defaultMessage: 'Back',
	},
})

export const BackButton: React.FC = () => {
	const intl = useIntl()
	const { accountId } = useParams()

	return (
		<ToolTip message={intl.formatMessage(messages.back)}>
			<Button to={`/accounts/${accountId}`} styleVariant="white-transparent" sizeVariant="small" iconOnly>
				<LeftArrowIcon />
			</Button>
		</ToolTip>
	)
}
