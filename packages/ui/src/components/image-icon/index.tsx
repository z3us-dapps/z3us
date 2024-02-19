import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef, useEffect, useState } from 'react'

import { Box } from 'ui/src/components/box'
import { type TThemeColorKey } from 'ui/src/components/system/theme.css'
import { Text } from 'ui/src/components/typography'
import { brandImages } from 'ui/src/context/images-provider'

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
	fallbackText: string
	imgFallbackDelay?: number
	className?: ClassValue
	size?: TImageSizes
	backgroundColor?: TThemeColorKey
	color?: TThemeColorKey
	rounded?: boolean
}

export const ImageIcon = forwardRef<HTMLElement, IImageIconProps>((props, ref: React.Ref<HTMLElement | null>) => {
	const {
		className,
		imgSrc,
		fallbackText,
		imgFallbackDelay = 600,
		imgAlt,
		size = 'medium',
		color = 'colorNeutral',
		backgroundColor = 'backgroundPrimary',
		rounded = true,
	} = props

	const [isPrimaryLoaded, setIsPrimaryLoaded] = useState<boolean>(false)
	const [show, setShow] = useState<'primary' | 'fallback'>(imgSrc ? 'primary' : 'fallback')
	const [localImgSrc, setLocalImgSrc] = useState<string>(imgSrc)

	const sizeVariantMobile = typeof size === 'object' ? size.mobile : size
	const sizeVariantTablet = typeof size === 'object' ? size.tablet : undefined

	useEffect(() => {
		const fallbackTimer = setTimeout(() => {
			if (!isPrimaryLoaded) {
				setShow('fallback')
			}
		}, imgFallbackDelay)

		return () => clearTimeout(fallbackTimer)
	}, [isPrimaryLoaded, fallbackText, imgFallbackDelay])

	const onError = () => {
		setShow('fallback')
		setLocalImgSrc('/images/token-images/token-placeholder.png')
	}

	const onLoad = () => {
		setShow('primary')
		setIsPrimaryLoaded(true)
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
				<img
					className={styles.imageAvatarImageWrapper({ rounded, hidden: show !== 'primary' })}
					src={localImgSrc}
					alt={imgAlt}
					onLoad={onLoad}
					onError={onError}
				/>
				<Box
					className={styles.imageAvatarFallbackWrapper({
						hidden: show !== 'fallback',
					})}
				>
					<Text
						className={styles.imageFallbackTextWrapper({
							size: sizeVariantMobile,
							sizeTablet: sizeVariantTablet,
						})}
					>
						{fallbackText}
					</Text>
				</Box>
			</Box>
		</Box>
	)
})
