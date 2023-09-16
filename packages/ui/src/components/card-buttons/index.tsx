import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { DownLeft2Icon, QrCode2Icon, UpRight2Icon } from 'ui/src/components/icons'
import { ToolTip } from 'ui/src/components/tool-tip'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

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
		id: 'card.buttons.send',
		defaultMessage: 'Send',
	},
	receive: {
		id: 'card.buttons.receive',
		defaultMessage: 'Receive',
	},
	address: {
		id: 'card.buttons.address',
		defaultMessage: 'Address',
	},
})

export const CardButtons: React.FC<ICardButtonsProps> = props => {
	const { className } = props

	const intl = useIntl()
	const isMobile = useIsMobileWidth()

	const buttonSize = isMobile ? 'medium' : 'large'

	return (
		<Box className={clsx(styles.cardButtonsWrapper, className)}>
			<ToolTip message={intl.formatMessage(messages.send)}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant={buttonSize} to="accounts/transfer">
					<UpRight2Icon />
				</Button>
			</ToolTip>
			<ToolTip message={intl.formatMessage(messages.receive)}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant={buttonSize} to="/accounts/transfer">
					<DownLeft2Icon />
				</Button>
			</ToolTip>
			<ToolTip message={intl.formatMessage(messages.address)}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant={buttonSize} to="/accounts/transfer">
					<QrCode2Icon />
				</Button>
			</ToolTip>
		</Box>
	)
}

CardButtons.defaultProps = defaultProps
