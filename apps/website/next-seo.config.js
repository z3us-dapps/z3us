import { config } from 'config'

export default {
	titleTemplate: 'Z3US - %s',
	openGraph: {
		type: 'website',
		locale: 'en_IE',
		url: config.Z3US_URL,
		site_name: 'Z3US - An open source UX driven wallet for Radix DLT',
	},
	twitter: {
		handle: `@${config.TWITTER_HANDLE}`,
		site: '@site',
		cardType: 'summary_large_image',
	},
	additionalLinkTags: [
		{
			rel: 'apple-touch-icon',
			href: '/images/favicon/apple-icon-180x180.png',
			sizes: '180x180',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '192x192',
			href: '/images/favicon/android-icon-192x192.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			href: '/images/favicon/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '96x96',
			href: '/images/favicon/favicon-96x96.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			href: '/images/favicon/favicon-16x16.png',
		},
		{
			rel: 'mask-icon',
			color: '#8052ff',
			href: '/images/favicon/safari-pinned-tab.svg',
		},
	],
}
