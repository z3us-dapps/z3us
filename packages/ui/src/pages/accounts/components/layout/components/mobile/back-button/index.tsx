import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { LeftArrowIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'

const messages = defineMessages({
	back: {
		id: 'accounts.layout.back_button.title',
		defaultMessage: 'Back',
	},
})

export interface IProps {
	to: string
}

export const BackButton: React.FC<IProps> = ({ to }) => {
	const intl = useIntl()

	return (
		<ToolTip message={intl.formatMessage(messages.back)}>
			<Button to={to} styleVariant="white-transparent" sizeVariant="small" iconOnly>
				<LeftArrowIcon />
			</Button>
		</ToolTip>
	)
}
