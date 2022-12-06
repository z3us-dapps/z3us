/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import { useBodyClass } from 'hooks/use-body-class'
import SEO from '../next-seo.config'
import '../styles/globals.css'
import './global.scss'

const Z3us = ({ Component, pageProps }) => {
  useBodyClass()

  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default Z3us
