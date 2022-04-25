/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { SSRProvider } from '@react-aria/ssr'
import { globalStyles, darkTheme, globalCss } from 'ui/src/theme'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'

const siteGlobalStyles = globalCss({
	body: {
		'> div': {
			minHeight: '100vh',
		},
	},
})

export default function Nextra({ Component, pageProps }) {
	const getLayout = Component.getLayout || (page => page)
	globalStyles()
	siteGlobalStyles()

	return getLayout(
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
		</SSRProvider>,
	)
}
