import * as AvatarPrimitive from '@radix-ui/react-avatar'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { type TThemeColorKey } from 'ui/src/components/system/theme.css'
import { Text } from 'ui/src/components/typography'

import * as styles from './image-icon.css'

export type TImageSizes = 'small' | 'medium' | 'large' | 'xlarge'
export type TImageColors = 'primary' | 'secondary'

export interface IImageIconProps {
	imgSrc: string
	imgAlt: string
	fallbackText: string
	className?: ClassValue
	imgFallbackDelay?: number
	size?: TImageSizes
	sizeTablet?: TImageSizes
	backgroundColor?: TThemeColorKey
	color?: TThemeColorKey
	rounded?: boolean
}

export const ImageIcon = forwardRef<HTMLElement, IImageIconProps>((props, ref: React.Ref<HTMLElement | null>) => {
	const {
		className,
		imgSrc,
		imgFallbackDelay = 600,
		imgAlt,
		size = 'medium',
		sizeTablet,
		color = 'colorNeutral',
		backgroundColor = 'backgroundPrimary',
		rounded = true,
		fallbackText,
	} = props

	return (
		<Box
			ref={ref}
			color={color}
			background={backgroundColor}
			className={clsx(styles.imageWrapper({ size, sizeTablet, rounded }), className)}
		>
			<AvatarPrimitive.Root className={styles.imageAvatarRootWrapper}>
				<AvatarPrimitive.Image className={styles.imageAvatarImageWrapper} src={imgSrc} alt={imgAlt} />
				<AvatarPrimitive.Fallback delayMs={imgFallbackDelay} className={styles.imageAvatarFallbackWrapper}>
					<Text className={clsx(styles.imageFallbackTextWrapper({ size }))}>{fallbackText}</Text>
				</AvatarPrimitive.Fallback>
			</AvatarPrimitive.Root>
		</Box>
	)
})
