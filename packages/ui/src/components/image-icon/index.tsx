import * as AvatarPrimitive from '@radix-ui/react-avatar'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { type TThemeColorKey } from 'ui/src/components/system/theme.css'
import { Text } from 'ui/src/components/typography'

import * as styles from './image-icon.css'

export type TImageColors = 'primary' | 'secondary'

type TImageSizeOption = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'

type TImageSizes =
	| TImageSizeOption
	| {
			mobile?: TImageSizeOption
			tablet?: TImageSizeOption
			desktop?: TImageSizeOption
	  }

export interface IImageIconProps {
	imgSrc: string
	imgAlt: string
	fallbackText: string
	className?: ClassValue
	imgFallbackDelay?: number
	size?: TImageSizes
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
		color = 'colorNeutral',
		backgroundColor = 'backgroundPrimary',
		rounded = true,
		fallbackText,
	} = props

	const sizeVariantMobile = typeof size === 'object' ? size.mobile : size
	const sizeVariantTablet = typeof size === 'object' ? size.tablet : undefined

	return (
		<Box
			ref={ref}
			color={color}
			background={backgroundColor}
			className={clsx(
				styles.imageWrapper({ size: sizeVariantMobile, sizeTablet: sizeVariantTablet, rounded }),
				className,
			)}
		>
			<AvatarPrimitive.Root className={styles.imageAvatarRootWrapper}>
				<AvatarPrimitive.Image className={styles.imageAvatarImageWrapper({ rounded })} src={imgSrc} alt={imgAlt} />
				<AvatarPrimitive.Fallback delayMs={imgFallbackDelay} className={styles.imageAvatarFallbackWrapper}>
					<Text
						className={clsx(
							styles.imageFallbackTextWrapper({ size: sizeVariantMobile, sizeTablet: sizeVariantTablet }),
						)}
					>
						{fallbackText}
					</Text>
				</AvatarPrimitive.Fallback>
			</AvatarPrimitive.Root>
		</Box>
	)
})
