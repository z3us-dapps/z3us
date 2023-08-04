import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { DownLeft2Icon, QrCode2Icon, UpRight2Icon } from 'ui/src/components/icons'
import { type TTheme, ToolTip } from 'ui/src/components/tool-tip'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { Button } from '../router-button'
import * as styles from './card-buttons.css'

interface ICardButtonsRequiredProps {}

interface ICardButtonsOptionalProps {
	className?: string
	theme?: TTheme
}

interface ICardButtonsProps extends ICardButtonsRequiredProps, ICardButtonsOptionalProps {}

const defaultProps: ICardButtonsOptionalProps = {
	className: undefined,
	theme: 'backgroundPrimary',
}

export const CardButtons: React.FC<ICardButtonsProps> = props => {
	const { className, theme } = props

	const isMobile = useIsMobileWidth()

	const buttonSize = isMobile ? 'medium' : 'large'

	return (
		<Box className={clsx(styles.cardButtonsWrapper, className)}>
			<ToolTip message="global.send" theme={theme}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant={buttonSize} to="accounts/transfer">
					<UpRight2Icon />
				</Button>
			</ToolTip>
			<ToolTip message="global.receive" theme={theme}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant={buttonSize} to="/accounts/transfer">
					<DownLeft2Icon />
				</Button>
			</ToolTip>
			<ToolTip message="global.address" theme={theme}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant={buttonSize} to="/accounts/transfer">
					<QrCode2Icon />
				</Button>
			</ToolTip>
		</Box>
	)
}

CardButtons.defaultProps = defaultProps
