/* eslint-disable */
// import { type Metadata } from "next";
// import { siteConfig } from "@/config/site";
// @ts-nocheck
import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/global-style.css'
import { type AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'

// TODO: refactor
import 'ui/src/components-v2/system/global.css'
import { darkThemeClass } from 'ui/src/components-v2/system/theme.css'

function App({ Component, pageProps }: AppProps) {
	const [isServer, setIsServer] = useState<boolean>(true)
	useEffect(() => {
		setIsServer(false)
	}, [])
	if (isServer) return null

	return (
		<div suppressHydrationWarning>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				value={{
					light: 'light',
					dark: darkThemeClass,
				}}
			>
				{typeof window === 'undefined' ? null : <Component {...pageProps} />}
			</ThemeProvider>
		</div>
	)
}
export default App
