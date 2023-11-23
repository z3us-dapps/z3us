import Head from 'next/head'
import React from 'react'

const SITE = `https://www.z3us.com/`

interface IProps {
	title: string
	description: string
	slug: string
	noIndex?: boolean
	children?: React.ReactElement
	ogImage?: string
}

export const Meta = (props: IProps) => {
	const {
		title,
		description,
		slug,
		noIndex,
		children,
		ogImage = `${SITE}/favicon/og-image-1200px-630px-min.jpg`,
	} = props

	return (
		<Head>
			<title>{title}</title>
			<meta name="description" content={description} />
			<link rel="canonical" href={`${SITE}${slug}`} />
			<meta property="og:url" content={`${SITE}${slug}`} />
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={ogImage} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="twitter:domain" content={SITE} />
			<meta property="twitter:url" content={`${SITE}${slug}`} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={ogImage} />
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5, minimum-scale=1" />
			<meta httpEquiv="X-UA-Compatible" content="IE=EmulateIE9" />
			<link rel="apple-touch-icon" sizes="180x180" href={`${SITE}/favicon/apple-icon-180x180.png`} />
			<link rel="icon" type="image/png" sizes="192x192" href={`${SITE}/favicon/android-icon-192x192.png`} />
			<link rel="icon" type="image/png" sizes="128x128" href={`${SITE}/favicon/favicon-128x128.png`} />
			<link rel="icon" type="image/png" sizes="32x32" href={`${SITE}/favicon//favicon/favicon-32x32.png`} />
			<link rel="icon" type="image/png" sizes="16x16" href={`${SITE}/favicon//favicon/favicon-16x16.png`} />
			{noIndex ? <meta name="robots" content="noindex" /> : null}
			{children}
		</Head>
	)
}
