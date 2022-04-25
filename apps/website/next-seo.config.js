export default {
	openGraph: {
		type: 'website',
		locale: 'en_IE',
		url: 'https://www.url.ie/',
		site_name: 'SiteName',
	},
	twitter: {
		handle: '@handle',
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
			color: '#5bbad5',
			href: '/images/favicon/safari-pinned-tab.svg',
		},
	],
}
