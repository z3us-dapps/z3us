import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { type TThemeColorKey } from 'ui/src/components/system/theme.css'

import * as styles from './image-icon.css'

export type TImageColors = 'primary' | 'secondary'

export type TImageSizeOption = 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'

export type TImageSizes =
	| TImageSizeOption
	| {
			mobile?: TImageSizeOption
			tablet?: TImageSizeOption
			desktop?: TImageSizeOption
	  }

export interface IImageIconProps {
	imgSrc: string
	imgAlt: string
	className?: ClassValue
	size?: TImageSizes
	backgroundColor?: TThemeColorKey
	color?: TThemeColorKey
	rounded?: boolean
	onImgError?: () => void
}

export const ImageIcon = forwardRef<HTMLElement, IImageIconProps>((props, ref: React.Ref<HTMLElement | null>) => {
	const {
		className,
		imgSrc,
		imgAlt,
		size = 'medium',
		color = 'colorNeutral',
		backgroundColor = 'backgroundPrimary',
		rounded = true,
		onImgError = () => {},
	} = props

	const sizeVariantMobile = typeof size === 'object' ? size.mobile : size
	const sizeVariantTablet = typeof size === 'object' ? size.tablet : undefined

	const onError = () => {
		onImgError()
	}

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
			<Box className={styles.imageAvatarRootWrapper}>
				{imgSrc && (
					// eslint-disable-next-line @next/next/no-img-element
					<img className={styles.imageAvatarImageWrapper({ rounded })} src={imgSrc} alt={imgAlt} onError={onError} />
				)}
			</Box>
		</Box>
	)
})
