import { ThemeProvider } from '@/context/theme-provider'
import '@/styles/global-style.css'
// import { displayValue } from '@tanstack/react-query-devtools/build/lib/utils'
import type { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'

const App = ({ Component, pageProps }: AppProps) => {
	const [isServer, setIsServer] = useState<boolean>(true)

	// @NOTE: this is needed for react-router-dom integration
	useEffect(() => {
		setIsServer(false)
	}, [])

	if (isServer) return null

	return (
		<div suppressHydrationWarning>
			<ThemeProvider>{typeof window === 'undefined' ? null : <Component {...pageProps} />}</ThemeProvider>
		</div>
	)
}

export default App
