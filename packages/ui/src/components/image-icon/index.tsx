import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { type TThemeColorKey } from 'ui/src/components/system/theme.css'
import { useImages } from 'ui/src/hooks/use-images'

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
	address?: string
}

const TOKEN_PLACEHOLDER_IMAGE: string = '/images/token-images/token-placeholder.png'

export const ImageIcon = forwardRef<HTMLElement, IImageIconProps>((props, ref: React.Ref<HTMLElement | null>) => {
	const {
		className,
		imgSrc,
		imgAlt,
		size = 'medium',
		color = 'colorNeutral',
		backgroundColor = 'backgroundPrimary',
		rounded = true,
		address,
	} = props

	const { images, setImages } = useImages()
	const [localImgSrc, setLocalImgSrc] = useState<string>(imgSrc)

	const sizeVariantMobile = typeof size === 'object' ? size.mobile : size
	const sizeVariantTablet = typeof size === 'object' ? size.tablet : undefined

	const onError = () => {
		setLocalImgSrc(TOKEN_PLACEHOLDER_IMAGE)

		if (address) {
			const knownImagesMap = new Map([[address, TOKEN_PLACEHOLDER_IMAGE]])
			const newMap = new Map([...images, ...knownImagesMap])

			setImages(newMap)
		}
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
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img className={styles.imageAvatarImageWrapper({ rounded })} src={localImgSrc} alt={imgAlt} onError={onError} />
			</Box>
		</Box>
	)
})
