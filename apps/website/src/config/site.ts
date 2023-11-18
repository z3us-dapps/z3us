import { type Metadata } from 'next'

export const siteConfig = {
	name: 'z3us',
	url: 'https://z3us.com/',
	ogImage: 'https://ui.shadcn.com/og.jpg',
	description: 'WOW ',
	links: {
		twitter: 'https://twitter.com/',
		github: 'https://github.com/',
	},
}

export type SiteConfig = typeof siteConfig

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: ['Next.js', 'React', 'Server Components', 'Radix UI'],
	authors: [
		{
			name: '',
			url: '',
		},
	],
	creator: '',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: '@',
	},
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
	// manifest: `${siteConfig.url}/site.webmanifest`,
}
