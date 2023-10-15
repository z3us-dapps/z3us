import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import type { IButtonProps } from 'ui/src/components/button'
import { LeftArrowIcon } from 'ui/src/components/icons'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'

const messages = defineMessages({
	back: {
		id: 'cyR7Kh',
		defaultMessage: 'Back',
	},
})

export interface IProps extends Omit<IButtonProps, 'children'> {
	to: string
}

export const BackButton: React.FC<IProps> = ({ to, styleVariant = 'white-transparent' }) => {
	const intl = useIntl()

	return (
		<ToolTip message={intl.formatMessage(messages.back)}>
			<Button to={to} styleVariant={styleVariant} sizeVariant="small" iconOnly>
				<LeftArrowIcon />
			</Button>
		</ToolTip>
	)
}
