/* eslint-disable react/jsx-props-no-spreading */
import { useBodyClass } from 'hooks/use-body-class'
import { DefaultSeo } from 'next-seo'
import { ThemeProvider } from 'next-themes'
import React from 'react'

import SEO from '../next-seo.config'
import '../styles/globals.css'
import './global.css'

const Z3us = ({ Component, pageProps }) => {
	useBodyClass()

	return (
		<>
			<DefaultSeo {...SEO} />
			<ThemeProvider forcedTheme="dark" attribute="class">
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	)
}

export default Z3us
