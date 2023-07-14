/* eslint-disable react/function-component-definition */
import { ThemeProvider } from '@/context/theme-provider'
import '@/styles/global-style.css'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { displayValue } from '@tanstack/react-query-devtools/build/lib/utils'
import type { AppProps } from 'next/app'
import { ContentScriptStatusContext } from 'packages/ui/src/context/content-script'
import React, { useEffect, useState } from 'react'

import I18Provider from 'ui/src/components/i18n'
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
			<ThemeProvider>
				<ContentScriptStatusContext.Provider value={null}>
					<I18Provider>
						<ReactQueryProvider dehydratedState={pageProps.dehydratedState}>
							<NoneSharedStoreProvider>
								<RdtProvider>{typeof window === 'undefined' ? null : <Component {...pageProps} />}</RdtProvider>
							</NoneSharedStoreProvider>
							{/* <ReactQueryDevtools initialIsOpen={false} /> */}
						</ReactQueryProvider>
					</I18Provider>
				</ContentScriptStatusContext.Provider>
			</ThemeProvider>
		</div>
	)
}
