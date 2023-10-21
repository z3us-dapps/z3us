import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { QrCode2Icon, UpRight2Icon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'

import { Button } from '../router-button'
import * as styles from './card-buttons.css'

interface ICardButtonsRequiredProps {}

interface ICardButtonsOptionalProps {
	className?: string
}

interface ICardButtonsProps extends ICardButtonsRequiredProps, ICardButtonsOptionalProps {}

const defaultProps: ICardButtonsOptionalProps = {
	className: undefined,
}

const messages = defineMessages({
	send: {
		id: '9WRlF4',
		defaultMessage: 'Send',
	},
	address: {
		id: 'f4sJ8p',
		defaultMessage: 'Address QR',
	},
})

export const CardButtons: React.FC<ICardButtonsProps> = props => {
	const { className } = props
	const intl = useIntl()

	return (
		<Box className={clsx(styles.cardButtonsWrapper, className)}>
			<ToolTip message={intl.formatMessage(messages.send)}>
				<Button
					iconOnly
					rounded
					styleVariant="inverse"
					sizeVariant={{ mobile: 'medium', tablet: 'large' }}
					to="/transfer"
				>
					<UpRight2Icon />
				</Button>
			</ToolTip>
			<ToolTip message={intl.formatMessage(messages.address)}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant={{ mobile: 'medium', tablet: 'large' }}>
					<QrCode2Icon />
				</Button>
			</ToolTip>
		</Box>
	)
}

CardButtons.defaultProps = defaultProps
