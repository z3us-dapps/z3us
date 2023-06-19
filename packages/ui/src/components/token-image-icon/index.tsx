import * as AvatarPrimitive from '@radix-ui/react-avatar'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { type TThemeColorKey } from 'ui/src/components/system/theme.css'
import { Text } from 'ui/src/components/typography'

import * as styles from './token-image-icon.css'

export type TTokenImageSizes = 'small' | 'medium' | 'large'
export type TTokenImageColors = 'primary' | 'secondary'

interface ITokenImageIconRequiredProps {
	imgSrc: string
	imgAlt: string
	fallbackText: string
}

interface ITokenImageIconOptionalProps {
	className?: ClassValue
	imgFallbackDelay?: number
	size?: TTokenImageSizes
	backgroundColor?: TThemeColorKey
	color?: TThemeColorKey
	rounded?: boolean
}

interface ITokenImageIconProps extends ITokenImageIconRequiredProps, ITokenImageIconOptionalProps {}

const defaultProps: ITokenImageIconOptionalProps = {
	className: undefined,
	imgFallbackDelay: 600,
	size: 'medium',
	color: 'colorNeutral',
	backgroundColor: 'backgroundPrimary',
	rounded: true,
}

export const TokenImageIcon = forwardRef<HTMLElement, ITokenImageIconProps>(
	(props, ref: React.Ref<HTMLElement | null>) => {
		const { className, imgSrc, imgFallbackDelay, imgAlt, size, color, backgroundColor, rounded, fallbackText } = props

		return (
			<Box
				ref={ref}
				color={color}
				background={backgroundColor}
				className={clsx(styles.tokenImageWrapper({ size, rounded }), className)}
			>
				<AvatarPrimitive.Root className={styles.tokenImageAvatarRootWrapper}>
					<AvatarPrimitive.Image className={styles.tokenImageAvatarImageWrapper} src={imgSrc} alt={imgAlt} />
					<AvatarPrimitive.Fallback delayMs={imgFallbackDelay} className={styles.tokenImageAvatarFallbackWrapper}>
						<Text className={clsx(styles.tokenImageFallbackTextWrapper({ size }))}>{fallbackText}</Text>
					</AvatarPrimitive.Fallback>
				</AvatarPrimitive.Root>
			</Box>
		)
	},
)

TokenImageIcon.defaultProps = defaultProps
