import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { type TTheme, ToolTip } from 'ui/src/components-v2/tool-tip'
import { DownLeft2Icon, QrCode2Icon, UpRight2Icon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'
import Translation from '@src/components/translation'
import { accountMenuSlugs } from '@src/constants'

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

	return (
		<Box className={clsx(styles.cardButtonsWrapper, className)}>
			<ToolTip message={<Translation capitalizeFirstLetter text="global.send" />} theme={theme}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" to={`${accountMenuSlugs.TRANSFER}/asdf`}>
					<UpRight2Icon />
				</Button>
			</ToolTip>
			<ToolTip message={<Translation capitalizeFirstLetter text="global.receive" />} theme={theme}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" to="/accounts/transfer">
					<DownLeft2Icon />
				</Button>
			</ToolTip>
			<ToolTip message={<Translation capitalizeFirstLetter text="global.address" />} theme={theme}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" to="/accounts/transfer">
					<QrCode2Icon />
				</Button>
			</ToolTip>
		</Box>
	)
}

CardButtons.defaultProps = defaultProps
