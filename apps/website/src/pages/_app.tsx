/* eslint-disable react/function-component-definition */
import { ThemeProvider, ThemeProviderDarkClass } from '@/components/theme-provider'
import { Z3usLogoLink } from '@/components/z3us-logo-link'
import '@/styles/global-style.css'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { displayValue } from '@tanstack/react-query-devtools/build/lib/utils'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'

import I18Provider from 'ui/src/components/i18n'
import { darkThemeClass, lightThemeClass } from 'ui/src/components/system/theme.css'
import { RdtProvider } from 'ui/src/context/rdt-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'

export default function App({ Component, pageProps }: AppProps) {
	const [isServer, setIsServer] = useState<boolean>(true)
	const [queryClient] = useState<any>(() => new QueryClient())

	// TODO: local storage??
	// setQueryClient(setQueryClient(window.localStorage))

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
						<RdtProvider>
							<QueryClientProvider client={queryClient}>
								<Hydrate state={pageProps.dehydratedState}>
									<NoneSharedStoreProvider z3usLogoLink={<Z3usLogoLink />}>
										{typeof window === 'undefined' ? null : <Component {...pageProps} />}
									</NoneSharedStoreProvider>
								</Hydrate>
								<ReactQueryDevtools initialIsOpen={false} />
							</QueryClientProvider>
						</RdtProvider>
					</I18Provider>
				</ThemeProviderDarkClass>
			</ThemeProvider>
		</div>
	)
}
