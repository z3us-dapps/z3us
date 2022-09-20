/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface IPicture {
	className?: string
	mobileImage?: string
	desktopImage?: string
	fallbackImage: string
	alt: string
	width: number
	height: number
}

const defaultProps = {
	className: undefined,
	mobileImage: undefined,
	desktopImage: undefined,
}

export const Picture = ({
	className,
	mobileImage,
	desktopImage,
	fallbackImage,
	alt,
	width,
	height,
}: IPicture): JSX.Element => (
	<picture>
		{mobileImage && <source media="(max-width: 767px)" srcSet={mobileImage} />}
		{desktopImage && <source media="(min-width: 768px)" srcSet={desktopImage} />}
		{width && height ? (
			<img className={className} src={fallbackImage} alt={alt} width={width} height={height} loading="lazy" />
		) : (
			<img className={className} src={fallbackImage} alt={alt} loading="lazy" />
		)}
	</picture>
)

Picture.defaultProps = defaultProps
