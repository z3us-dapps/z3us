/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { SSRProvider } from '@react-aria/ssr'
import { darkTheme } from 'ui/src/theme'
import { DefaultSeo } from 'next-seo'
import globalStyles from './global-styles'
import SEO from '../next-seo.config'

//const siteGlobalStyles = globalCss({
//body: {
//'> div': {
//minHeight: '100vh',
//},
//},
//})
//

const Z3us = ({ Component, pageProps }) => {
	globalStyles()

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
