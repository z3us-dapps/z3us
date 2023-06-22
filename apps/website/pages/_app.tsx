import { ThemeProvider } from '@/components/theme-provider'
import '@/styles/global-style.css'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { useEffect, useState } from 'react'

import I18Provider from 'ui/src/components/i18n'
import { darkThemeClass, lightThemeClass } from 'ui/src/components/system/theme.css'
import { RdtProvider } from 'ui/src/context/rdt-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'

// eslint-disable-next-line react/function-component-definition
function App({ Component, pageProps }) {
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
				<I18Provider>
					<RdtProvider>
						<QueryClientProvider client={queryClient}>
							<Hydrate state={pageProps.dehydratedState}>
								<NoneSharedStoreProvider>
									{typeof window === 'undefined' ? null : <Component {...pageProps} />}
								</NoneSharedStoreProvider>
							</Hydrate>
							<ReactQueryDevtools initialIsOpen={false} />
						</QueryClientProvider>
					</RdtProvider>
				</I18Provider>
			</ThemeProvider>
		</div>
	)
}
export default App
