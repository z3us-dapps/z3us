/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { SSRProvider } from '@react-aria/ssr'
import { globalCss, globalStyles, darkTheme } from 'ui/src/theme'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'

const siteGlobalStyles = globalCss({
	body: {
		minHeight: '100vh',
		'> div': {
			minHeight: '100vh',
			'&:before': {
				content: '',
				position: 'absolute',
				pe: 'none',
				top: '0',
				left: '0',
				right: '0',
				bottom: '0',
				backgroundImage: 'url(/images/greek-repeat.jpeg)',
				backgroundRepeat: 'repeat',
				opacity: '0.03',
				minHeight: '100%',
				'mask-image': 'radial-gradient(circle at 50% 50%, transparent 40%, black)',
			},
		},
	},
})

const Z3us = ({ Component, pageProps }) => {
	globalStyles()
	siteGlobalStyles()

	return (
		<SSRProvider>
			<DefaultSeo {...SEO} />
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				value={{
					light: 'light-theme',
					dark: darkTheme,
				}}
			>
				<Component {...pageProps} />
			</ThemeProvider>
		</SSRProvider>
	)
}

export default Z3us
