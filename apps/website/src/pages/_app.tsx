/* eslint-disable react/function-component-definition */
import { ThemeProvider, ThemeProviderDarkClass } from '@/components/theme-provider'
import { Z3usLogoLink } from '@/components/z3us-logo-link'
import '@/styles/global-style.css'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { displayValue } from '@tanstack/react-query-devtools/build/lib/utils'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'

import I18Provider from 'ui/src/components/i18n'
import { darkThemeClass, lightThemeClass } from 'ui/src/components/system/theme.css'
import { RdtProvider } from 'ui/src/context/rdt-provider'
import { ReactQueryProvider } from 'ui/src/context/react-query-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'

export default function App({ Component, pageProps }: AppProps) {
	const [isServer, setIsServer] = useState<boolean>(true)

	// @NOTE: this is needed for react-router-dom integration
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
					light: lightThemeClass,
					dark: darkThemeClass,
				}}
			>
				<ThemeProviderDarkClass>
					<I18Provider>
						<ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
							<NoneSharedStoreProvider>
								<RdtProvider>{typeof window === 'undefined' ? null : <Component {...pageProps} />}</RdtProvider>
							</NoneSharedStoreProvider>
							{/* <ReactQueryDevtools initialIsOpen={false} /> */}
						</ReactQueryProvider>
					</I18Provider>
				</ThemeProviderDarkClass>
			</ThemeProvider>
		</div>
	)
}
