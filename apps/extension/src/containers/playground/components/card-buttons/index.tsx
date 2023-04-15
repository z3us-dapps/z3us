import clsx from 'clsx'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Box } from 'ui/src/components-v2/box'
import { type TTheme, ToolTip } from 'ui/src/components-v2/tool-tip'
import { DownLeft2Icon, QrCode2Icon, UpRight2Icon } from 'ui/src/components/icons'

import { Button } from '@src/components/button'

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

	const { t } = useTranslation()

	return (
		<Box className={clsx(styles.cardButtonsWrapper, className)}>
			<ToolTip message={t('global.send')} theme={theme}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" onClick={() => {}}>
					<UpRight2Icon />
				</Button>
			</ToolTip>
			<ToolTip message={t('global.receive')} theme={theme}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" onClick={() => {}}>
					<DownLeft2Icon />
				</Button>
			</ToolTip>
			<ToolTip message={t('global.address')} theme={theme}>
				<Button iconOnly rounded styleVariant="inverse" sizeVariant="large" onClick={() => {}}>
					<QrCode2Icon />
				</Button>
			</ToolTip>
		</Box>
	)
}

CardButtons.defaultProps = defaultProps
