import * as AvatarPrimitive from '@radix-ui/react-avatar'
import clsx, { type ClassValue } from 'clsx'
import React, { forwardRef } from 'react'

import * as styles from './avatar.css'

export const AvatarRoot = AvatarPrimitive.Root
export const AvatarImage = AvatarPrimitive.Image
export const AvatarFallback = AvatarPrimitive.Fallback

interface IAvatarProps {
	src: string
	alt: string
	fallback: string
	delayMs?: number
	className?: ClassValue
	sizeVariant?: 'small' | 'medium' | 'large' | 'full'
	styleVariant?: 'circle' | 'rounded' | 'square'
}

export const Avatar = forwardRef<HTMLButtonElement, IAvatarProps>((props, ref) => {
	const { className, sizeVariant = 'medium', styleVariant = 'circle', src, alt, fallback, delayMs, ...rest } = props

	return (
		<AvatarRoot
			ref={ref}
			className={clsx(
				styles.avatarRootWrapper,
				styles.avatarRootRecipe({
					sizeVariant,
					styleVariant,
				}),
				className,
			)}
			{...rest}
		>
			<AvatarImage
				className={clsx(
					styles.avatarImageWrapper,
					styles.avatarImageRecipe({
						sizeVariant,
						styleVariant,
					}),
				)}
				src={src}
				alt={alt}
			/>
			<AvatarFallback
				className={clsx(
					styles.avatarFallbackWrapper,
					styles.avatarFallbackRecipe({
						sizeVariant,
						styleVariant,
					}),
				)}
				delayMs={delayMs}
			>
				{fallback}
			</AvatarFallback>
		</AvatarRoot>
	)
})
