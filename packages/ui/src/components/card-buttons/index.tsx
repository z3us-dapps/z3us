import clsx from 'clsx'
import React from 'react'

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

export const CardButtons: React.FC<ICardButtonsProps> = props => {
	const { className } = props

	const isMobile = useIsMobileWidth()

	const buttonSize = isMobile ? 'medium' : 'large'

	return (
		<Box className={clsx(styles.cardButtonsWrapper, className)}>
			<ToolTip message="global.send">
				<Button iconOnly rounded styleVariant="inverse" sizeVariant={buttonSize} to="accounts/transfer">
					<UpRight2Icon />
				</Button>
			</ToolTip>
			<ToolTip message="global.receive">
				<Button iconOnly rounded styleVariant="inverse" sizeVariant={buttonSize} to="/accounts/transfer">
					<DownLeft2Icon />
				</Button>
			</ToolTip>
			<ToolTip message="global.address">
				<Button iconOnly rounded styleVariant="inverse" sizeVariant={buttonSize} to="/accounts/transfer">
					<QrCode2Icon />
				</Button>
			</ToolTip>
		</Box>
	)
}

CardButtons.defaultProps = defaultProps
