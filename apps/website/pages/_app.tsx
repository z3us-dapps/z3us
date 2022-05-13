/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { SSRProvider } from '@react-aria/ssr'
import { globalCss, globalStyles, darkTheme } from 'ui/src/theme'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import './global.scss'

const siteGlobalStyles = globalCss({
	body: {
		minHeight: '100vh',
		backgroundColor: '$bgPanel',
		'&:before': {
			content: '',
			position: 'absolute',
			top: '0',
			left: '0',
			right: '0',
			bottom: '0',
			backgroundImage: 'url(/images/greek-repeat-small.jpg)',
			backgroundRepeat: 'repeat',
			backgroundSize: 'auto',
			'mask-image': 'radial-gradient(circle at 50% 40%, transparent 65%, black)',
			opacity: '0.05',
			pe: 'none',
		},
		'> div': {
			position: 'relative',
			minHeight: '100vh',
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
